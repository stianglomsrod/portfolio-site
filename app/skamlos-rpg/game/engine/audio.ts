/**
 * Procedural Web Audio engine for Skamløs RPG.
 *
 * All sounds are synthesised at runtime with the Web Audio API — no external
 * assets, no licensing concerns, and a perfect chiptune aesthetic to match the
 * pixel-art visuals. Lazy-initialises on the first user gesture (browser policy).
 *
 * Usage:  audio.sfx("step")   audio.sfx("door")   audio.bgm.start()
 */

export type SfxName =
  | "step"
  | "door"
  | "blip"
  | "confirm"
  | "deny"
  | "reward"
  | "bell"
  | "quest";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

// Equal-tempered note frequencies (A4 = 440 Hz)
const C4 = 261.63,
  D4 = 293.66,
  E4 = 329.63,
  G4 = 392.0,
  A4 = 440.0;
const C5 = C4 * 2,
  E5 = E4 * 2,
  G5 = G4 * 2;
const C3 = C4 / 2,
  G3 = G4 / 2,
  A3 = A4 / 2;

// ---------------------------------------------------------------------------
// GameAudio class
// ---------------------------------------------------------------------------

class GameAudio {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private muted = false;
  private stepParity = 0;

  // BGM state
  private bgmNodes: AudioNode[] = [];
  private bgmRunning = false;
  private bgmTimeout: ReturnType<typeof setTimeout> | null = null;

  // ---------------------------------------------------------------------------
  // Init
  // ---------------------------------------------------------------------------

  /** Must be called after a user gesture (click/key) to satisfy browser policy. */
  init(): void {
    if (this.ctx) return;
    try {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.muted ? 0 : 0.28;
      this.master.connect(this.ctx.destination);
    } catch (e) {
      console.warn("[skamlos] AudioContext unavailable", e);
    }
  }

  private getCtx(): AudioContext | null {
    if (!this.ctx) this.init();
    if (this.ctx?.state === "suspended") {
      // Resume is async; we can fire-and-forget since the context will be ready
      // before the next audio event (microseconds later).
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // ---------------------------------------------------------------------------
  // SFX
  // ---------------------------------------------------------------------------

  sfx(name: SfxName): void {
    if (this.muted) return;
    const ctx = this.getCtx();
    if (!ctx || !this.master) return;
    const master = this.master;
    const now = ctx.currentTime;

    switch (name) {
      // Soft alternating footstep click (noise burst filtered ~300 Hz)
      case "step": {
        this.stepParity ^= 1;
        const buf = ctx.createBuffer(1, ctx.sampleRate * 0.04, ctx.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * 0.8;
        const src = ctx.createBufferSource();
        src.buffer = buf;
        const flt = ctx.createBiquadFilter();
        flt.type = "bandpass";
        flt.frequency.value = this.stepParity ? 260 : 320;
        flt.Q.value = 3;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.22, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
        src.connect(flt);
        flt.connect(g);
        g.connect(master);
        src.start(now);
        break;
      }

      // Sweeping tone: door creak (triangle down-glide + short noise thud)
      case "door": {
        const osc = ctx.createOscillator();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(640, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.28);
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.14, now);
        g.gain.setValueAtTime(0.14, now + 0.18);
        g.gain.linearRampToValueAtTime(0, now + 0.35);
        osc.connect(g);
        g.connect(master);
        osc.start(now);
        osc.stop(now + 0.36);

        // thud
        const buf = ctx.createBuffer(1, ctx.sampleRate * 0.06, ctx.sampleRate);
        const ch = buf.getChannelData(0);
        for (let i = 0; i < ch.length; i++) ch[i] = Math.random() * 2 - 1;
        const ns = ctx.createBufferSource();
        ns.buffer = buf;
        const nf = ctx.createBiquadFilter();
        nf.type = "lowpass";
        nf.frequency.value = 120;
        const ng = ctx.createGain();
        ng.gain.setValueAtTime(0.18, now + 0.22);
        ng.gain.exponentialRampToValueAtTime(0.001, now + 0.36);
        ns.connect(nf);
        nf.connect(ng);
        ng.connect(master);
        ns.start(now + 0.22);
        break;
      }

      // Very short square-wave blip (classic RPG text advance)
      case "blip": {
        const osc = ctx.createOscillator();
        osc.type = "square";
        osc.frequency.value = 540 + Math.random() * 60;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.055, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
        osc.connect(g);
        g.connect(master);
        osc.start(now);
        osc.stop(now + 0.046);
        break;
      }

      // Two-note rising chime: E5 → G5
      case "confirm": {
        const freqs = [E5, G5];
        freqs.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          osc.type = "triangle";
          osc.frequency.value = freq;
          const g = ctx.createGain();
          const t0 = now + i * 0.07;
          g.gain.setValueAtTime(0.0, t0);
          g.gain.linearRampToValueAtTime(0.14, t0 + 0.01);
          g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.18);
          osc.connect(g);
          g.connect(master);
          osc.start(t0);
          osc.stop(t0 + 0.19);
        });
        break;
      }

      // Short downward buzz: deny / locked
      case "deny": {
        const osc = ctx.createOscillator();
        osc.type = "square";
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.linearRampToValueAtTime(140, now + 0.14);
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.1, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        osc.connect(g);
        g.connect(master);
        osc.start(now);
        osc.stop(now + 0.19);
        break;
      }

      // Rising 5-note arpeggio fanfare: C4 E4 G4 C5 E5
      case "reward": {
        [C4, E4, G4, C5, E5].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          osc.type = "square";
          osc.frequency.value = freq;
          const g = ctx.createGain();
          const t0 = now + i * 0.075;
          g.gain.setValueAtTime(0.0, t0);
          g.gain.linearRampToValueAtTime(0.11, t0 + 0.01);
          g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.22);
          osc.connect(g);
          g.connect(master);
          osc.start(t0);
          osc.stop(t0 + 0.23);
        });
        break;
      }

      // School bell: sine wave 880 Hz, slow ring-out
      case "bell": {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.value = 880;
        // Slight detune for richer bell quality
        const osc2 = ctx.createOscillator();
        osc2.type = "sine";
        osc2.frequency.value = 887;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.0, now);
        g.gain.linearRampToValueAtTime(0.18, now + 0.01);
        g.gain.exponentialRampToValueAtTime(0.001, now + 1.8);
        [osc, osc2].forEach((o) => {
          o.connect(g);
          o.start(now);
          o.stop(now + 1.85);
        });
        g.connect(master);
        break;
      }

      // Quest start/complete: C4-G4-E5 upward triad (confident, not over-the-top)
      case "quest": {
        [C4, G4, E5].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          osc.type = "triangle";
          osc.frequency.value = freq;
          const g = ctx.createGain();
          const t0 = now + i * 0.09;
          g.gain.setValueAtTime(0.0, t0);
          g.gain.linearRampToValueAtTime(0.13, t0 + 0.012);
          g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.28);
          osc.connect(g);
          g.connect(master);
          osc.start(t0);
          osc.stop(t0 + 0.29);
        });
        break;
      }
    }
  }

  // ---------------------------------------------------------------------------
  // BGM — procedural chiptune town loop
  //
  // A simple 8-bar loop in C major pentatonic, ~112 BPM.
  // Three "instruments": bass (square), melody (square), harmony (triangle).
  // Entirely procedural — nothing downloaded or licensed.
  // ---------------------------------------------------------------------------

  private playBgmBar(barIdx: number): void {
    const ctx = this.getCtx();
    if (!ctx || !this.master || this.muted) return;
    const master = this.master;

    const bpm = 112;
    const beat = 60 / bpm; // seconds per beat
    const bar = beat * 4; // 4/4 time
    const now = ctx.currentTime + 0.02; // tiny look-ahead

    // Bass: root → fifth alternation
    const bassLine = [C3, C3, G3, G3, A3, A3, C3, G3];
    const bassNote = bassLine[barIdx % bassLine.length];
    const bassOsc = ctx.createOscillator();
    bassOsc.type = "square";
    bassOsc.frequency.value = bassNote;
    const bassG = ctx.createGain();
    bassG.gain.setValueAtTime(0, now);
    bassG.gain.linearRampToValueAtTime(0.07, now + 0.01);
    bassG.gain.setValueAtTime(0.07, now + bar - 0.06);
    bassG.gain.linearRampToValueAtTime(0, now + bar);
    bassOsc.connect(bassG);
    bassG.connect(master);
    bassOsc.start(now);
    bassOsc.stop(now + bar + 0.01);

    // Melody: 8 eighth-note pattern (2 per beat) drawn from pentatonic scale
    const pentatonic = [C4, D4, E4, G4, A4, C5, E5, G5];
    const patterns: number[][] = [
      [0, 2, 4, 2, 0, 4, 2, 0],
      [4, 2, 0, 2, 4, 5, 4, 2],
      [2, 4, 5, 4, 2, 0, 2, 4],
      [5, 4, 2, 4, 5, 7, 5, 4],
    ];
    const pattern = patterns[Math.floor(barIdx / 2) % patterns.length];
    pattern.forEach((deg, i) => {
      const freq = pentatonic[deg % pentatonic.length];
      const t0 = now + i * (beat / 2);
      const t1 = t0 + beat / 2 - 0.03;
      const osc = ctx.createOscillator();
      osc.type = "square";
      osc.frequency.value = freq;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, t0);
      g.gain.linearRampToValueAtTime(0.045, t0 + 0.012);
      g.gain.setValueAtTime(0.045, t1 - 0.02);
      g.gain.linearRampToValueAtTime(0, t1);
      osc.connect(g);
      g.connect(master);
      osc.start(t0);
      osc.stop(t1 + 0.01);
    });

    // Harmony: beat-1/beat-3 stabs (triangle, softer)
    [0, beat * 2].forEach((offset) => {
      const harmFreqs = [E4, G4, C5];
      harmFreqs.forEach((freq) => {
        const t0 = now + offset;
        const osc = ctx.createOscillator();
        osc.type = "triangle";
        osc.frequency.value = freq;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0, t0);
        g.gain.linearRampToValueAtTime(0.03, t0 + 0.02);
        g.gain.exponentialRampToValueAtTime(0.001, t0 + beat * 0.6);
        osc.connect(g);
        g.connect(master);
        osc.start(t0);
        osc.stop(t0 + beat * 0.65);
      });
    });

    // Schedule the next bar
    const nextBar = barIdx + 1;
    this.bgmTimeout = setTimeout(
      () => {
        if (this.bgmRunning) this.playBgmBar(nextBar);
      },
      (bar - 0.04) * 1000,
    );
  }

  bgm = {
    start: () => {
      if (this.bgmRunning) return;
      this.bgmRunning = true;
      const ctx = this.getCtx();
      if (!ctx || !this.master || this.muted) return;
      // Small fade-in when BGM begins
      this.master.gain.setValueAtTime(0.0, ctx.currentTime);
      this.master.gain.linearRampToValueAtTime(0.28, ctx.currentTime + 1.2);
      this.playBgmBar(0);
    },
    stop: () => {
      this.bgmRunning = false;
      if (this.bgmTimeout) clearTimeout(this.bgmTimeout);
      const ctx = this.getCtx();
      if (ctx && this.master) {
        this.master.gain.setValueAtTime(
          this.master.gain.value,
          ctx.currentTime,
        );
        this.master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
        // Restore volume so SFX still play
        setTimeout(() => {
          if (!this.muted && this.master)
            this.master.gain.setValueAtTime(0.28, ctx.currentTime);
        }, 500);
      }
    },
  };

  // ---------------------------------------------------------------------------
  // Mute
  // ---------------------------------------------------------------------------

  setMuted(v: boolean): void {
    this.muted = v;
    if (this.master && this.ctx) {
      const now = this.ctx.currentTime;
      this.master.gain.cancelScheduledValues(now);
      this.master.gain.linearRampToValueAtTime(v ? 0 : 0.28, now + 0.08);
    }
    if (v && this.bgmRunning) {
      if (this.bgmTimeout) clearTimeout(this.bgmTimeout);
    } else if (!v && this.bgmRunning) {
      this.playBgmBar(0); // restart loop after unmute
    }
    try {
      localStorage.setItem("skamlos:muted", v ? "1" : "0");
    } catch {}
  }

  getMuted(): boolean {
    return this.muted;
  }

  loadPrefs(): void {
    try {
      this.muted = localStorage.getItem("skamlos:muted") === "1";
    } catch {}
  }
}

// Singleton — shared across the whole game.
export const audio = new GameAudio();

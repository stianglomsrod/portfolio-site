/**
 * Web Audio engine for Skamløs RPG.
 *
 * SFX are synthesised at runtime (chiptune, no external assets). The
 * background music is «Læringsreisen» — Stian's own composed loop track —
 * decoded into an AudioBuffer and looped sample-accurately: loopStart/loopEnd
 * skip the silent padding the MP3 encoder adds, so the seamless loop stays
 * seamless. Lazy-initialises on the first user gesture (browser policy).
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

// Equal-tempered note frequencies (A4 = 440 Hz) — used by the SFX synths.
const C4 = 261.63,
  E4 = 329.63,
  G4 = 392.0;
const C5 = C4 * 2,
  E5 = E4 * 2,
  G5 = G4 * 2;

// The BGM loop track («Læringsreisen» v5.1), fetched lazily the first time
// the game starts so the route itself stays light. Single MP3 source: every
// browser decodes it, and the loop machinery below (padding trim + seam
// ramp) makes the loop click-free regardless of how the decoder handles the
// encoder's edge padding.
const BGM_URLS = ["/skamlos-rpg/audio/laeringsreisen-loop.mp3"];
/** BGM level relative to the master bus. */
const BGM_LEVEL = 0.9;
/** Amplitude below this counts as encoder-padding silence (≈ −60 dB). */
const BGM_SILENCE = 1e-3;
/**
 * Edge silence shorter than this is treated as part of the music, not
 * padding — trimming it would cut into the composed loop and cause a click.
 */
const BGM_MIN_TRIM_S = 0.01;

// ---------------------------------------------------------------------------
// GameAudio class
// ---------------------------------------------------------------------------

class GameAudio {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private muted = false;
  private stepParity = 0;

  // BGM state
  private bgmRunning = false;
  private bgmBuffer: AudioBuffer | null = null;
  private bgmLoop: { start: number; end: number } | null = null;
  private bgmLoading: Promise<AudioBuffer | null> | null = null;
  private bgmSource: AudioBufferSourceNode | null = null;
  private bgmGain: GainNode | null = null;

  // ---------------------------------------------------------------------------
  // Init
  // ---------------------------------------------------------------------------

  /** Must be called after a user gesture (click/key) to satisfy browser policy. */
  init(): void {
    if (this.ctx) return;
    try {
      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!Ctor) return;
      this.ctx = new Ctor();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.muted ? 0 : 0.28;
      this.master.connect(this.ctx.destination);
    } catch {
      // AudioContext unavailable (SSR, old browser); fail silently.
    }
  }

  private getCtx(): AudioContext | null {
    if (!this.ctx) this.init();
    if (this.ctx?.state === "suspended") {
      // Resume is async; fire-and-forget — the context is ready before the
      // next scheduled audio event.
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
  // BGM — «Læringsreisen», Stian's own loop track
  //
  // The track is composed to loop seamlessly (the reverb tail of the last bars
  // is folded into the intro). MP3 encoding pads both ends with silence, so we
  // decode to an AudioBuffer and loop between the first and last audible
  // samples instead of trusting the file boundaries.
  // ---------------------------------------------------------------------------

  private loadBgmBuffer(): Promise<AudioBuffer | null> {
    if (this.bgmBuffer) return Promise.resolve(this.bgmBuffer);
    if (this.bgmLoading) return this.bgmLoading;
    const ctx = this.getCtx();
    if (!ctx) return Promise.resolve(null);
    this.bgmLoading = (async () => {
      for (const url of BGM_URLS) {
        try {
          const res = await fetch(url);
          if (!res.ok) continue;
          const bytes = await res.arrayBuffer();
          const decoded = await ctx.decodeAudioData(bytes);
          const { startSample, endSample } = this.findLoopPoints(decoded);
          this.smoothLoopSeam(decoded, startSample, endSample);
          this.bgmBuffer = decoded;
          this.bgmLoop = {
            start: startSample / decoded.sampleRate,
            end: endSample / decoded.sampleRate,
          };
          return decoded;
        } catch {
          // Undecodable in this browser — try the next format.
        }
      }
      return null;
    })().finally(() => {
      this.bgmLoading = null;
    });
    return this.bgmLoading;
  }

  /**
   * Zero the cyclic jump at the loop seam: nudge the last ~8 ms so the final
   * sample lands exactly on the first one (per channel). This is the same
   * correction ramp the track was mastered with — reapplied here because
   * lossy encode/decode shifts the edge samples enough to click otherwise.
   */
  private smoothLoopSeam(
    buf: AudioBuffer,
    startSample: number,
    endSample: number,
  ): void {
    const n = Math.min(Math.round(buf.sampleRate * 0.008), 4096);
    if (endSample - startSample <= n) return;
    for (let ch = 0; ch < buf.numberOfChannels; ch++) {
      const d = buf.getChannelData(ch);
      const delta = d[startSample] - d[endSample - 1];
      if (Math.abs(delta) < 1e-6) continue;
      for (let i = 1; i <= n; i++) {
        d[endSample - 1 - n + i] += delta * (i / n);
      }
    }
  }

  /**
   * First/last sample above the silence threshold, searched within the outer
   * two seconds only (encoder padding is far shorter than that). Edge silence
   * below BGM_MIN_TRIM_S is kept: it belongs to the composed loop, and
   * trimming it would move the seam and click.
   */
  private findLoopPoints(buf: AudioBuffer): {
    startSample: number;
    endSample: number;
  } {
    const window = Math.min(buf.length, buf.sampleRate * 2);
    const channels: Float32Array[] = [];
    for (let ch = 0; ch < buf.numberOfChannels; ch++)
      channels.push(buf.getChannelData(ch));
    const audible = (i: number) =>
      channels.some((d) => Math.abs(d[i]) > BGM_SILENCE);
    let start = 0;
    for (let i = 0; i < window; i++)
      if (audible(i)) {
        start = i;
        break;
      }
    let end = buf.length;
    for (let i = buf.length - 1; i >= buf.length - window; i--)
      if (audible(i)) {
        end = i + 1;
        break;
      }
    const minTrim = buf.sampleRate * BGM_MIN_TRIM_S;
    return {
      startSample: start >= minTrim ? start : 0,
      endSample: buf.length - end >= minTrim ? end : buf.length,
    };
  }

  private startBgmSource(): void {
    const ctx = this.getCtx();
    if (!ctx || !this.master || !this.bgmBuffer || this.bgmSource) return;
    const now = ctx.currentTime;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(BGM_LEVEL, now + 1.2);
    gain.connect(this.master);
    const src = ctx.createBufferSource();
    src.buffer = this.bgmBuffer;
    src.loop = true;
    // Only narrow the loop when real padding was found; the default
    // (loopStart/loopEnd untouched) loops the whole buffer bit-exactly.
    const lp = this.bgmLoop;
    if (lp && (lp.start > 0 || lp.end < this.bgmBuffer.duration)) {
      src.loopStart = lp.start;
      src.loopEnd = lp.end;
    }
    src.connect(gain);
    src.start(now, lp?.start ?? 0);
    this.bgmSource = src;
    this.bgmGain = gain;
  }

  bgm = {
    start: () => {
      if (this.bgmRunning) return;
      this.bgmRunning = true;
      void this.loadBgmBuffer().then(() => {
        // Only start if nothing stopped the music while it was loading.
        if (this.bgmRunning && !this.bgmSource) this.startBgmSource();
      });
    },
    stop: () => {
      this.bgmRunning = false;
      const ctx = this.ctx;
      const src = this.bgmSource;
      const gain = this.bgmGain;
      this.bgmSource = null;
      this.bgmGain = null;
      if (!ctx || !src || !gain) return;
      const now = ctx.currentTime;
      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(gain.gain.value, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.4);
      try {
        src.stop(now + 0.45);
      } catch {
        // Already stopped — nothing to do.
      }
      window.setTimeout(() => {
        src.disconnect();
        gain.disconnect();
      }, 600);
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
    // The BGM keeps looping (silently) through the muted master bus, so
    // unmuting resumes mid-track. It only needs a kick-start if it never got
    // to play at all.
    if (!v && this.bgmRunning && !this.bgmSource) {
      void this.loadBgmBuffer().then(() => {
        if (this.bgmRunning && !this.bgmSource) this.startBgmSource();
      });
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
    } catch {
      // localStorage unavailable; keep default (unmuted).
    }
  }
}

// Singleton — shared across the whole game.
export const audio = new GameAudio();

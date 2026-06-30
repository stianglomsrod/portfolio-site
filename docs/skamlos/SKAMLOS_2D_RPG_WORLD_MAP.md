# SKAMLOS 2D RPG — World Map v1

> Status: Planning only. Worldmap, buildings, interiors, lock states, NPC placement,
> visual style, natural barriers and signpost logic for the top-down RPG.
> Companion docs: `SKAMLOS_2D_RPG_IMPLEMENTATION_BRIEF.md`,
> `SKAMLOS_APPLICATION_RPG_FRAMEWORK.md`, `SKAMLOS_2D_RPG_PROLOGUE_SLICE.md`.
> Creative source: `SKAMLOS_2D_RPG_GAME_DESIGN_BRIEF.md` §2–§3.

This document defines the **navigable world** for the DNB / Skamløs Pitch content pack. The
**bold** locations/interiors are needed for the prologue slice; everything else is mapped
here for continuity but is **deferred** (door visible, interior not built).

---

## 1. Worldmap overview

A small, readable town. Grusveier connect a handful of buildings. The DNB building sits at
the top of the map as a visible, locked goal. Everything is hand-placed and legible — no
abstract menu, no invisible walls.

```text
                          ┌───────────────────────┐
                          │   DNB AI Tech-bygget   │  (visible early, LOCKED)
                          │   [resepsjon] [egg]    │  unlock = søknadspakke klar
                          └───────────┬───────────┘
                                      │ grusvei (trær langs kanten)
                          ┌───────────┴───────────┐
                          │  OsloMet / Universitet │  (visible; door LOCKED in prologue)
                          │  [Kari appears later]  │  starts Workshop + Master chains
                          └───────────┬───────────┘
                                      │ grusvei
        ┌─────────────────────┐   ┌───┴────┐   ┌──────────────────────┐
        │  SKOLEN             │   │ BYKRYSS │   │  NIKKOS HUS          │
        │  [hovedinngang] ◄───┼───┤ skiltpost├──┼──► [Flutterfly ute]  │
        │  [workshop-inngang] │   │  (NPC)  │   │   (sidequest, later) │
        │   (LOCKED, later)   │   └───┬────┘   └──────────────────────┘
        └─────────────────────┘      │ grusvei
                                ┌─────┴─────┐
                                │ STIANS HJEM│  (PC-hub)
                                │ [pult][PC] │  desk, 2 monitors, badeand
                                │ [badeand]  │
                                └───────────┘
```

> Prologue path: **Classroom (inside Skolen) → out to Bykryss → Stians hjem → PC**. DNB and
> OsloMet are visible from the town but locked; Nikkos hus and the workshop entrance exist
> visually but are not enterable yet.

### Coordinate & tile conventions

- Author all maps in **Tiled**; export as JSON to `public/skamlos-rpg/maps/`.
- Tile size: **32×32** (or 16×16 scaled ×2 — pick one and keep it consistent across packs).
- Each map has at least these Tiled layers: `ground`, `decor`, `collision` (objects or a
  tile layer flagged collidable), and an `objects` layer for spawns/exits/interactable
  anchors. Names must match `MapDef.collisionLayer` and the exit/spawn ids in pack data.
- The town is one `world` map; each building interior is its own `interior` map. Entering a
  building = an `Exit` trigger that loads the interior map at a named spawn (no seamless
  building interiors needed for v1).

---

## 2. Buildings & lock states

| Building | Map id | Prologue state | Interior built in v1? | Unlock condition (later) |
| --- | --- | --- | --- | --- |
| **Skolen — hovedinngang** | `classroom` | **Open (start here)** | **Yes** | — (start location) |
| Skolen — workshop-inngang | `workshop` | Visible, **LOCKED** | No | Master/Workshop quest from OsloMet |
| **Stians hjem** | `home` | **Open** | **Yes** | — |
| OsloMet / Universitet | `oslomet` | Visible, **LOCKED** | No | After Ordkryss reward (chain starts) |
| Nikkos hus | `nikko` | Visible, **LOCKED** | No | Flutterfly sidequest (optional) |
| DNB AI Tech-bygget | `dnb` | Visible, **LOCKED** | No | Søknadspakke complete (endgame) |

**Locked-door rule (all locked buildings):** the door is visibly a door; interacting shows a
short readable line. Never a silent invisible wall. Examples:

- DNB: `"Resepsjonen tar bare imot komplette søknadspakker."`
- OsloMet (prologue): `"Universitetet venter. Du er ikke helt klar for dette ennå."`
- Workshop entrance: `"Workshoprommet er låst. Du trenger et metodeoppdrag fra OsloMet først."`
- Nikkos hus: `"Det er noen hjemme, men du har ingen grunn til å banke på ennå."`

> Lock text is `GateRef.lockedText` in pack data and may differ as quests progress (the
> engine picks the current gate's text).

---

## 3. Interiors

### 3.1 Classroom (`classroom`) — BUILT in v1

- **Role:** start location; later also student-insight collection (deferred).
- **Props (visible, some collidable):** tavle, kateter, pulter i rader, klokke på veggen,
  sekker, vinduer, dør ut.
- **Actors (v1):** the player (Stian) at a desk. Two student NPCs may stand in the room as
  ambience, but their **insight dialogue is deferred** (prologue only needs the bell + exit).
- **Mood line on enter:** `"Siste time er snart ferdig. Etterpå venter Ordkryss hjemme."`
- **Key beats:** bell rings → Quest 2 starts → exit door becomes the objective.
- **Exit:** `classroom.door → { map: "town", spawn: "from-school" }`.

### 3.2 Stians hjem (`home`) — BUILT in v1

- **Role:** PC-hub; programming/prototype/portfolio quests happen here (only the PC/Ordkryss
  path is built in v1).
- **Props:** pult, **PC med to skjermer**, **badeand**, kaffekopp, bøker/notater, litt
  koselig rot. Personal, warm.
- **Interactables (v1):**
  - `home-pc` (kind `pc`) → `startMinigame: "ordkryss"`. Prompt: `"Undersøk PC-en"`.
  - `home-duck` (kind `duck`) → short dry hint dialogue. Prompt: `"Snakk med badeanda"`.
- **Exit:** `home.door → { map: "town", spawn: "from-home" }`.

### 3.3 Deferred interiors (NOT built in v1)

- `workshop` (school workshop room): stort bord, journey map, grønne/røde/blå lapper, tusjer,
  post-its, kaffekopper, tavle, lærer-NPC-er. Built with the Master/Workshop chain.
- `oslomet`: larger, institutional feel (no logo/branding); Kari NPC; graduation scene.
- `nikko`: sidequest interior tied to Flutterfly/companion app.
- `dnb` reception: søknadsbunke, Stians søknadspakke, the egg (`"Du prøver å lese teksten,
  men den er altfor liten."`), endgame trigger.

---

## 4. NPC placement

| NPC | Where | v1? | Role | Notes |
| --- | --- | --- | --- | --- |
| Stian (player) | classroom start | ✅ | player | controllable avatar |
| Elev 1, Elev 2 | classroom | optional ambience | student | **insight dialogue deferred**; composite/fictional, represent needs not real pupils |
| Skiltpost-NPC | Bykryss | optional | signpost | gives **direction only**, not the metaphor (see §6) |
| Kari | OsloMet | ❌ deferred | reference | former fellow student & later reference-person; appears after master chain; `showWhen` gated |
| Lærer-NPC-er | workshop | ❌ deferred | teacher | teacher insights for master/Klar chain |
| Nikko (implied) | Nikkos hus / Flutterfly | ❌ deferred | companion | sidequest only |
| Badeand | home (by PC) | ✅ | hint | dry, short hints; not an NPC with a face necessarily — an interactable |
| DNB-resepsjonist | DNB reception | ❌ deferred | receptionist | minimal; does NOT explain the egg |

Claim-safety on NPCs: students/teachers are **fictional/composite** and represent needs, not
real, identifiable people. No participant or school names anywhere.

---

## 5. Natural barriers (no invisible walls)

The town is bounded and shaped by **visible** features, never invisible collision:

- **Trær og skog** along the map edges and between buildings — readable "you can't go here."
- **Busker og gjerder** line the grusveier and yards.
- **Vann / grøft / steingjerde** can close off the far edges.
- **Bygninger** themselves block movement; their doors are the only way "through."
- **Lyktestolper, benker, postkasser, skilt** are small collidable props that add life.

Implementation: all of these sit on the Tiled `collision` layer (or are flagged collidable),
so the barrier the player *sees* is exactly the barrier they *feel*. A quick QA pass must
confirm there is no spot where the player stops with nothing visible there.

---

## 6. Signpost & navigation logic

- The **Bykryss skiltpost** (and/or a single signpost NPC) is the navigation aid. It must
  **only point**, never lecture:
  - During the prologue, after the bell: `"Hjem er nedover veien. Ordkryss venter."`
  - After the Ordkryss reward: `"OsloMet ligger oppover veien. Det kan være verdt en tur."`
- Signs near each building name it plainly (`Skolen`, `OsloMet`, `DNB`) so the player can
  orient without a menu.
- The DNB building being visible from early on is intentional: it is the goal on the horizon.
- Do **not** put the game's metaphor ("dette representerer reisen din…") into signpost text.
  Direction only. The metaphor is felt through play.

### Navigation state machine (prologue)

```text
[classroom] --bell--> objective: "Gå hjem og fullfør Ordkryss"
     │ exit door
     ▼
[town: from-school] --walk--> [home door]
     │ (DNB door here shows locked text if tried)
     ▼
[home] --interact PC--> Ordkryss minigame --reward-->
     │ signpost/objective updates: "Dra til OsloMet"
     ▼
[town] --OsloMet door = LOCKED with readable line (chain deferred)
```

---

## 7. Visual style notes

- **Top-down, Pokémon/Zelda-readable**, warm and handmade — *inspiration only, no copied
  assets, IP, palettes or logos.*
- Clear silhouettes: buildings, doors, paths and barriers must read instantly at a glance.
- Cohesive limited palette per the pack `theme` tokens; consistent tile lighting.
- Small environmental detail (trær, busker, gjerder, skilt, benker, lyktestolper, postkasser,
  blomster) makes the town feel alive rather than abstract.
- Locked buildings look "closed but real": shut doors, maybe a small sign — not greyed-out.
- Respect `prefers-reduced-motion`: idle animations (sway, water shimmer) reduce/stop.
- All art original or CC0/CC-BY (with attribution recorded in the implementation log).

---

## 8. Map authoring checklist (for the implementer)

For each of `classroom`, `town`, `home` (the v1 maps):

- [ ] Tiled map exported to `public/skamlos-rpg/maps/<id>.json`.
- [ ] `ground`, `decor`, `collision`, `objects` layers present and named consistently.
- [ ] Spawn points placed and named to match `MapDef.spawns` (`spawn-default`, `from-school`,
      `from-home`, etc.).
- [ ] Exit trigger rects placed and named to match `Exit.id` and `to` targets.
- [ ] Interactable anchors (PC, duck, DNB door, signpost) placed to match pack data ids.
- [ ] No invisible walls: every collidable tile has a visible feature on it.
- [ ] DNB and OsloMet buildings visible from the town with named signs and locked doors.

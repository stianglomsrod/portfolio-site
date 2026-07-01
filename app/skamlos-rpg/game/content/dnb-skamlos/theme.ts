import type { AssetManifest, ThemeTokens } from "../../engine/types";

const BASE = "/skamlos-rpg";

// Warm, handmade RPG palette — original, NOT a DNB brand palette.
export const theme: ThemeTokens = {
  bg: "#3b6b3f",
  accent: "#e6a23c",
  ink: "#2b2018",
  lock: "#b9603a",
  uiAccent: "#e6a23c",
  playerSpriteKey: "player",
};

const img = (folder: string, name: string) => `${BASE}/${folder}/${name}.png`;

export const assets: AssetManifest = {
  images: {
    // ground tiles
    grass: img("tiles", "grass"),
    grass2: img("tiles", "grass2"),
    path: img("tiles", "path"),
    dirt: img("tiles", "dirt"),
    floor_class: img("tiles", "floor_class"),
    wall_class: img("tiles", "wall_class"),
    floor_home: img("tiles", "floor_home"),
    wall_home: img("tiles", "wall_home"),
    rug: img("tiles", "rug"),
    // props
    tree: img("props", "tree"),
    bush: img("props", "bush"),
    hedge: img("props", "hedge"),
    fence: img("props", "fence"),
    flowers: img("props", "flowers"),
    rock: img("props", "rock"),
    lamp: img("props", "lamp"),
    bench: img("props", "bench"),
    sign: img("props", "sign"),
    door: img("props", "door"),
    window: img("props", "window"),
    chalkboard: img("props", "chalkboard"),
    clock: img("props", "clock"),
    desk_class: img("props", "desk_class"),
    desk_home: img("props", "desk_home"),
    pc: img("props", "pc"),
    duck: img("props", "duck"),
    coffee: img("props", "coffee"),
    books: img("props", "books"),
    bed: img("props", "bed"),
    plant: img("props", "plant"),
    guitar: img("props", "guitar"),
    amp: img("props", "amp"),
    mic: img("props", "mic"),
    arrow: img("props", "arrow"),
    // npc stills (now 2-frame sheets below) + the player's real avatar photo
    avatar: "/images/avatar/stian-face.png",
    // buildings
    school: img("buildings", "school"),
    house: img("buildings", "home"),
    dnb: img("buildings", "dnb"),
    oslomet: img("buildings", "oslomet"),
    nikko: img("buildings", "nikko"),
    workshop: img("buildings", "workshop"),
  },
  spritesheets: {
    player: { url: img("sprites", "player"), frameWidth: 32, frameHeight: 32 },
    water: { url: img("tiles", "water"), frameWidth: 32, frameHeight: 32 },
    flutterfly: {
      url: img("sprites", "flutterfly"),
      frameWidth: 32,
      frameHeight: 32,
    },
    npc_student1: {
      url: img("sprites", "npc_student1"),
      frameWidth: 32,
      frameHeight: 32,
    },
    npc_student2: {
      url: img("sprites", "npc_student2"),
      frameWidth: 32,
      frameHeight: 32,
    },
  },
};

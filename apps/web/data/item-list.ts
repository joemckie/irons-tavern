import { ItemCategoryMap } from '@/app/schemas/items';
import { abyssalSire } from './item-categories/abyssal-sire';
import { alchemicalHydra } from './item-categories/alchemical-hydra';
import { araxxor } from './item-categories/araxxor';
import { barbarianAssault } from './item-categories/barbarian-assault';
import { callistoAndArtio } from './item-categories/callisto-and-artio';
import { cerberus } from './item-categories/cerberus';
import { chambersOfXeric } from './item-categories/chambers-of-xeric';
import { chaosElemental } from './item-categories/chaos-elemental';
import { chompyBirdHunting } from './item-categories/chompy-bird-hunting';
import { commanderZilyana } from './item-categories/commander-zilyana';
import { corporealBeast } from './item-categories/corporeal-beast';
import { dagannothKings } from './item-categories/dagannoth-kings';
import { demonicGorillas } from './item-categories/demonic-gorillas';
import { desertTreasure2 } from './item-categories/desert-treasure-2';
import { doomOfMokhaiotl } from './item-categories/doom-of-mokhaiotl';
import { fortisColosseum } from './item-categories/fortis-colosseum';
import { generalGraardor } from './item-categories/general-graardor';
import { grotesqueGuardians } from './item-categories/grotesque-guardians';
import { theGauntlet } from './item-categories/the-gauntlet';
import { giantMole } from './item-categories/giant-mole';
import { theHueycoatl } from './item-categories/the-hueycoatl';
import { kalphiteQueen } from './item-categories/kalphite-queen';
import { kingBlackDragon } from './item-categories/king-black-dragon';
import { kraken } from './item-categories/kraken';
import { krearra } from './item-categories/krearra';
import { krilTsutsaroth } from './item-categories/kril-tsutsaroth';
import { majorSlayerItems } from './item-categories/major-slayer-items';
import { miscellaneous } from './item-categories/miscellaneous';
import { miscellaneousWildernessItems } from './item-categories/miscellaneous-wilderness-items';
import { nex } from './item-categories/nex';
import { theNightmare } from './item-categories/the-nightmare';
import { perilousMoons } from './item-categories/perilous-moons';
import { phantomMuspah } from './item-categories/phantom-muspah';
import { revenants } from './item-categories/revenants';
import { royalTitans } from './item-categories/royal-titans';
import { sarachnis } from './item-categories/sarachnis';
import { scorpia } from './item-categories/scorpia';
import { scurrius } from './item-categories/scurrius';
import { skillingPets } from './item-categories/skilling-pets';
import { skotizo } from './item-categories/skotizo';
import { soulWars } from './item-categories/soul-wars';
import { theatreOfBlood } from './item-categories/theatre-of-blood';
import { thermonuclearSmokeDevil } from './item-categories/thermonuclear-smoke-devil';
import { tombsOfAmascut } from './item-categories/tombs-of-amascut';
import { tormentedDemons } from './item-categories/tormented-demons';
import { treasureTrails } from './item-categories/treasure-trails';
import { tzHaar } from './item-categories/tzhaar';
import { venenatisAndSpindel } from './item-categories/venenatis-and-spindel';
import { vetionAndCalvarion } from './item-categories/vetion-and-calvarion';
import { visages } from './item-categories/visages';
import { vorkath } from './item-categories/vorkath';
import { yama } from './item-categories/yama';
import { zalcano } from './item-categories/zalcano';
import { zulrah } from './item-categories/zulrah';

export const itemList: ItemCategoryMap = {
  'Abyssal Sire': abyssalSire,
  'Alchemical Hydra': alchemicalHydra,
  Araxxor: araxxor,
  'Barbarian Assault': barbarianAssault,
  'Callisto and Artio': callistoAndArtio,
  Cerberus: cerberus,
  'Chambers of Xeric': chambersOfXeric,
  'Chaos Elemental': chaosElemental,
  'Chompy Bird Hunting': chompyBirdHunting,
  'Commander Zilyana': commanderZilyana,
  'Corporeal Beast': corporealBeast,
  'Dagannoth Kings': dagannothKings,
  'Demonic Gorillas': demonicGorillas,
  'Desert Treasure 2': desertTreasure2,
  'Doom of Mokhaiotl': doomOfMokhaiotl,
  'Fortis Colosseum': fortisColosseum,
  'General Graardor': generalGraardor,
  'Grotesque Guardians': grotesqueGuardians,
  'The Gauntlet': theGauntlet,
  'Giant Mole': giantMole,
  'The Hueycoatl': theHueycoatl,
  'Kalphite Queen': kalphiteQueen,
  'King Black Dragon': kingBlackDragon,
  Kraken: kraken,
  "Kree'arra": krearra,
  "K'ril Tsutsaroth": krilTsutsaroth,
  'Major Slayer Items': majorSlayerItems,
  'Miscellaneous Items': miscellaneous,
  'Miscellaneous Wilderness Items': miscellaneousWildernessItems,
  Nex: nex,
  'The Nightmare': theNightmare,
  'Perilous Moons': perilousMoons,
  'Phantom Muspah': phantomMuspah,
  Revenants: revenants,
  'Royal Titans': royalTitans,
  Sarachnis: sarachnis,
  Scorpia: scorpia,
  Scurrius: scurrius,
  'Skilling Pets': skillingPets,
  Skotizo: skotizo,
  'Soul Wars': soulWars,
  'Theatre of Blood': theatreOfBlood,
  'Thermonuclear Smoke Devil': thermonuclearSmokeDevil,
  'Tombs of Amascut': tombsOfAmascut,
  'Tormented Demons': tormentedDemons,
  'Treasure Trails': treasureTrails,
  TzHaar: tzHaar,
  'Venenatis and Spindel': venenatisAndSpindel,
  "Vet'ion and Calvar'ion": vetionAndCalvarion,
  Visages: visages,
  Vorkath: vorkath,
  Yama: yama,
  Zalcano: zalcano,
  Zulrah: zulrah,
} satisfies ItemCategoryMap;

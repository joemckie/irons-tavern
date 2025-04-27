import { Skill } from '@/app/schemas/osrs';

/**
 * 60 EHB is the default rate given by TempleOSRS when a new boss is added.
 *
 * As they don't provide rates for all bosses, this is used as a fallback.
 */
export const defaultEhbRate = 60;

/**
 * EHB rates are copied from here:
 *
 * https://templeosrs.com/efficiency/pvm.php?ehb=im
 *
 * **Note**: Only IM EHB should be used!
 */
export const ehbRates = {
  'Abyssal Sire': 39,
  'Alchemical Hydra': 29,
  'Barrows Chests': 22,
  Bryophyta: 9,
  Callisto: 135,
  Cerberus: 54,
  'Chambers of Xeric': 3.5,
  'Chambers of Xeric Challenge Mode': 3,
  'Chaos Elemental': 48,
  'Chaos Fanatic': 80,
  'Commander Zilyana': 30,
  'Corporeal Beast': 8.5,
  'Crazy Archaeologist': 75,
  'Dagannoth Prime': 100,
  'Dagannoth Rex': 100,
  'Dagannoth Supreme': 100,
  'Deranged Archaeologist': 80,
  'General Graardor': 31,
  'Giant Mole': 97,
  'Grotesque Guardians': 34,
  Hespori: 50,
  'Kalphite Queen': 37,
  'King Black Dragon': 75,
  Kraken: 90,
  "Kree'arra": 30,
  "K'ril Tsutsaroth": 32,
  Mimic: 50,
  Obor: 12,
  Sarachnis: 67,
  Scorpia: 80,
  Skotizo: 38,
  'The Gauntlet': 10,
  'The Corrupted Gauntlet': 7.2,
  'Theatre of Blood': 3.2,
  'Thermonuclear Smoke Devil': 100,
  'TzKal-Zuk': 0.9,
  'TzTok-Jad': 2.2,
  Venenatis: 80,
  "Vet'ion": 39,
  Vorkath: 34,
  Zulrah: 39,
  'The Nightmare': 11,
  "Phosani's Nightmare": 6.7,
  Nex: 15,
  'Tombs of Amascut': 3.7,
  'Tombs of Amascut (Expert)': 2, // Override from 3 to match solo ToAs
  'Phantom Muspah': 27,
  Artio: 50,
  "Calvar'ion": 45,
  Spindel: 50,
  'Duke Sucellus': 30,
  'The Leviathan': 27,
  'The Whisperer': 21,
  Vardorvis: 35,
  Scurrius: 60,
  'Lunar Chests': 18,
  'Sol Heredit': 2.5,
  Araxxor: 38,
  'The Hueycoatl': 9,
  Amoxliatl: 71,
  'The Royal Titans': 55,
  'Medium Clue': 4.6,
  'Easy Clue': 15,
  'Guardians of the Rift': 6,
} satisfies Record<string, number>;

/**
 * EHP rates are copied from here:
 *
 * https://templeosrs.com/efficiency/skilling.php?ehp=im
 *
 * **Note**: Only IM EHP should be used!
 */
export const ehpRates = {
  Agility: 97600,
  Attack: 186400,
  Construction: 279100,
  Cooking: 440000,
  Crafting: 207200,
  Defence: 768000,
  Farming: 2000000,
  Firemaking: 462400,
  Fishing: 141800,
  Fletching: 1524300,
  Hitpoints: 0,
  Herblore: 76000,
  Hunter: 240000,
  Magic: 0,
  Mining: 125000,
  Prayer: 175900,
  Ranged: 1560900,
  Runecraft: 123000,
  Slayer: 73260,
  Smithing: 375000,
  Strength: 300000,
  Thieving: 0,
  Woodcutting: 187600,
} satisfies Record<Skill, number>;

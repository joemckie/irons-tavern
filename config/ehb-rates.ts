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
  'Tombs of Amascut (Expert)': 3,
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
} satisfies Record<string, number>;

/**
 * Some bosses provide their loot through rewards instead of drops (e.g. Unsired)
 *
 * This maps the item name to the boss to calculate the EHB rate.
 */
export const itemBossNameMap: Record<string, keyof typeof ehbRates> = {
  Unsired: 'Abyssal Sire',
  'Ancient chest': 'Chambers of Xeric Challenge Mode',
  'Chest (Tombs of Amascut)': 'Tombs of Amascut (Expert)',
};

/**
 * Some unique drops don't come directly from the original source, e.g.:
 *
 * - Abyssal Sire drops Unsired at 1/100, which in turn drops loot at its own rate (e.g. 5/128 for Abyssal Orphan).
 *   This means the Abyssal Orphan's drop rate is in reality 5/12800.
 * - Chambers of Xeric has a reward chest with a variable unique rate, which also has its own way of proportioning uniques.
 *
 * This map is used to modify the drop rate provided by OSRSWiki by the rate of the drop source occurring.
 */
export const dropRateModifiers: Record<string, number> = {
  Unsired: 1 / 100,
  'Chest (Tombs of Amascut)': 1 / 10,
  'Ancient chest': 1 / 7.23,
};

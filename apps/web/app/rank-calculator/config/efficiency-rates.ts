import { CollectionLogItemName } from '@/app/schemas/osrs';

/**
 * EHB rates are copied from here:
 *
 * https://templeosrs.com/rates/bosses.php?ehp=imehb
 *
 * **Note**: Only IM EHB should be used!
 */
export const ehbRates = {
  'Abyssal Sire': 44,
  'Alchemical Hydra': 29,
  Amoxliatl: 71,
  Araxxor: 38,
  Artio: 50,
  'Barrows Chests': 22,
  Bryophyta: 9,
  Callisto: 142,
  "Calvar'ion": 45,
  Cerberus: 54,
  'Chambers of Xeric': 3.5,
  'Chambers of Xeric Challenge Mode': 3,
  'Chaos Elemental': 48,
  'Chaos Fanatic': 80,
  'Colosseum Glory': 15000,
  'Commander Zilyana': 30,
  'Corporeal Beast': 10,
  'Crazy Archaeologist': 95,
  'Dagannoth Prime': 100,
  'Dagannoth Rex': 100,
  'Dagannoth Supreme': 100,
  'Deranged Archaeologist': 95,
  'Doom of Mokhaiotl': 18,
  'Duke Sucellus': 37,
  'General Graardor': 31,
  'Giant Mole': 97,
  'Grotesque Guardians': 34,
  Hespori: 50,
  'The Hueycoatl': 9,
  Kraken: 90,
  "Kree'arra": 30,
  "K'ril Tsutsaroth": 32,
  'King Black Dragon': 75,
  'Kalphite Queen': 37,
  'Lunar Chests': 10,
  Mimic: 50,
  Nex: 15,
  Obor: 12,
  "Phosani's Nightmare": 9.3,
  'Phantom Muspah': 27,
  Sarachnis: 67,
  Scurrius: 60,
  Scorpia: 80,
  'Sol Heredit': 2.8,
  Spindel: 50,
  'Soul Wars Zeal': 375,
  'The Corrupted Gauntlet': 7.2,
  'The Gauntlet': 10,
  'The Leviathan': 27,
  'The Nightmare': 11,
  'The Royal Titans': 55,
  'The Whisperer': 21,
  'Theatre of Blood': 3.2,
  'Theatre of Blood Hard Mode': 3,
  'Thermonuclear Smoke Devil': 100,
  'Tombs of Amascut': 3.7,
  'Tombs of Amascut (Expert)': 3,
  'TzKal-Zuk': 1,
  'TzTok-Jad': 2.2,
  Vardorvis: 37,
  Venenatis: 80,
  "Vet'ion": 39,
  Vorkath: 34,
  Wintertodt: 12,
  Yama: 18,
  Zalcano: 40,
  Zulrah: 42,

  // These rates are self-calculated and are not from TempleOSRS
  "Armoured zombie (Zemouregal's Fort)": 250,
  'Araxyte#Level 146': 900, // Assuming an average of a 20 minute task consisting of 300 kills
  'Barbarian Assault': 3,
  'Basilisk Knight': 100, // Assuming an average of a 100 minute task consisting of 165 kills
  'Black dragon#Wilderness Slayer Cave': 50, // Assumed value - can cannon in the Wilderness Slayer Cave
  'Cave horror': 528,
  'Chompy bird': 350,
  'Dark beast': 60,
  'Demonic gorilla': 62, // https://oldschool.runescape.wiki/w/Money_making_guide/Killing_demonic_gorillas,
  'Easy Clue': 18, // https://oldschool.runescape.wiki/w/Money_making_guide/Pickpocketing_H.A.M._members
  'Expert Hunter Contracts': 24,
  'Guardians of the Rift': 60, // Assuming an average of 6 games per hour with 10 points per game
  'Hallowed Sepulchre': 8.4, // https://oldschool.runescape.wiki/w/Hallowed_Sepulchre#Experience_rates
  Herbiboar: 60,
  'Lizardman shaman': 180, // Assuming cannoning in the Lizardman Canyon https://oldschool.runescape.wiki/w/Money_making_guide/Killing_Lizardman_Shamans_(Canyon)
  'LMS Points': 25,
  'Master Clue': 1,
  'Medium Clue': 4.6, // Assuming an average of 180 implings caught per hour and 5 minutes spent per clue
  'Revenant ork': 150, // https://oldschool.runescape.wiki/w/Money_making_guide/Killing_revenants_(Craw%27s_bow)
  'Revenant ork#On-task': 150, // https://oldschool.runescape.wiki/w/Money_making_guide/Killing_revenants_(Craw%27s_bow)
  Skotizo: 1, // Temple doesn't account for the time taken to gather totems, assuming 1 totem acquired per hour
  'Spitting Wyvern': 100,
  Tempoross: 80, // Assuming an average of 80 permits per hour
  'Tormented Demon': 55, // https://oldschool.runescape.wiki/w/Money_making_guide/Killing_Tormented_Demons
  Drake: 164,
  Kurask: 280,
  'Warped Terrorbird': 450,
  'Zombie Pirate Key': 21, // https://oldschool.runescape.wiki/w/Money_making_guide/Killing_zombie_pirates
  'Mithril dragon': 72, // Assuming an average of a 5 minute task consisting of 6 kills
} satisfies Record<string, number>;

/**
 * EHC rates are pulled from the TempleOSRS Collection Log
 */
export const petEhcRates = {
  'Baby chinchompa': 91.5,
  Beaver: 111.3,
  'Giant squirrel': 132.8,
  Heron: 84.3,
  Phoenix: 85.4,
  'Rift guardian': 67.9,
  'Rock golem': 118.3,
  Rocky: 25,
  Tangleroot: 82,
} satisfies Partial<Record<CollectionLogItemName, number>>;

export const estimatedHoursForImbuedHeart = 125;
export const eternalGloryDropRate = 1 / 25000;
export const gloriesChargedPerHour = 600;
export const swiftBladeLmsPointsRequired = 350;
export const estimatedHoursToObtainAbyssalWhip = 20;
export const estimatedHoursToObtainBottomlessCompostBucket = 35;
export const estimatedHoursToAcquireMusicCape = 100;
export const estimatedHoursToAcquireQuestCape = 100;
export const estimatedHoursToAcquireMageArena2Cape = 10;
export const estimatedHoursToAcquireBarrowsGloves = 10;
export const estimatedHoursToAcquireBookOfTheDead = 10;
export const estimatedHoursToAcquireGracefulSet = 50;
export const estimatedHoursToComplete6Jads = 250;

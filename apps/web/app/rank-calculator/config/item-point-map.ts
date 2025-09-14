import { CollectionLogItemName } from '@/app/schemas/osrs';
import { ehbRates } from './efficiency-rates';

/**
 * Some bosses provide their loot through rewards instead of drops (e.g. Unsired)
 *
 * This maps the item name to the boss to calculate the EHB rate.
 */
export const rewardItemBossNameMap: Record<string, keyof typeof ehbRates> = {
  Unsired: 'Abyssal Sire',
  'Ancient chest': 'Chambers of Xeric Challenge Mode',
  'Chest (Tombs of Amascut)': 'Tombs of Amascut (Expert)',
  'Monumental chest': 'Theatre of Blood Hard Mode',
  'Monumental chest#Normal Mode': 'Theatre of Blood',
  'Monumental chest#Hard Mode': 'Theatre of Blood Hard Mode',
  'Reward Chest (The Gauntlet)#(Corrupted)': 'The Corrupted Gauntlet',
  'Rewards Chest (Fortis Colosseum)#Wave 1': 'Sol Heredit',
  'Rewards Chest (Fortis Colosseum)#Wave 2': 'Sol Heredit',
  'Rewards Chest (Fortis Colosseum)#Wave 3': 'Sol Heredit',
  'Rewards Chest (Fortis Colosseum)#Wave 4': 'Sol Heredit',
  'Rewards Chest (Fortis Colosseum)#Wave 5': 'Sol Heredit',
  'Rewards Chest (Fortis Colosseum)#Wave 6': 'Sol Heredit',
  'Rewards Chest (Fortis Colosseum)#Wave 7': 'Sol Heredit',
  'Rewards Chest (Fortis Colosseum)#Wave 8': 'Sol Heredit',
  'Rewards Chest (Fortis Colosseum)#Wave 9': 'Sol Heredit',
  'Rewards Chest (Fortis Colosseum)#Wave 10': 'Sol Heredit',
  'Rewards Chest (Fortis Colosseum)#Wave 11': 'Sol Heredit',
  'Rewards Chest (Fortis Colosseum)#Wave 12': 'Sol Heredit',
  'Vorkath#Post-quest': 'Vorkath',
  "Chest (Bryophyta's lair)#Free-to-play": 'Bryophyta',
  "Chest (Bryophyta's lair)#Members": 'Bryophyta',
  'Branda the Fire Queen': 'The Royal Titans',
  'Eldric the Ice King': 'The Royal Titans',
  'Lunar Chest': 'Lunar Chests',
  'Scurrius#MVP': 'Scurrius',
  'Reward casket (easy)#Standard': 'Easy Clue',
  'Reward casket (medium)#Standard': 'Medium Clue',
  'Reward casket (master)': 'Master Clue',
  'Thermonuclear smoke devil': 'Thermonuclear Smoke Devil',
  'Cave kraken': 'Kraken',
  'Crazy archaeologist': 'Crazy Archaeologist',
  'Reward Cart': 'Wintertodt',
  'Spoils of war': 'Soul Wars Zeal',
  "Hunters' loot sack (expert)": 'Expert Hunter Contracts',
  'Reward pool': 'Tempoross',
  'Rewards Guardian': 'Guardians of the Rift',
  'Barbarian Assault/Gambles#High': 'Barbarian Assault',
  'Grand Hallowed Coffin': 'Hallowed Sepulchre',
  "Zombie Pirate's Locker": 'Zombie Pirate Key',
  'Chewed bones': 'Mithril dragon',
};

/**
 * Some items may be sourced from an item with identical names that conflict with the boss to EHB mapping.
 *
 * This map is used to override a specific **collection log item** to a boss EHB.
 *
 * This override takes precedence over the `rewardItemBossNameMap` mapping.
 */
export const collectionLogItemBossNameMap: Partial<
  Record<CollectionLogItemName, keyof typeof ehbRates>
> = {
  "Lil' zik": 'Theatre of Blood',
};

/**
 * Some unique drops don't come directly from the original source, e.g.:
 *
 * - Abyssal Sire drops Unsired at 1/100, which in turn drops loot at its own rate (e.g. 5/128 for Abyssal Orphan).
 *   This means the Abyssal Orphan's drop rate is in reality 5/12800.
 * - Chambers of Xeric has a reward chest with a variable unique rate, which also has its own way of proportioning unique items.
 *
 * This map is used to modify the drop rate provided by OSRSWiki by the rate of the drop source occurring.
 */
export const dropRateModifiers: Record<string, number> = {
  Unsired: 1 / 100,
  'Ancient chest': 1 / 7.23,
  'Chewed bones': 1 / 42.67,
};

/**
 * Some content is expected to be completed in a group to be the most efficient,
 * meaning the player will only receive a fraction of the loot.
 */
export const groupSizes: Partial<Record<keyof typeof ehbRates, number>> = {
  'Chambers of Xeric Challenge Mode': 3,
  Nex: 4,
  Zalcano: 4,
  Yama: 2,
};

/**
 * Some items have unique drop mechanics that mean their rarities aren't quite correct in reality.
 *
 * For example, the Hydra's eye, fang and heart are all 1/180, but dupe protection makes the effective drop rate 1/60.
 *
 * This map is used to modify the final item points to account for this.
 */
export const pointModifiers: Partial<Record<CollectionLogItemName, number>> = {
  "Hydra's eye": 1 / 3,
  "Hydra's fang": 1 / 3,
  "Hydra's heart": 1 / 3,
  "Lil' creator": 30, // Obtained from Spoils of War which costs 30 Soul Wars Zeal to purchase
  'Twisted ancestral colour kit':
    1 / groupSizes['Chambers of Xeric Challenge Mode']!,
  'Metamorphic dust': 1 / groupSizes['Chambers of Xeric Challenge Mode']!,
  'Oathplate chest': 0.625, // Oathplate armour can be created by the player using Oathplate shards
  'Oathplate helm': 0.625, // Oathplate armour can be created by the player using Oathplate shards
  'Oathplate legs': 0.625, // Oathplate armour can be created by the player using Oathplate shards
};

/**
 * Some drop sources provide multiple rolls from the drop table.
 *
 * For example, medium clue caskets have between 3 and 5 rolls, with an average of 4,
 * but OSRSWiki provides each item with a roll of 1.
 *
 * This map is used to overrides the rolls provided by OSRSWiki to get the correct drop rate.
 */
export const rollOverrides: Record<string, number> = {
  'Reward casket (easy)#Standard': 3,
  'Reward casket (medium)#Standard': 4,
};

/**
 * Some items have drop rates that are more nuanced than what is provided by OSRSWiki.
 *
 * For example, the Avernic defender hilt has a drop rate of 1/19, but in reality is 1/64
 * when taking into consideration the loot mechanics of the raid.
 *
 * This map is used to override the item rarity provided by OSRSWiki to get the correct item drop rate.
 */
export const rarityOverrides: Partial<Record<CollectionLogItemName, number>> = {
  'Avernic defender hilt': 1 / 64,
  'Ghrazi rapier': 1 / 259,
  'Sanguinesti staff (uncharged)': 1 / 259,
  'Justiciar chestguard': 1 / 259,
  'Justiciar faceguard': 1 / 259,
  'Justiciar legguards': 1 / 259,
  'Scythe of vitur (uncharged)': 1 / 519,
  'Jal-nib-rek': 1 / 43, // Assuming the player kills Zuk on-task for a 1/75 roll and exchanges an Infernal Cape for a 1/100 roll
  'Tzrek-jad': 1 / 67, // Assuming the player kills TzTok-Jad on-task for a 1/100 roll and exchanges a Fire Cape for a 1/200 roll
  'Smol heredit': 1 / 100.25, // Assuming the player exchanges a Dizana's Quiver for an additional 1/200 roll
  Phoenix: 1 / 2500, // Assuming the player achieves 500 points per game, equivalent to 2 rolls
  "Tumeken's shadow (uncharged)": 1 / 289.8, // Assuming a duo 400 invocation level raid with Walk the Path enabled
  'Masori mask': 1 / 144.9,
  'Masori body': 1 / 144.9,
  'Masori chaps': 1 / 144.9,
  "Elidinis' ward": 1 / 96.6,
  Lightbearer: 1 / 41.4,
  "Tumeken's guardian": 1 / 338.1,
  'Jewel of the sun': 3 / 50, // The drop rate of any gem increases to 3 / 50 at 75 kc
  'Breach of the scarab': 3 / 50, // The drop rate of any gem increases to 3 / 50 at 75 kc
  'Eye of the corruptor': 3 / 50, // The drop rate of any gem increases to 3 / 50 at 75 kc
  'Jewel of amascut': 3 / 50, // The drop rate of any gem increases to 3 / 50 at 75 kc
  get "Osmumten's fang"() {
    return 1 / 41.4;
  },
  get 'Masori crafting kit'() {
    return this["Osmumten's fang"];
  },
  get 'Menaphite ornament kit'() {
    return this["Osmumten's fang"]! / 1.5;
  },
  get 'Cursed phalanx'() {
    return this["Osmumten's fang"]! / 2.25;
  },
  get 'Remnant of akkha'() {
    return this["Osmumten's fang"]! / 2.2;
  },
  get 'Remnant of ba-ba'() {
    return this["Osmumten's fang"]! / 1.9;
  },
  get 'Remnant of kephri'() {
    return this["Osmumten's fang"]! / 2.1;
  },
  get 'Remnant of zebak'() {
    return this["Osmumten's fang"]! / 1.9;
  },
  get 'Ancient remnant'() {
    return this["Osmumten's fang"]! / 1.9;
  },
  'Coagulated venom': 1 / 66,
  'Eclipse atlatl': 1 / (25 / 3),
  'Eclipse moon chestplate': 1 / (25 / 3),
  'Eclipse moon tassets': 1 / (25 / 3),
  'Eclipse moon helm': 1 / (25 / 3),
  'Dual macuahuitl': 1 / (25 / 3),
  'Blood moon chestplate': 1 / (25 / 3),
  'Blood moon tassets': 1 / (25 / 3),
  'Blood moon helm': 1 / (25 / 3),
  'Blue moon spear': 1 / (25 / 3),
  'Blue moon chestplate': 1 / (25 / 3),
  'Blue moon tassets': 1 / (25 / 3),
  'Blue moon helm': 1 / (25 / 3),
  'Echo crystal': 1 / 10.44, // https://oldschool.runescape.wiki/w/Echo_crystal
  Dom: 1 / 559, // https://docs.google.com/spreadsheets/d/1FGl6Olhbustu7ltIDhCE47_9oGOvx8ULFE1YfnyscGQ/edit?usp=sharing
  'Eye of ayak (uncharged)': 1 / 739, // https://docs.google.com/spreadsheets/d/1FGl6Olhbustu7ltIDhCE47_9oGOvx8ULFE1YfnyscGQ/edit?usp=sharing
  'Mokhaiotl cloth': 1 / 716, // https://docs.google.com/spreadsheets/d/1FGl6Olhbustu7ltIDhCE47_9oGOvx8ULFE1YfnyscGQ/edit?usp=sharing
  'Avernic treads': 1 / 770, // https://docs.google.com/spreadsheets/d/1FGl6Olhbustu7ltIDhCE47_9oGOvx8ULFE1YfnyscGQ/edit?usp=sharing
};

/**
 * Some items have an alternate rarity as provided by OSRSWiki.
 *
 * For example, the Amulet of avarice has a 1/2933 drop rate from a Revenant Ork on-task whilst unskulled, but 1/1613 whilst skulled.
 *
 * This map is used to switch to the alternate rarity provided by OSRSWiki.
 */
export const altRarityItems: Partial<
  Record<CollectionLogItemName, Record<string, true>>
> = {
  'Amulet of avarice': {
    'Revenant ork#On-task': true,
  },
  "Craw's bow (u)": {
    'Revenant ork#On-task': true,
  },
  "Thammaron's sceptre (u)": {
    'Revenant ork#On-task': true,
  },
  "Viggora's chainmace (u)": {
    'Revenant ork#On-task': true,
  },
  'Ancient crystal': {
    'Revenant ork': true,
  },
  'Basilisk jaw': {
    'Basilisk Knight': true,
  },
  'Thread of elidinis': {
    'Chest (Tombs of Amascut)': true,
  },
  "Drake's claw": {
    Drake: true,
  },
  "Drake's tooth": {
    Drake: true,
  },
  'Avernic treads': {
    'Doom of Mokhaiotl': true,
  },
  'Mokhaiotl cloth': {
    'Doom of Mokhaiotl': true,
  },
  'Eye of ayak (uncharged)': {
    'Doom of Mokhaiotl': true,
  },
  Dom: {
    'Doom of Mokhaiotl': true,
  },
};

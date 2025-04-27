import { CollectionLogItemName } from '@/app/schemas/osrs';
import { ehbRates } from './efficiency-rates';

/**
 * Some bosses provide their loot through rewards instead of drops (e.g. Unsired)
 *
 * This maps the item name to the boss to calculate the EHB rate.
 */

export const itemBossNameMap: Record<string, keyof typeof ehbRates> = {
  Unsired: 'Abyssal Sire',
  'Ancient chest': 'Chambers of Xeric Challenge Mode',
  'Chest (Tombs of Amascut)': 'Tombs of Amascut (Expert)',
  'Monumental chest': 'Theatre of Blood',
  'Monumental chest#Hard Mode': 'Theatre of Blood',
  'Monumental chest#Normal Mode': 'Theatre of Blood',
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
  'Bryophyta#F2P': 'Bryophyta',
  'Bryophyta#Members': 'Bryophyta',
  'Branda the Fire Queen': 'The Royal Titans',
  'Eldric the Ice King': 'The Royal Titans',
  'Lunar Chest': 'Lunar Chests',
  'Scurrius#MVP': 'Scurrius',
  'Reward casket (medium)': 'Medium Clue',
  'Reward casket (easy)': 'Easy Clue',
  'Thermonuclear smoke devil': 'Thermonuclear Smoke Devil',
  'Cave kraken': 'Kraken',
  'Crazy archaeologist': 'Crazy Archaeologist',
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
  'Chest (Tombs of Amascut)': 1 / 10,
  'Ancient chest': 1 / 7.23,
  'Monumental chest#Hard Mode': 1 / 2.4,
};

/**
 * Some items have unique drop mechanics that mean their rarities aren't quite correct in reality.
 *
 * For example, the Hydra's eye, fang and heart are all 1/180, but dupe protection makes the effective drop rate 1/60.
 *
 * This map is used to modify the final item points to account for this.
 */

export const pointModifiers: Partial<Record<CollectionLogItemName, number>> = {
  'Eye of the corruptor': 1 / 3,
  'Jewel of the sun': 1 / 3,
  'Breach of the scarab': 1 / 3,
  "Hydra's eye": 1 / 3,
  "Hydra's fang": 1 / 3,
  "Hydra's heart": 1 / 3,
  'Tzrek-jad': 67 / 200,
  'Jal-nib-rek': 43 / 100,
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
  'Reward casket (medium)': 4,
  'Reward casket (easy)': 3,
};

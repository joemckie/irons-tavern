import { z, ZodNumber } from 'zod';
import {
  altRarityItems,
  rarityOverrides,
  rollOverrides,
} from '@/app/rank-calculator/config/item-point-map';
import {
  CollectionLogItemName,
  CombatAchievementTier,
  DiaryLocation,
  DiaryTier,
  maximumSkillLevel,
  Skill,
} from './osrs';
import { fractionToDecimal } from './transformers/fraction-to-decimal';

export const DiaryTierData = z.object({
  complete: z.boolean(),
  tasks: z.array(z.boolean()).nonempty(),
});

export type DiaryTierData = z.infer<typeof DiaryTierData>;

export const QuestStatus = z.nativeEnum({
  NotStarted: 0,
  Started: 1,
  Completed: 2,
});

export type QuestStatus = z.infer<typeof QuestStatus>;

export const LevelMap = z.object(
  Object.fromEntries(
    Skill.options.map((skill) => [
      skill,
      z.number().min(1).max(maximumSkillLevel),
    ]),
  ) as {
    [Key in keyof typeof Skill.enum]: ZodNumber;
  },
);

export type LevelMap = z.infer<typeof LevelMap>;

export const HolidayTrack = z.enum([
  "Bunny's Sugar Rush",
  "Diango's Little Helpers",
  'Dies Irae',
  "Dot's Yuletide",
  'Easter Jig',
  "Eve's Epinette",
  'A Festive Party',
  'Funny Bunnies',
  'Grimly Fiendish',
  'High Spirits',
  'Jungle Bells',
  'Jungle Island Xmas',
  'Land of Snow',
  'Nox Irae',
  "Scrubfoot's Descent",
  'Sea Minor Shanty',
  'Sea Shanty Xmas',
  'Sunny Side Up',
  'Winter Funfair',
]);

export type HolidayTrack = z.infer<typeof HolidayTrack>;

export function isHolidayTrack(track: unknown): track is HolidayTrack {
  return HolidayTrack.safeParse(track).success;
}

export const WikiSyncResponse = z.object({
  username: z.string(),
  timestamp: z.string(),
  league_tasks: z.array(z.unknown()),
  achievement_diaries: z
    .record(z.string(), z.record(z.string(), DiaryTierData))
    .refine(
      (
        item,
      ): item is Record<
        DiaryLocation,
        Record<Exclude<DiaryTier, 'None'>, DiaryTierData>
      > =>
        DiaryLocation.options.every((location) =>
          DiaryTier.exclude(['None']).options.every(
            (tier) => item[location][tier],
          ),
        ),
    ),
  levels: LevelMap.extend({
    Overall: z.number().optional(),
  }),
  music_tracks: z.record(z.string(), z.boolean()),
  quests: z.record(z.string(), QuestStatus),
  combat_achievements: z.array(z.number().nonnegative()),
});

export type WikiSyncResponse = z.infer<typeof WikiSyncResponse>;

export const WikiSyncError = z.object({
  code: z.string(),
  error: z.string(),
});

export type WikiSyncError = z.infer<typeof WikiSyncError>;

export function isWikiSyncError(
  wikiSyncResponse: unknown,
): wikiSyncResponse is WikiSyncError {
  return WikiSyncError.safeParse(wikiSyncResponse).success;
}

export const CombatAchievementListResponse = z.object({
  query: z.object({
    printrequests: z.unknown(),
    results: z.record(
      z.string(),
      z.object({
        printouts: z.object({
          'Combat Achievement JSON': z.array(z.string()),
        }),
        fulltext: z.string(),
        fullurl: z.string(),
        namespace: z.number(),
        exists: z.string(),
        displaytitle: z.string(),
      }),
    ),
    serializer: z.string(),
    version: z.number(),
    meta: z.unknown(),
  }),
});

export type CombatAchievementListResponse = z.infer<
  typeof CombatAchievementListResponse
>;

const ItemRarity = z
  .string()
  .transform(fractionToDecimal)
  .pipe(
    z.union([
      z.nan(),
      z
        .number()
        .lt(1, 'Item rarity must be less than 1')
        .gt(0, 'Item rarity must be more than 0'),
    ]),
  );

export const DroppedItemJSON = z
  .object({
    'Alt Rarity': ItemRarity,
    Rarity: ItemRarity,
    'Dropped from': z.string(),
    'Dropped item': z.string(),
    Rolls: z.number().positive(),
  })
  .transform((data) => ({
    altRarity: data['Alt Rarity'],
    rarity: data.Rarity,
    dropSource: data['Dropped from'],
    itemName: data['Dropped item'],
    rolls: data.Rolls,
  }));

export type DroppedItemJSON = z.infer<typeof DroppedItemJSON>;

export const DroppedItemResponse = z
  .object({
    bucket: z.array(
      z.object({
        drop_json: z
          .string()
          .transform((jsonString) =>
            DroppedItemJSON.parse(JSON.parse(jsonString)),
          ),
      }),
    ),
  })
  .transform(({ bucket }) =>
    bucket.reduce<Record<string, Record<string, number>>>(
      (
        acc,
        { drop_json: { altRarity, itemName, dropSource, rarity, rolls } },
      ) => {
        acc[itemName] = acc[itemName] ?? {};

        const rarityOverride =
          rarityOverrides[itemName as CollectionLogItemName];
        const useAltRarity =
          !!altRarityItems[itemName as CollectionLogItemName]?.[dropSource];

        if (useAltRarity && !altRarity) {
          throw new Error(
            `Could not find alt rarity for ${itemName} from ${dropSource}!`,
          );
        }

        // Certain items are rolled multiple times, e.g. Granite Hammer.
        // As the rarity is for an individual roll, we multiply the
        // individual rarity by the number of rolls to get the final item rarity
        acc[itemName][dropSource] =
          (rarityOverride ?? (useAltRarity ? altRarity : rarity)) *
          (rollOverrides[dropSource] ?? rolls);

        return acc;
      },
      {},
    ),
  );

export type DroppedItemResponse = z.infer<typeof DroppedItemResponse>;

export const CombatAchievementJson = z.object({
  monster: z.string(),
  type: z.string(),
  name: z.string(),
  tier: CombatAchievementTier.exclude(['None']),
  id: z.string(),
  task: z.string(),
});

export type CombatAchievementJson = z.infer<typeof CombatAchievementJson>;

export const CombatAchievementTierThresholdResponse = z.object({
  expandtemplates: z.object({
    wikitext: z.string(),
  }),
});

export const CollectionLogItemRecord = z.object({
  id: z.number().nonnegative(),
  name: z.string(),
});

export const CollectionLogItemMap = z.record(
  z.number(),
  CollectionLogItemRecord.omit({ name: true }),
);

export const CollectionLogResponse = z.array(CollectionLogItemRecord);

export type CollectionLogResponse = z.infer<typeof CollectionLogResponse>;

export const CollectionLogAcquiredItemMap = z.record(
  z.string(),
  z.number().nonnegative(),
);

export type CollectionLogAcquiredItemMap = z.infer<
  typeof CollectionLogAcquiredItemMap
>;

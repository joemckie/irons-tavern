import { z, ZodNumber } from 'zod';
import {
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

const ItemRarity = z.string().transform(fractionToDecimal);

export const DroppedItemJSON = z.object({
  Rarity: ItemRarity,
  'Alt Rarity': ItemRarity,
  'Drop type': z.enum(['combat', 'reward']),
  'Dropped from': z.string(),
});

export type DroppedItemJSON = z.infer<typeof DroppedItemJSON>;

export const DroppedItemResponse = z
  .object({
    query: z.object({
      results: z.record(
        z.string(),
        z.object({
          printouts: z.object({
            'Drop JSON': z.array(z.string()),
          }),
        }),
      ),
    }),
  })
  .transform((response) =>
    Object.values(response.query.results).map((result) =>
      DroppedItemJSON.parse(JSON.parse(result.printouts['Drop JSON'][0])),
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

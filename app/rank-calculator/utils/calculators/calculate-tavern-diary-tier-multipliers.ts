import { TavernDiarySection } from '@/app/schemas/tavern-diaries';
import { tavernDiaryDiscordRoles } from '@/config/discord-roles';
import { tavernDiaryTierMultipliers } from '@/config/tavern-diaries';

export function calculateTavernDiaryTierMultipliers(
  discordRoles: Set<string> | null,
) {
  if (!discordRoles) {
    return {
      collectionLogBonusMultiplier: 0,
      combatBonusMultiplier: 0,
      skillingBonusMultiplier: 0,
    };
  }

  const {
    'Collection Log': collectionLogBonusMultiplier,
    Combat: combatBonusMultiplier,
    Skilling: skillingBonusMultiplier,
  } = (
    Object.keys(
      tavernDiaryDiscordRoles,
    ) as (keyof typeof tavernDiaryDiscordRoles)[]
  ).reduce(
    (acc, key) => ({
      ...acc,
      [key]: [...tavernDiaryDiscordRoles[key]].reduce(
        (tierMultiplier, [tier, roleId]) =>
          discordRoles.has(roleId)
            ? tavernDiaryTierMultipliers[tier]
            : tierMultiplier,
        0,
      ),
    }),
    {} as Record<TavernDiarySection, number>,
  );

  return {
    collectionLogBonusMultiplier,
    combatBonusMultiplier,
    skillingBonusMultiplier,
  };
}

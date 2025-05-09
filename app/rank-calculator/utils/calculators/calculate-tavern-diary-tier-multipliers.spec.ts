import { tavernDiaryDiscordRoles } from '@/config/discord-roles';
import { calculateTavernDiaryTierMultipliers } from './calculate-tavern-diary-tier-multipliers';

it('calculates the correct tier multipliers', () => {
  const roles = new Set<string>([
    tavernDiaryDiscordRoles['Collection Log'].get('Duke')!,
    tavernDiaryDiscordRoles.Combat.get('Baron')!,
    tavernDiaryDiscordRoles.Skilling.get('Bartender')!,
  ]);

  const {
    collectionLogBonusMultiplier,
    combatBonusMultiplier,
    skillingBonusMultiplier,
  } = calculateTavernDiaryTierMultipliers(roles);

  expect(collectionLogBonusMultiplier).toEqual(0.4);
  expect(combatBonusMultiplier).toEqual(0.3);
  expect(skillingBonusMultiplier).toEqual(0.1);
});

it('calculates the correct tier multipliers when multiple roles for the same diary are present', () => {
  const roles = new Set<string>([
    tavernDiaryDiscordRoles['Collection Log'].get('Duke')!,
    tavernDiaryDiscordRoles['Collection Log'].get('Baron')!,
    tavernDiaryDiscordRoles.Combat.get('Baron')!,
    tavernDiaryDiscordRoles.Combat.get('Duke')!,
    tavernDiaryDiscordRoles.Skilling.get('Bartender')!,
    tavernDiaryDiscordRoles.Skilling.get('Landlord')!,
  ]);

  const {
    collectionLogBonusMultiplier,
    combatBonusMultiplier,
    skillingBonusMultiplier,
  } = calculateTavernDiaryTierMultipliers(roles);

  expect(collectionLogBonusMultiplier).toEqual(0.4);
  expect(combatBonusMultiplier).toEqual(0.4);
  expect(skillingBonusMultiplier).toEqual(0.2);
});

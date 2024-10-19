import { constants } from '@/config/constants';
import { CombatAchievementTier } from '@/types/osrs';

export async function getCaTierThresholds() {
  const query = [
    '{{Globals|ca easy points}}',
    '{{Globals|ca medium points}}',
    '{{Globals|ca hard points}}',
    '{{Globals|ca elite points}}',
    '{{Globals|ca master points}}',
    '{{Globals|ca gm points}}',
  ].join('|');

  const tierPointThresholdParams = new URLSearchParams({
    action: 'expandtemplates',
    format: 'json',
    text: query,
    prop: 'wikitext',
    formatversion: '2',
  }).toString();

  const response = await fetch(
    `${constants.wiki.baseUrl}/api.php?${tierPointThresholdParams}`,
  );

  const data: { expandtemplates: { wikitext: string } } = await response.json();

  const [
    easyPoints,
    mediumPoints,
    hardPoints,
    elitePoints,
    masterPoints,
    gmPoints,
  ] = data.expandtemplates.wikitext.split('|');

  return {
    [CombatAchievementTier.Easy]: Number(easyPoints),
    [CombatAchievementTier.Medium]: Number(mediumPoints),
    [CombatAchievementTier.Hard]: Number(hardPoints),
    [CombatAchievementTier.Elite]: Number(elitePoints),
    [CombatAchievementTier.Master]: Number(masterPoints),
    [CombatAchievementTier.Grandmaster]: Number(gmPoints),
  };
}

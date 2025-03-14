import * as Sentry from '@sentry/nextjs';
import { clientConstants } from '@/config/constants.client';
import { TempleOSRSPlayerCollectionLog } from '@/app/schemas/temple-api';

export async function fetchTemplePlayerCollectionLog(player: string) {
  try {
    const categories = [
      'abyssal_sire',
      'alchemical_hydra',
      'araxxor',
      'cerberus',
      'chambers_of_xeric',
      'commander_zilyana',
      'corporeal_beast',
      'dagannoth_kings',
      'gloughs_experiments',
      'vardorvis',
      'the_leviathan',
      'the_whisperer',
      'duke_sucellus',
      'fortis_colosseum',
      'general_graardor',
      'grotesque_guardians',
      'kraken',
      'kree_arra',
      'kril_tsutsaroth',
      'sarachnis',
      'the_gauntlet',
      'theatre_of_blood',
      'thermonuclear_smoke_devil',
      'tormented_demons',
      'the_fight_caves',
      'the_inferno',
      'vorkath',
      'zulrah',
      'the_nightmare',
      'nex',
      'tombs_of_amascut',
      'moons_of_peril',
      'phantom_muspah',
      'venenatis_and_spindel',
      'vetion_and_calvarion',
      'callisto_and_artio',
      'revenants',
      'slayer',
      'miscellaneous',
      'chaos_fanatic',
      'scorpia',
      'crazy_archaeologist',
      'hespori',
      'bryophyta',
      'easy_treasure_trails',
      'medium_treasure_trails',
      'last_man_standing',
      'zalcano',
      'wintertodt',
      'tempoross',
      'hallowed_sepulchre',
      'rooftop_agility',
      'skotizo',
      'kalphite_queen',
      'all_pets',
    ];
    const collectionLogQueryParams = new URLSearchParams({
      player,
      onlyitems: '1',
      includenames: '1',
      categories: categories.join(','),
    });

    const playerStatsResponse = await fetch(
      `${clientConstants.temple.baseUrl}/api/collection-log/player_collection_log.php?${collectionLogQueryParams}`,
    );

    return TempleOSRSPlayerCollectionLog.parse(await playerStatsResponse.json())
      .data;
  } catch {
    Sentry.captureMessage('TempleOSRS player stats not found', 'info');

    return null;
  }
}

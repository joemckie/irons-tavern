import { Rank } from '@/config/enums';
import { z } from 'zod';

export const CheckMethod = z.enum(['datapoint', 'get-game-mode']);

export const ClanMember = z.object({
  rsn: z.string(),
  rank: Rank,
  joinedDate: z.string(),
});

export type ClanMember = z.infer<typeof ClanMember>;

export const ClanMemberList = z.array(ClanMember);

export type ClanMemberList = z.infer<typeof ClanMemberList>;

export const ClanExport = z.object({
  clanName: z.string(),
  clanMemberMaps: z.array(ClanMember),
});

export type ClanExport = z.infer<typeof ClanExport>;

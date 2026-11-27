import { z } from "zod";
import * as Sentry from "@sentry/nextjs";
import { clientConstants } from "@/config/constants.client";
import { serverConstants } from "@/config/constants.server";
import {
  CollectionLogItemNamesResponse,
  GroupCollectionLogMember,
  GroupCollectionLogResponse,
  GroupMemberInfoResponse,
  MemberInfo,
} from "@/app/schemas/temple-api";
import { generateCollectionLogCategoryList } from "../../data-sources/fetch-player-details/fetch-temple-collection-log";

export interface TempleGroupData {
  /** Keyed by Temple RSN */
  members: GroupMemberInfoResponse["data"]["memberlist"];
  collectionLog: GroupCollectionLogResponse["data"];
  /** Item ID → collection log item name */
  itemNames: Record<string, string>;
}

async function fetchTemple<T extends z.ZodType>(
  path: string,
  params: Record<string, string>,
  schema: T,
): Promise<z.infer<T>> {
  const query = new URLSearchParams(params);
  const response = await fetch(`${clientConstants.temple.baseUrl}${path}?${query}`);

  if (!response.ok) {
    throw new Error(`TempleOSRS request to ${path} failed with status ${response.status}`);
  }

  return schema.parse(await response.json());
}

/**
 * Group responses are parsed member by member, so one malformed record drops only that member
 * (who is then reported as missing Temple stats or a collection log) instead of the whole group.
 */
const LooseGroupMemberInfoResponse = z.object({
  data: z.object({
    memberlist: z.record(z.string(), z.unknown()),
  }),
});

const LooseGroupCollectionLogResponse = z.looseObject({
  data: z.looseObject({
    total_collections_available: z.number().nonnegative(),
    members: z.array(z.unknown()),
  }),
});

function parseMembers<T extends z.ZodType>(
  entries: [string, unknown][],
  schema: T,
  source: string,
) {
  return entries.flatMap(([key, value]): [string, z.infer<T>][] => {
    const result = schema.safeParse(value);

    if (!result.success) {
      Sentry.captureMessage(`Malformed TempleOSRS ${source} member skipped`, {
        level: "warning",
        extra: { key, issues: result.error.issues },
      });

      return [];
    }

    return [[key, result.data]];
  });
}

/**
 * Fetches the whole TempleOSRS group in three requests.
 * Any failure throws, as nothing in the auto-rank report can be calculated without them.
 */
export async function fetchTempleGroupData(): Promise<TempleGroupData> {
  const { groupId } = serverConstants.temple;

  const [memberInfo, collectionLog, itemNames] = await Promise.all([
    fetchTemple(
      "/api/group_member_info.php",
      { id: groupId, details: "1", skills: "1", bosses: "1" },
      LooseGroupMemberInfoResponse,
    ),
    fetchTemple(
      "/api/collection-log/group_collection_log.php",
      {
        group: groupId,
        includecount: "1",
        categories: [...generateCollectionLogCategoryList()].join(","),
      },
      LooseGroupCollectionLogResponse,
    ),
    fetchTemple("/api/collection-log/items.php", {}, CollectionLogItemNamesResponse),
  ]);

  const members = Object.fromEntries(
    parseMembers(
      // Temple includes an entry keyed by an empty string
      Object.entries(memberInfo.data.memberlist).filter(([rsn]) => rsn !== ""),
      MemberInfo,
      "member info",
    ),
  );

  const collectionLogMembers = parseMembers(
    collectionLog.data.members.map((member, index) => [String(index), member]),
    GroupCollectionLogMember,
    "collection log",
  ).map(([, member]) => member);

  return {
    members,
    collectionLog: { ...collectionLog.data, members: collectionLogMembers },
    itemNames: itemNames.items,
  };
}

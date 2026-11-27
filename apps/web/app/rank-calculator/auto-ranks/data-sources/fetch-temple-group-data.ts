import type { z } from "zod";
import { clientConstants } from "@/config/constants.client";
import { serverConstants } from "@/config/constants.server";
import {
  CollectionLogItemNamesResponse,
  GroupCollectionLogResponse,
  GroupMemberInfoResponse,
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
 * Fetches the whole TempleOSRS group in three requests.
 * Any failure throws, as nothing in the auto-rank report can be calculated without them.
 */
export async function fetchTempleGroupData(): Promise<TempleGroupData> {
  const { groupId } = serverConstants.temple;

  const [memberInfo, collectionLog, itemNames] = await Promise.all([
    fetchTemple(
      "/api/group_member_info.php",
      { id: groupId, details: "1", skills: "1", bosses: "1" },
      GroupMemberInfoResponse,
    ),
    fetchTemple(
      "/api/collection-log/group_collection_log.php",
      {
        group: groupId,
        includecount: "1",
        categories: [...generateCollectionLogCategoryList()].join(","),
      },
      GroupCollectionLogResponse,
    ),
    fetchTemple("/api/collection-log/items.php", {}, CollectionLogItemNamesResponse),
  ]);

  return {
    members: memberInfo.data.memberlist,
    collectionLog: collectionLog.data,
    itemNames: itemNames.items,
  };
}

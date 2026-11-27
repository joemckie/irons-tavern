import { list } from "@vercel/blob";
import type { ClanListMember } from "../auto-rank-row";
import { parseClanMemberList } from "./parse-clan-member-list";

/**
 * Fetches the latest in-game clan export, uploaded alongside the TempleOSRS group update.
 */
export async function fetchClanMemberList(): Promise<ClanListMember[]> {
  const { blobs } = await list({ prefix: "members" });
  const [latest] = blobs.toSorted((a, b) => +b.uploadedAt - +a.uploadedAt);

  if (!latest) {
    throw new Error("No clan member list has been uploaded");
  }

  const response = await fetch(latest.url);

  if (!response.ok) {
    throw new Error(`Clan member list request failed with status ${response.status}`);
  }

  return parseClanMemberList(await response.json());
}

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Flex, Heading, Spinner, Text } from "@radix-ui/themes";
import { auth } from "@/auth";
import { userCanModerateSubmission } from "../view/[submissionId]/utils/user-can-moderate-submission";
import { buildAutoRankReport } from "./build-auto-rank-report";
import { sortAutoRankRows, summariseAutoRankRows } from "./sort-auto-rank-rows";
import { AutoRankTable } from "./auto-rank-table";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

async function AutoRankReport() {
  const rows = sortAutoRankRows(await buildAutoRankReport());
  const summary = Object.entries(summariseAutoRankRows(rows)).filter(([, count]) => count > 0);

  return (
    <Flex direction="column" gap="4" width="100%">
      <Text size="2" color="gray">
        {rows.length} members:{" "}
        {summary.map(([outcome, count]) => `${count} ${outcome.toLowerCase()}`).join(", ")}
      </Text>
      <AutoRankTable rows={rows} />
    </Flex>
  );
}

export default async function AutoRanksPage() {
  await connection();

  const session = await auth();

  if (!userCanModerateSubmission(session?.user?.permissions)) {
    notFound();
  }

  return (
    <Flex direction="column" gap="4" p="6" align="start">
      <Heading>Auto-rank checker</Heading>
      <Text size="2" color="gray">
        Ranks are only calculated for members with a verified TempleOSRS collection log, TempleOSRS
        stats and WikiSync data, using the Standard rank structure. Draft submissions are never
        used. Join dates and current ranks come from the in-game clan export. Tavern Diary bonuses
        come from Discord roles, found through a linked account or an exact server nickname.
      </Text>
      <Suspense
        fallback={
          <Flex align="center" gap="3">
            <Spinner size="3" />
            <Text>Checking members…</Text>
          </Flex>
        }
      >
        <AutoRankReport />
      </Suspense>
    </Flex>
  );
}

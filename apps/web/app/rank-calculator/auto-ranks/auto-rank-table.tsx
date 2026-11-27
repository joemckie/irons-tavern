import Image from "next/image";
import { Badge, Flex, Table, Text } from "@radix-ui/themes";
import type { Rank } from "@/config/enums";
import { formatNumber } from "../utils/format-number";
import { getRankImageUrl } from "../utils/get-rank-image-url";
import { getRankName } from "../utils/get-rank-name";
import type { AutoRankRow } from "./auto-rank-row";

function RankCell({ rank }: { rank?: Rank }) {
  if (!rank) {
    return <Text color="gray">-</Text>;
  }

  return (
    <Flex align="center" gap="2">
      <Image
        alt={`${getRankName(rank)} icon`}
        src={getRankImageUrl(rank)}
        height={20}
        width={20}
        unoptimized
      />
      <Text>{getRankName(rank)}</Text>
    </Flex>
  );
}

export function AutoRankTable({ rows }: { rows: AutoRankRow[] }) {
  return (
    <Table.Root size="1" variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>RSN</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Discord user</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Current rank</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Calculated rank</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell align="right">Total points</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Rank up</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Notes</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {rows.map((row) => (
          <Table.Row key={row.rsn}>
            <Table.RowHeaderCell>
              <a
                className="underline"
                href={`https://templeosrs.com/player/overview.php?player=${encodeURIComponent(row.rsn)}`}
                target="_blank"
                rel="noreferrer"
              >
                {row.rsn}
              </a>
            </Table.RowHeaderCell>
            <Table.Cell>
              {row.discordName ? (
                <Flex align="center" gap="2">
                  <Text>{row.discordName}</Text>
                  {row.discordMatchedBy === "Nickname" && (
                    <Badge color="gray" variant="outline">
                      Nickname
                    </Badge>
                  )}
                </Flex>
              ) : (
                <Text color="gray">-</Text>
              )}
            </Table.Cell>
            <Table.Cell>
              <RankCell rank={row.currentRank} />
            </Table.Cell>
            <Table.Cell>
              <RankCell rank={row.calculatedRank} />
            </Table.Cell>
            <Table.Cell align="right">
              {row.totalPoints === undefined ? (
                <Text color="gray">-</Text>
              ) : (
                formatNumber(row.totalPoints)
              )}
            </Table.Cell>
            <Table.Cell>{row.isRankUp && <Badge color="green">Rank up</Badge>}</Table.Cell>
            <Table.Cell>
              {row.skipReason && (
                <Badge color={row.skipReason === "Error" ? "red" : "gray"}>{row.skipReason}</Badge>
              )}
              {row.hasDiscordRoles === false && (
                <Badge color="amber">No Discord roles, so no Tavern Diary bonus</Badge>
              )}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

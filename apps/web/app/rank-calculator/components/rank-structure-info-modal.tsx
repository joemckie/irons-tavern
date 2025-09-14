import { useState, useTransition } from 'react';
import { Button, Dialog, Flex, Inset, Table } from '@radix-ui/themes';
import { useWatch } from 'react-hook-form';
import { calculateRankThresholds } from '@/app/rank-calculator/utils/calculate-rank-thresholds';
import { Rank } from '@/config/enums';
import Image from 'next/image';
import { RankCalculatorSchema } from '../[player]/submit-rank-calculator-validation';
import { getRankName } from '../utils/get-rank-name';
import { formatNumber } from '../utils/format-number';
import { getRankImageUrl } from '../utils/get-rank-image-url';
import { useMaximumAvailablePoints } from '../hooks/point-calculator/use-maximum-available-points';

export function RankStructureInfoModal() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const rankStructure = useWatch<RankCalculatorSchema, 'rankStructure'>({
    name: 'rankStructure',
  });
  const maximumAvailablePoints = useMaximumAvailablePoints();
  const rankThresholds = calculateRankThresholds(maximumAvailablePoints);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(isOpen) => {
        startTransition(() => {
          setOpen(isOpen);
        });
      }}
    >
      <Dialog.Trigger>
        <Button loading={isPending} size="2" variant="soft">
          View rank structure
        </Button>
      </Dialog.Trigger>
      <Dialog.Content maxWidth="400px" aria-describedby={undefined}>
        <Dialog.Title size="3">{rankStructure}</Dialog.Title>
        <Inset side="x">
          <Table.Root size="1">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell width="22px">
                  Icon
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Rank</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell align="right">
                  Points
                </Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Object.entries(rankThresholds[rankStructure])
                .reverse()
                .map(([rank, points]) => (
                  <Table.Row key={rank}>
                    <Table.Cell>
                      <Image
                        alt={`${rank} icon`}
                        src={getRankImageUrl(rank as Rank)}
                        height={22}
                        width={22}
                        unoptimized
                      />
                    </Table.Cell>
                    <Table.Cell>{getRankName(rank as Rank)}</Table.Cell>
                    <Table.Cell align="right">
                      {formatNumber(points)}
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table.Root>
        </Inset>
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Close
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

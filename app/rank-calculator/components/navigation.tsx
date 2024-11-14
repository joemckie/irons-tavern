import { startTransition } from 'react';
import { Box, Button, Flex, Text } from '@radix-ui/themes';
import { useFormContext } from 'react-hook-form';
import Image from 'next/image';
import Link from 'next/link';
import { useRank } from '../hooks/use-rank';
import { useRankCalculator } from '../hooks/point-calculator/use-rank-calculator';
import { getRankName } from '../utils/get-rank-name';
import { formatNumber } from '../utils/format-number';
import { RankCalculatorSchema } from '../[player]/submit-rank-calculator-validation';
import { getRankImageUrl } from '../utils/get-rank-image-url';

export function Navigation() {
  const {
    reset,
    formState: { isValid, isSubmitting, isDirty },
  } = useFormContext<RankCalculatorSchema>();
  const { pointsAwarded } = useRankCalculator();
  const { rank } = useRank(pointsAwarded);
  const rankName = getRankName(rank);

  return (
    <Box
      asChild
      p="3"
      gridArea="nav"
      position={{
        initial: 'fixed',
        md: 'static',
      }}
      right={{
        initial: '0',
        md: 'auto',
      }}
      left={{
        initial: '0',
        md: 'auto',
      }}
      style={{
        background: 'var(--color-background)',
        borderBottom: '1px solid var(--gray-5)',
        zIndex: 100,
      }}
    >
      <Flex align="center" justify="between" asChild>
        <nav role="navigation">
          <Flex direction="row" gap="4" align="center">
            <Image
              alt={`${rank} icon`}
              src={getRankImageUrl(rank)}
              width={22}
              height={22}
            />
            <Text size="2" as="div">
              <Text as="div">
                <Text weight="medium">Rank:</Text>{' '}
                <Text color="gray">{rankName}</Text>
              </Text>
              <Text as="div">
                <Text weight="medium">Points:</Text>{' '}
                <Text color="gray">{formatNumber(pointsAwarded)}</Text>
              </Text>
            </Text>
          </Flex>
          <Flex gap="2">
            <Button asChild variant="outline" color="gray">
              <Link href="/rank-calculator">Back</Link>
            </Button>
            <Button
              variant="outline"
              color="gray"
              type="button"
              disabled={!isDirty}
              onClick={() => {
                startTransition(() => {
                  reset();
                });
              }}
            >
              Reset
            </Button>
            <Button
              role="button"
              loading={isSubmitting}
              disabled={!isValid || isSubmitting}
              variant="surface"
            >
              Submit
            </Button>
          </Flex>
        </nav>
      </Flex>
    </Box>
  );
}

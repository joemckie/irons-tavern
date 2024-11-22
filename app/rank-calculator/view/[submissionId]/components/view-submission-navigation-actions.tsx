import { Box, Flex, Text } from '@radix-ui/themes';
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons';
import {
  RankSubmissionMetadata,
  RankSubmissionStatus,
} from '@/app/schemas/rank-calculator';
import { RejectSubmissionButton } from './reject-submission-button';
import { ApproveSubmissionButton } from './approve-submission-button';

interface ViewSubmissionNavigationActionsProps
  extends Pick<
    RankSubmissionMetadata,
    'hasCollectionLogData' | 'hasTempleData' | 'hasWikiSyncData'
  > {
  onStatusChange: (status: RankSubmissionStatus) => void;
  playerName: string;
}

export function ViewSubmissionNavigationActions({
  onStatusChange,
  playerName,
  hasCollectionLogData,
  hasTempleData,
  hasWikiSyncData,
}: ViewSubmissionNavigationActionsProps) {
  return (
    <>
      <Box mr="1">
        <Text size="1">
          <Flex asChild justify="end">
            <Text color={hasCollectionLogData ? 'green' : 'red'}>
              Collection Log
              {hasCollectionLogData ? <CheckIcon /> : <Cross2Icon />}
            </Text>
          </Flex>
          <Flex asChild justify="end">
            <Text color={hasTempleData ? 'green' : 'red'}>
              TempleOSRS
              {hasTempleData ? <CheckIcon /> : <Cross2Icon />}
            </Text>
          </Flex>
          <Flex asChild justify="end">
            <Text color={hasWikiSyncData ? 'green' : 'red'}>
              WikiSync
              {hasWikiSyncData ? <CheckIcon /> : <Cross2Icon />}
            </Text>
          </Flex>
        </Text>
      </Box>
      <RejectSubmissionButton
        onRejectSuccess={() => {
          onStatusChange('Rejected');
        }}
      />
      <ApproveSubmissionButton
        onApproveSuccess={() => {
          onStatusChange('Approved');
        }}
        playerName={playerName}
      />
    </>
  );
}

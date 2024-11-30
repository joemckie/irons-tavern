import { RankSubmissionMetadata } from '@/app/schemas/rank-calculator';
import { createContext, PropsWithChildren, useContext, useMemo } from 'react';

interface ModerationProps
  extends Pick<
    RankSubmissionMetadata,
    'hasCollectionLogData' | 'hasTempleData' | 'hasWikiSyncData'
  > {
  isModerator: boolean;
  actionedByUsername: string | null;
}

export const ModerationContext = createContext<ModerationProps>({
  actionedByUsername: '',
  hasCollectionLogData: false,
  hasTempleData: false,
  hasWikiSyncData: false,
  isModerator: false,
});

export function ModerationProvider({
  children,
  isModerator,
  hasCollectionLogData,
  hasTempleData,
  hasWikiSyncData,
  actionedByUsername,
}: PropsWithChildren<ModerationProps>) {
  const value = useMemo<ModerationProps>(
    () => ({
      isModerator,
      hasCollectionLogData,
      hasTempleData,
      hasWikiSyncData,
      actionedByUsername,
    }),
    [
      isModerator,
      hasCollectionLogData,
      hasTempleData,
      hasWikiSyncData,
      actionedByUsername,
    ],
  );

  return (
    <ModerationContext.Provider value={value}>
      {children}
    </ModerationContext.Provider>
  );
}

export function useModeration() {
  const context = useContext(ModerationContext);

  if (!context) {
    throw new Error('useModeration must be used inside ModerationContext');
  }

  return context;
}

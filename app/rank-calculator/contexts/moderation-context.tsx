import { RankSubmissionMetadata } from '@/app/schemas/rank-calculator';
import { createContext, PropsWithChildren, useContext, useMemo } from 'react';

interface ModerationProps
  extends Pick<
    RankSubmissionMetadata,
    'hasCollectionLogData' | 'hasTempleData' | 'hasWikiSyncData'
  > {
  isModerator: boolean;
}

export const ModerationContext = createContext<ModerationProps | undefined>(
  undefined,
);

export function ModerationProvider({
  children,
  isModerator,
  hasCollectionLogData,
  hasTempleData,
  hasWikiSyncData,
}: PropsWithChildren<ModerationProps>) {
  const value = useMemo<ModerationProps>(
    () => ({
      isModerator,
      hasCollectionLogData,
      hasTempleData,
      hasWikiSyncData,
    }),
    [isModerator, hasCollectionLogData, hasTempleData, hasWikiSyncData],
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

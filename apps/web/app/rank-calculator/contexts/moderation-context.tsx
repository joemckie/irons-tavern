import { RankSubmissionMetadata } from '@/app/schemas/rank-calculator';
import { createContext, PropsWithChildren, useContext, useMemo } from 'react';

interface ModerationProps
  extends Pick<
    RankSubmissionMetadata,
    | 'hasTemplePlayerStats'
    | 'hasWikiSyncData'
    | 'hasTempleCollectionLog'
    | 'isTempleCollectionLogOutdated'
  > {
  actionedByUsername: string | null;
  userCanModerateSubmission: boolean;
}

export const ModerationContext = createContext<ModerationProps | undefined>(
  undefined,
);

export function ModerationProvider({
  children,
  hasTemplePlayerStats,
  hasTempleCollectionLog,
  hasWikiSyncData,
  actionedByUsername,
  isTempleCollectionLogOutdated,
  userCanModerateSubmission,
}: PropsWithChildren<ModerationProps>) {
  const value = useMemo<ModerationProps>(
    () => ({
      hasTemplePlayerStats,
      hasTempleCollectionLog,
      hasWikiSyncData,
      actionedByUsername,
      isTempleCollectionLogOutdated,
      userCanModerateSubmission,
    }),
    [
      hasTempleCollectionLog,
      hasTemplePlayerStats,
      hasWikiSyncData,
      actionedByUsername,
      isTempleCollectionLogOutdated,
      userCanModerateSubmission,
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

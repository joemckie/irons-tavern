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
  isModerator: boolean;
  actionedByUsername: string | null;
}

export const ModerationContext = createContext<ModerationProps>({
  actionedByUsername: '',
  hasTemplePlayerStats: false,
  hasTempleCollectionLog: false,
  hasWikiSyncData: false,
  isModerator: false,
  isTempleCollectionLogOutdated: false,
});

export function ModerationProvider({
  children,
  isModerator,
  hasTemplePlayerStats,
  hasTempleCollectionLog,
  hasWikiSyncData,
  actionedByUsername,
  isTempleCollectionLogOutdated,
}: PropsWithChildren<ModerationProps>) {
  const value = useMemo<ModerationProps>(
    () => ({
      isModerator,
      hasTemplePlayerStats,
      hasTempleCollectionLog,
      hasWikiSyncData,
      actionedByUsername,
      isTempleCollectionLogOutdated,
    }),
    [
      isModerator,
      hasTempleCollectionLog,
      hasTemplePlayerStats,
      hasWikiSyncData,
      actionedByUsername,
      isTempleCollectionLogOutdated,
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

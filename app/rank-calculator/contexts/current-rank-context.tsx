import { Rank } from '@/config/enums';
import { createContext, PropsWithChildren, useContext, useMemo } from 'react';

export const CurrentRankContext = createContext<Rank | undefined>(undefined);

export function CurrentRankProvider({
  rank,
  children,
}: PropsWithChildren<{ rank: Rank | undefined }>) {
  const value = useMemo(() => rank, [rank]);

  return (
    <CurrentRankContext.Provider value={value}>
      {children}
    </CurrentRankContext.Provider>
  );
}

export function useCurrentRank() {
  return useContext(CurrentRankContext);
}

import { Rank } from '@/config/enums';
import { createContext, PropsWithChildren, useContext, useMemo } from 'react';

interface CurrentPlayerContextProps {
  rank: Rank | undefined;
  playerName: string;
}

export const CurrentPlayerContext = createContext<CurrentPlayerContextProps>({
  playerName: '',
  rank: undefined,
});

export function CurrentPlayerProvider({
  rank,
  children,
  playerName,
}: PropsWithChildren<CurrentPlayerContextProps>) {
  const value = useMemo(() => ({ rank, playerName }), [rank, playerName]);

  return (
    <CurrentPlayerContext.Provider value={value}>
      {children}
    </CurrentPlayerContext.Provider>
  );
}

export function useCurrentPlayer() {
  return useContext(CurrentPlayerContext);
}

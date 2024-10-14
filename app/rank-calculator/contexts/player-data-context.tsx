import { PlayerData } from '@/types/rank-calculator';
import { createContext, PropsWithChildren, useMemo, useState } from 'react';

interface PlayerDataContextProps {
  playerData: PlayerData | undefined;
  setPlayerData: (data: PlayerData) => void;
}

export const PlayerDataContext = createContext<PlayerDataContextProps>({
  playerData: {
    acquiredItems: [],
  },
  setPlayerData() {},
});

export function PlayerDataProvider({ children }: PropsWithChildren) {
  const [playerData, setPlayerData] = useState<PlayerData>();
  const value = useMemo(() => ({ playerData, setPlayerData }), [playerData]);

  return (
    <PlayerDataContext.Provider value={value}>
      {children}
    </PlayerDataContext.Provider>
  );
}

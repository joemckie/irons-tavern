import { PlayerData } from '@/types/rank-calculator';
import { createContext, PropsWithChildren, useMemo, useState } from 'react';

interface PlayerDataContextProps {
  playerData: PlayerData | undefined;
  setPlayerData: (data: PlayerData) => void;
}

export const PlayerDataContext = createContext<PlayerDataContextProps>({
  playerData: {
    achievementDiaries: {
      'Kourend & Kebos': null,
      'Lumbridge & Draynor': null,
      'Western Provinces': null,
      Ardougne: null,
      Desert: null,
      Falador: null,
      Fremennik: null,
      Kandarin: null,
      Karamja: null,
      Morytania: null,
      Varrock: null,
      Wilderness: null,
    },
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

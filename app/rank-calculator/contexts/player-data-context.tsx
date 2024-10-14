import { PlayerData } from '@/types/rank-calculator';
import {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useFormContext } from 'react-hook-form';
import { itemsResponseFixture } from '@/fixtures/items-response.fixture';
import { keyBy } from 'lodash';
import { isItemAcquired } from '../utils/is-item-acquired';
import { stripEntityName } from '../utils/strip-entity-name';

interface PlayerDataContextProps {
  playerData: PlayerData | undefined;
  setPlayerData: (data: PlayerData) => void;
}

export const PlayerDataContext = createContext<PlayerDataContextProps>({
  playerData: {
    collectionLogItems: {},
  },
  setPlayerData() {},
});

export function PlayerDataProvider({ children }: PropsWithChildren) {
  const [playerData, setPlayerData] = useState<PlayerData>();
  const value = useMemo(() => ({ playerData, setPlayerData }), [playerData]);
  const { setValue } = useFormContext();
  const allItems = keyBy(
    Object.values(itemsResponseFixture).flatMap(({ items }) => items),
    'name',
  );

  useEffect(() => {
    if (playerData) {
      Object.entries(allItems).forEach(([, item]) => {
        if (isItemAcquired(item, playerData)) {
          setValue(`items.${stripEntityName(item.name)}`, true);
        }
      });
    }
  }, [playerData, setValue, allItems]);

  return (
    <PlayerDataContext.Provider value={value}>
      {children}
    </PlayerDataContext.Provider>
  );
}

import type { ItemCategory } from '@/app/schemas/items';
import { createContext, useContext } from 'react';

type ItemListContextType = [string, ItemCategory][];

const ItemListContext = createContext<ItemListContextType | undefined>(
  undefined,
);

export function ItemListProvider({
  children,
  itemList,
}: {
  children: React.ReactNode;
  itemList: ItemListContextType;
}) {
  return (
    <ItemListContext.Provider value={itemList}>
      {children}
    </ItemListContext.Provider>
  );
}

export function useItemList() {
  const context = useContext(ItemListContext);

  if (!context) {
    throw new Error('useItemList must be used within an ItemListProvider');
  }

  return context;
}

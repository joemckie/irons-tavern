import { useCallback, useRef } from 'react';
import { VariableSizeList } from 'react-window';

export const useDynamicItemSize = () => {
  const listRef = useRef<VariableSizeList>(null);
  const sizeMap = useRef<{ [key: number]: number }>({});

  const setSize = useCallback((index: number, size: number) => {
    sizeMap.current = {
      ...sizeMap.current,
      [index]: size,
    };

    listRef.current?.resetAfterIndex(index);
  }, []);

  const getSize = (index: number) => sizeMap.current[index] || 50;

  const resetAfterIndex = (index: number, shouldForceUpdate = true) => {
    listRef.current?.resetAfterIndex(index, shouldForceUpdate);
  };

  return {
    listRef,
    setSize,
    getSize,
    resetAfterIndex,
  };
};

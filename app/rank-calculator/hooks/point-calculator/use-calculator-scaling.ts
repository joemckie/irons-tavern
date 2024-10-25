import { FormData } from '@/types/rank-calculator';
import { useWatch } from 'react-hook-form';

export function useCalculatorScaling() {
  const joinDate = useWatch<FormData, 'joinDate'>({ name: 'joinDate' });

  console.log({ joinDate });

  return 100;
}

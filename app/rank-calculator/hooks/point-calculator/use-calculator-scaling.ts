import { FormData } from '@/types/rank-calculator';
import { useWatch } from 'react-hook-form';
import { calculateScaling } from '../../utils/calculate-scaling';

export function useCalculatorScaling() {
  const joinDate = useWatch<FormData, 'joinDate'>({ name: 'joinDate' });

  return calculateScaling(joinDate);
}

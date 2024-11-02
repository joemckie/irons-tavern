import { ApiResponse } from '@/types/api';
import { FormData } from '@/types/rank-calculator';
import { useMutation } from '@tanstack/react-query';
import { submitRankCalculator } from '../actions/submit-rank-calculator';

export function useSubmitForm() {
  return useMutation<ApiResponse, Error, FormData>({
    mutationKey: ['submitForm'],
    async mutationFn(variables) {
      return submitRankCalculator(variables);
    },
  });
}

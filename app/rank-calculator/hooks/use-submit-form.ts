import { constants } from '@/config/constants';
import { ApiResponse } from '@/types/api';
import { FormData } from '@/types/rank-calculator';
import { useMutation } from '@tanstack/react-query';

export function useSubmitForm() {
  return useMutation<ApiResponse, Error, FormData>({
    mutationKey: ['submitForm'],
    async mutationFn(formData) {
      const response = await fetch(`${constants.publicUrl}/api/submit-form`, {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      return response.json();
    },
  });
}

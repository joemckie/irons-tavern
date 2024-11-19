import { DEFAULT_SERVER_ERROR_MESSAGE } from 'next-safe-action';
import { toast, ToastPromiseParams } from 'react-toastify';

export function actionToastMessage<T>(
  promise: Promise<T>,
  params: Omit<ToastPromiseParams<T>, 'error' | 'success'> &
    Required<Pick<ToastPromiseParams<T>, 'success'>>,
) {
  toast.promise(promise, {
    pending: params.pending ?? 'Please wait...',
    success: params.success,
    error: {
      render({ data }) {
        if (data instanceof Error) {
          return data.message;
        }

        return DEFAULT_SERVER_ERROR_MESSAGE;
      },
    },
  });
}

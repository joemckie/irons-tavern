import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  SafeActionResult,
} from 'next-safe-action';
import { toast, ToastPromiseParams } from 'react-toastify';
import { Schema } from 'zod';

export async function handleToastUpdates<
  ServerError extends string,
  S extends Schema,
  BAS extends readonly Schema[],
  CVE,
  CBAVE,
  Data,
>(
  actionFn: Promise<
    SafeActionResult<ServerError, S, BAS, CVE, CBAVE, Data> | undefined
  >,
  params: {
    success: ToastPromiseParams<Data>['success'];
    pending?: string;
  },
) {
  const toastId = toast.loading(params.pending ?? 'Please wait...');

  try {
    const result = await actionFn;

    if (result?.serverError) {
      return toast.update(toastId, {
        render: result.serverError,
        type: 'error',
        isLoading: false,
        autoClose: null,
      });
    }

    if (result?.validationErrors || result?.bindArgsValidationErrors) {
      return toast.update(toastId, {
        render: 'Validation error',
        type: 'error',
        isLoading: false,
        autoClose: null,
      });
    }

    return toast.update(toastId, {
      ...(typeof params.success === 'object' ? params.success : {}),
      ...(typeof params.success === 'string' ? { render: params.success } : {}),
      type: 'success',
      isLoading: false,
      autoClose: null,
    });
  } catch {
    return toast.update(toastId, {
      render: DEFAULT_SERVER_ERROR_MESSAGE,
      type: 'error',
      isLoading: false,
      autoClose: null,
    });
  }
}

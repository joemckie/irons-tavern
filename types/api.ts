type ApiSuccess<T extends object | void> = {
  error: null;
  success: true;
} & (T extends void
  ? void
  : {
      data: T;
    });

interface ApiError {
  error: unknown;
  success: false;
}

export type ApiResponse<T extends object | void = void> =
  | ApiSuccess<T>
  | ApiError;

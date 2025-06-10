export interface ApiSuccess<T extends object | void> {
  error: null;
  success: true;
  data: T extends void ? null : T;
}

export interface ApiError {
  error: unknown;
  success: false;
}

export type ApiResponse<T extends object | void = void> =
  | ApiSuccess<T>
  | ApiError;

export async function register() {
  if (
    process.env.NODE_ENV !== 'production' &&
    process.env.NEXT_RUNTIME === 'nodejs' &&
    process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'
  ) {
    await import('./mocks');
  }
}

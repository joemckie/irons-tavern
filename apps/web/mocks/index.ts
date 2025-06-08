async function initMocks() {
  if (typeof window === 'undefined') {
    const { server } = await import('./server');
    server.listen({
      onUnhandledRequest: 'error',
    });
  } else {
    const { worker } = await import('./browser');
    await worker.start();
  }
}

await initMocks();

export {};

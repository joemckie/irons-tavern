import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    experimentalRunAllSpecs: true,
    baseUrl: 'http://localhost:3000',
  },
});

import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [svelte({ hot: !process.env.VITEST })],
  resolve: {
    alias: {
      '@aps/contracts': path.resolve(__dirname, './packages/contracts/src/index.ts'),
      '@aps/ui': path.resolve(__dirname, './packages/ui/src/lib/index.ts'),
      '@aps/mock-data': path.resolve(__dirname, './packages/mock-data/src/index.ts'),
      '$app/navigation': path.resolve(__dirname, './tests/mocks/app-navigation.ts'),
      '$app/environment': path.resolve(__dirname, './tests/mocks/app-environment.ts')
    }
  },
  test: {
    include: ['tests/unit/**/*.{test,spec}.{js,ts}', 'tests/integration/**/*.{test,spec}.{js,ts}'],
    setupFiles: ['tests/vitest-setup.ts'],
    environment: 'node',
    environmentMatchGlobs: [['tests/integration/ui/**', 'happy-dom']],
    globals: true
  }
});

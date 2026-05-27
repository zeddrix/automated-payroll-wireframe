import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { workspacePackageResolve } from './vite-plugin-workspace-resolve';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const packagesRoot = path.resolve(repoRoot, 'packages');

export default defineConfig({
  plugins: [workspacePackageResolve(packagesRoot), tailwindcss(), sveltekit()],
  server: {
    port: 4570,
    strictPort: true
  },
  preview: {
    port: 4570,
    strictPort: true
  },
  ssr: {
    noExternal: ['@aps/ui', '@aps/contracts', '@aps/mock-data']
  }
});

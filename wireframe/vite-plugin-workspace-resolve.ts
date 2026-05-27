import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';

/**
 * Tailwind's Node ESM loader resolves workspace package imports before Vite can
 * bundle them. Map relative imports inside packages/* to their .ts sources.
 */
export function workspacePackageResolve(packagesRoot: string): Plugin {
  return {
    name: 'workspace-package-resolve',
    enforce: 'pre',
    resolveId(source, importer) {
      if (!importer?.startsWith(packagesRoot)) return null;
      if (!source.startsWith('.')) return null;

      const withoutJs = source.endsWith('.js') ? source.slice(0, -3) : source;
      const base = path.resolve(path.dirname(importer), withoutJs);

      const candidates = [
        `${base}.ts`,
        `${base}.tsx`,
        `${base}.js`,
        path.join(base, 'index.ts'),
        path.join(base, 'index.js')
      ];

      for (const candidate of candidates) {
        if (fs.existsSync(candidate)) return candidate;
      }

      return null;
    }
  };
}

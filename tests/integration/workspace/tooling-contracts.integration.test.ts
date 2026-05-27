import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = resolve(import.meta.dirname, '../../..');

describe('workspace tooling contracts', () => {
  it('root package.json exposes quality and test scripts', () => {
    const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8')) as {
      scripts: Record<string, string>;
    };
    expect(pkg.scripts.quality).toBeDefined();
    expect(pkg.scripts['quality:fast']).toBeDefined();
    expect(pkg.scripts['test:unit']).toBeDefined();
    expect(pkg.scripts['test:e2e']).toBeDefined();
    expect(pkg.scripts['test:e2e:one']).toBeDefined();
  });

  it('governance docs exist', () => {
    const files = [
      'CLAUDE.md',
      'docs/e2e-testing-rules.md',
      'docs/unit-testing-rules.md',
      'docs/integration-testing-rules.md',
      'docs/architecture.md'
    ];
    for (const file of files) {
      expect(() => readFileSync(resolve(root, file), 'utf8')).not.toThrow();
    }
  });
});

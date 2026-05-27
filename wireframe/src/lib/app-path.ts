import { base } from '$app/paths';

export function joinAppPath(routePath: string, pathBase: string = base): string {
  if (!routePath.startsWith('/')) {
    throw new Error(`Route path must start with /: ${routePath}`);
  }
  return `${pathBase}${routePath}`;
}

export function appPath(routePath: string): string {
  return joinAppPath(routePath);
}

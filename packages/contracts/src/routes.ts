import type { ModuleId, TabId } from './modules.js';
import { getModule, isModuleId, isTabIdForModule, MODULES } from './modules.js';

export interface ModuleTabPrerenderEntry {
  module: ModuleId;
  tab: TabId;
}

export function listModuleTabPrerenderEntries(): ModuleTabPrerenderEntry[] {
  return MODULES.flatMap((mod) =>
    mod.tabs.map((tab) => ({
      module: mod.id,
      tab: tab.id
    }))
  );
}

export function moduleTabPath(moduleId: ModuleId, tabId: TabId): string {
  return `/${moduleId}/${tabId}`;
}

export function defaultModuleTabPath(moduleId: ModuleId = 'auth'): string {
  const mod = getModule(moduleId);
  return moduleTabPath(moduleId, mod.defaultTab);
}

export function parseModuleTabParams(
  moduleParam: string | undefined,
  tabParam: string | undefined
): { moduleId: ModuleId; tabId: TabId } | null {
  if (!moduleParam || !tabParam || !isModuleId(moduleParam)) {
    return null;
  }
  if (!isTabIdForModule(moduleParam, tabParam)) {
    return null;
  }
  return { moduleId: moduleParam, tabId: tabParam };
}

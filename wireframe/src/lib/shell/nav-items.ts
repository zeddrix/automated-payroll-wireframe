import { MODULES, moduleTabPath, type ModuleId, type TabId } from '@aps/contracts';

export function buildModuleNavItems() {
  return MODULES.map((mod) => ({
    id: mod.id,
    label: mod.label,
    href: moduleTabPath(mod.id, mod.defaultTab)
  }));
}

export function buildTabNavItems(moduleId: ModuleId, activeTabId: TabId) {
  const mod = MODULES.find((m) => m.id === moduleId);
  if (!mod) return [];
  return mod.tabs.map((tab) => ({
    id: tab.id,
    label: tab.label,
    href: moduleTabPath(moduleId, tab.id),
    active: tab.id === activeTabId
  }));
}

<script lang="ts">
  import {
    BottomNav,
    SidebarRail,
    ModuleTabs,
    DevicePreviewTabbar,
    WireframeSection
  } from '@aps/ui';
  import type { DevicePreviewMode } from '@aps/ui';
  import { selectors } from '@aps/contracts';
  import { buildModuleNavItems, buildTabNavItems } from '../../../shell/nav-items';

  const moduleNavItems = buildModuleNavItems();
  const authTabs = buildTabNavItems('auth', 'login');

  let deviceMode = $state<DevicePreviewMode>('mobile');

  function handleSelect(next: DevicePreviewMode) {
    deviceMode = next;
  }
</script>

<div data-testid={selectors.uiKitNavigationSection}>
  <WireframeSection title="Sidebar rail & bottom nav">
    <div class="nav-grid ui-kit-nav-grid">
      <div class="nav-grid__cell">
        <div class="specimen__label">SidebarRail (static)</div>
        <div class="specimen specimen--sidebar">
          <SidebarRail items={moduleNavItems} activeId="ui-kit" />
        </div>
      </div>
      <div class="nav-grid__cell">
        <div class="specimen__label">BottomNav (static)</div>
        <div class="specimen specimen--bottom">
          <BottomNav items={moduleNavItems} activeId="ui-kit" />
        </div>
      </div>
    </div>
  </WireframeSection>

  <WireframeSection title="ModuleTabs">
    <div class="tabs-stack">
      <div class="specimen__label">Auth module tabs</div>
      <ModuleTabs
        tabs={authTabs.map((t) => ({ id: t.id, label: t.label, href: t.href }))}
        activeTabId="login"
      />
    </div>
  </WireframeSection>

  <WireframeSection title="Device preview tabbar">
    <DevicePreviewTabbar
      activeMode={deviceMode}
      onSelect={handleSelect}
      testId="ui-kit-device-preview-tabbar"
      mobileTestId="ui-kit-device-preview-mobile"
      tabletTestId="ui-kit-device-preview-tablet"
      desktopTestId="ui-kit-device-preview-desktop"
      systemTestId="ui-kit-device-preview-system"
    />
  </WireframeSection>

  <WireframeSection title="Shell header (static mock)">
    <div class="shell-header">
      <div class="shell-header__brand">
        <div class="shell-header__title">Payroll Wireframe</div>
        <div class="shell-header__phase">Proposal / UI Kit</div>
      </div>
      <div class="shell-header__status">
        <span>Signed out</span>
        <button type="button" class="shell-header__btn">Ghost action</button>
      </div>
    </div>
  </WireframeSection>
</div>

<style>
  .nav-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  .specimen__label {
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #71717a;
    margin-bottom: 0.375rem;
  }
  .specimen {
    border: 2px dashed #d4d4d8;
    border-radius: 8px;
    background: #fff;
    overflow: hidden;
  }
  .specimen--sidebar {
    max-width: 16rem;
  }
  .specimen--bottom {
    max-width: 28rem;
  }
  .tabs-stack {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  .shell-header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem 1rem;
    padding: 0.75rem 1rem;
    border: 2px solid #d4d4d8;
    border-radius: 10px;
    background: #fff;
  }
  .shell-header__title {
    font-weight: 800;
    color: #18181b;
  }
  .shell-header__phase {
    font-size: 0.75rem;
    color: #71717a;
  }
  .shell-header__status {
    display: inline-flex;
    gap: 0.5rem;
    align-items: center;
    font-size: 0.875rem;
    color: #52525b;
  }
  .shell-header__btn {
    padding: 0.5rem 0.75rem;
    font-size: 0.8125rem;
    font-weight: 700;
    border-radius: 999px;
    border: 2px solid #d4d4d8;
    background: transparent;
    color: #18181b;
  }
</style>

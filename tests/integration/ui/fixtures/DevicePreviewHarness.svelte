<script lang="ts">
  import { DevicePreviewFrame, type DevicePreviewMode } from '@aps/ui';
  import { selectors } from '@aps/contracts';

  interface Props {
    mode?: DevicePreviewMode;
  }

  let { mode = 'mobile' }: Props = $props();
</script>

<DevicePreviewFrame
  {mode}
  testId={selectors.devicePreviewFrame}
  screenTestId={selectors.devicePreviewFrameScreen}
>
  <p data-testid="device-preview-harness-child">Preview content</p>
</DevicePreviewFrame>

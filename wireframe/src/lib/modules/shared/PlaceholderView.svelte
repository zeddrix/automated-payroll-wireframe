<script lang="ts">
  import { EmptyState } from '@aps/ui';
  import { selectors } from '@aps/contracts';

  interface Props {
    title?: string;
    testId?: string;
  }

  let { title = 'Wireframe placeholder', testId = selectors.wireframePlaceholder }: Props =
    $props();
</script>

<EmptyState
  {title}
  description="This tab is routed and ready. Add a view when requirements and external wireframes are approved."
  {testId}
/>

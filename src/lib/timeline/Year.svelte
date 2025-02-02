<script lang="ts">
    import type { YearData } from "../shared/types";
  import Month from "./Month.svelte";
    import YearHeader from "./YearHeader.svelte";

  let { yearData }: { yearData: YearData } = $props();
  let yearHeader = yearData.yearHeader;
</script>

<YearHeader {yearHeader} />
{#each yearData.monthData as month}
  <Month {month} />
{/each}

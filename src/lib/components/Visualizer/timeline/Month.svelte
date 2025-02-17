<script lang="ts">
  import { slide } from "svelte/transition";
  import { options } from "../../../shared/shared.svelte";
  import type { MonthData } from "../../../shared/types";
  import Table from "../Table.svelte";

  let { month }: { month: MonthData } = $props();
  let tableData: string[][] = [];
  for (const milestone of month.milestones) {
    tableData.push([Math.round(milestone.neededNetWorth).toLocaleString() + " " + options.currency, milestone.message]);
  }
  let noMilestones = tableData.length <= 0;
  let coasting = month.coasting;
  let hideMilestones = $state(true);
  let showAllMilestones = $derived(options.showAllMilestones);
  let screenWidth: number = $state(0);
  // Scale font size with screen size so that the data in the list will always fit. Max font size is 1rem. 500 is a magical constant, but seems to look nice.
  let fontSize: string = $derived((screenWidth > 1280 ? 1 : Math.min(1, screenWidth / 400)) + "rem");
</script>

<svelte:window bind:outerWidth={screenWidth} />
<div class={["month-wrapper", { coasting }]} style="--font-size: {fontSize}" onclick={() => (hideMilestones = !hideMilestones)}>
  <div class="month-header-wrapper">
    <div class="month-column">
      {month.monthName}
    </div>
    <div class="month-column estimated-net-worth">
      {Math.round(month.estimatedNetWorth).toLocaleString()}<br />
      {options.currency}
    </div>
    <div class="month-column monthly-growth">
      +{Math.round(month.monthlyGrowth).toLocaleString()}<br />
      {options.currency}
    </div>
    <div class="month-column goal-percentage">
      {#if month.percentageOfReachingThis}
        {Math.floor(month.percentageOfReachingThis)}%<br />
        🎯
      {/if}
    </div>
    <div class="month-column goal-percentage">
      {#if month.percentageTowardsCoastFire}
        {Math.floor(month.percentageTowardsCoastFire)}%<br />
        🏄
      {/if}
    </div>
    <div class="month-column goal-percentage">
      {#if month.percentageTowardsFire}
        {Math.floor(month.percentageTowardsFire)}%<br />
        🔥
      {/if}
    </div>
    <div class="month-column months-until">
      {#if screenWidth >= 1280}
        {month.timeUntilStringLong}
      {:else}
        {month.timeUntilStringShort}
      {/if}
    </div>
    <div class={["milestone-indicator", { noMilestones }]}></div>
  </div>
  <div class="milestones">
    {#if month.milestones.length > 0 && (showAllMilestones || !hideMilestones)}
      <div transition:slide>
        <Table tableHeaders={["Needed net worth", "Milestones"]} {tableData} />
      </div>
    {/if}
  </div>
</div>

<style>
  .month-wrapper {
    display: flex;
    flex-direction: column;
    font-size: var(--font-size);
  }

  .month-wrapper.coasting {
    background: rgba(0, 255, 0, 10%);
  }

  .month-header-wrapper {
    display: flex;
    flex-direction: row;
    border: 1px solid white;
    padding: 0.7em;
    position: relative;
    justify-content: space-between;
    gap: 0.5rem;
  }

  .months-until {
    white-space: pre-line;
  }

  .noMilestones {
    display: none;
  }

  .month-column {
    align-self: center;
    flex: 1 1 0px;
  }

  .milestone-indicator {
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: gold;
    border-radius: 5px;
    top: 5px;
    right: 5px;
  }
</style>

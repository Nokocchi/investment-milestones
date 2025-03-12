<script lang="ts">
  import { slide } from "svelte/transition";
  import { options } from "../../../shared/shared.svelte";
  import type { MonthData } from "../../../shared/types";
  import Table from "../Table.svelte";
  import { monthNames } from "../../../shared/constants";

  let { month }: { month: MonthData } = $props();
  let tableData: string[][] = [];
  for (const milestone of month.milestones) {
    tableData.push([Math.round(milestone.neededNetWorth).toLocaleString() + " " + options.currency, milestone.message]);
  }
  let noMilestones = tableData.length <= 0;
  let notCoasting = !month.coasting;
  let showTheseMilestones = $state(false);
  let showAllMilestones = $derived(options.showAllMilestones);
  let screenWidth: number = $state(0);
  // Scale font size with screen size so that the data in the list will always fit. Max font size is 1rem. 500 is a magical constant, but seems to look nice.
  let fontSize: string = $derived((screenWidth > 1280 ? 1 : Math.min(1, screenWidth / 400)) + "rem");
</script>

<svelte:window bind:outerWidth={screenWidth} />
<div
  class={[
    "month-wrapper",
    { even: month.calendarMonth % 2 == 0 },
    { last: month.calendarMonth == 11 },
    { hasMilestones: month.milestones.length > 0},
    { showingMilestonesForAnyReason: month.milestones.length > 0 && (showTheseMilestones || showAllMilestones)},
    { showingMilestonesDueToClick: month.milestones.length > 0 && showTheseMilestones }
  ]}
  style="--font-size: {fontSize}"
  onclick={() => (showTheseMilestones = month.milestones.length > 0 && !showTheseMilestones)}
>
  <div class="month-header-wrapper">
    <div class={["coasting-indicator", { notCoasting }]}>🏄</div>
    <div class="month-column">
      {monthNames[month.calendarMonth]}
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
      {#if month.percentageOfReachingThis != null}
        {Math.floor(month.percentageOfReachingThis)}%<br />
        🎯
      {/if}
    </div>
    <div class="month-column goal-percentage">
      {#if month.percentageTowardsCoastFire != null}
        {Math.floor(month.percentageTowardsCoastFire)}%<br />
        🏄
      {/if}
    </div>
    <div class="month-column goal-percentage">
      {#if month.percentageTowardsFire != null}
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
    {#if month.milestones.length > 0 && (showAllMilestones || showTheseMilestones)}
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
    background-color: unset;
  }

  .month-wrapper.hasMilestones {
    cursor: pointer;
  }

  .last .month-header-wrapper,
  .showingMilestonesForAnyReason .month-header-wrapper {
    border-bottom: 1px solid var(--border-color);
  }

  .last {
    border-bottom-right-radius: 1rem;
    border-bottom-left-radius: 1rem;
    margin-bottom: 1.5rem;
  }

  .last .month-header-wrapper {
    border-bottom-right-radius: 1rem;
    border-bottom-left-radius: 1rem;
  }

  .even .month-header-wrapper {
    background-color: var(--timeline-even-bg-color);
  }

  .showingMilestonesDueToClick .month-header-wrapper {
    border-width: 2px;
  }

  .coasting-indicator {
    position: absolute;
    top: 5px;
    left: 5px;
  }

  .notCoasting {
    display: none;
  }

  .month-header-wrapper {
    display: flex;
    flex-direction: row;
    border-left: 1px solid var(--border-color);
    border-right: 1px solid var(--border-color);
    border-top: 1px solid var(--border-color);
    padding: 0.7em;
    position: relative;
    justify-content: space-between;
    gap: 0.5rem;
    background-color: var(--timeline-bg-color);
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
    background-color: orange;
    border-radius: 5px;
    top: 5px;
    right: 5px;
  }
</style>

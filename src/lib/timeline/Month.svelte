<script lang="ts">
  import { ReachedState } from "../shared/constants";
  import Table from "../components/Table.svelte";
  import { options } from "../shared/shared.svelte";
  import { slide } from "svelte/transition";
    import type { MonthData } from "../shared/types";

  let { month }: { month: MonthData } = $props();
  let tableData: string[][] = [];
  let reachedState = month.reachedState;
  for (const milestone of month.milestones) {
    tableData.push([Math.round(milestone.neededNetWorth).toLocaleString() + " " + options.currency, milestone.message]);
  }
  let noMilestones = tableData.length <= 0;
  let coasting = month.coasting;
  let hideMilestones = $state(true);
  let showAllMilestones = $derived(options.showAllMilestones);
</script>

<div class={["month-wrapper", ReachedState[reachedState], {coasting}]} onclick={() => (hideMilestones = !hideMilestones)}>
  <div class="month-header-wrapper">
    <div class="left month-column">
      {month.monthName}
    </div>
    <div class="right">
      <div class="month-column estimated-net-worth row-padding">
        {Math.round(month.estimatedNetWorth).toLocaleString()}<br />
        {options.currency}
      </div>
      <div class="month-column monthly-growth row-padding">
        +{Math.round(month.monthlyGrowth).toLocaleString()}<br />
        {options.currency}
      </div>
      <div class="month-column goal-percentage row-padding">
        {#if month.percentageOfReachingThis}
          {Math.round(month.percentageOfReachingThis)}%
        {/if}
      </div>
      <div class="month-column months-until row-padding">
        {month.yearsAndMonthsUntil}
      </div>
      <div class={["milestone-indicator", { noMilestones }]}></div>
    </div>
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
  }

  .month-wrapper.coasting {
    background: green;
  }

  .month-wrapper.REACHED {
  }

  .month-wrapper.HERE {
  }

  .month-header-wrapper {
    display: flex;
    flex-direction: row;
    border: 1px solid white;
  }

  .left {
    flex: 1 1 20%;
    display: flex;
    flex-direction: row;
  }

  .right {
    flex: 1 1 80%;
    display: flex;
    flex-direction: row;
    position: relative;
    justify-content: space-between;
  }

  .estimated-net-worth {
    flex: 1 1 25%;
  }

  .goal-percentage {
    flex: 1 1 10%;
  }

  .months-until {
    flex: 1 1 30%;
    white-space: wrap;
  }

  .monthly-growth {
    flex: 1 1 20%;
  }

  .noMilestones {
    display: none;
  }

  .hideMilestones {
    display: none;
  }

  .month-column {
    align-self: center;
  }

  .row-padding {
    padding-bottom: 1rem;
    padding-top: 1rem;
  }

  .milestone-indicator {
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: green;
    top: 10px;
    right: 10px;
  }
</style>

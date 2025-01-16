<script lang="ts">
  import type { MonthData, ReachedState } from "../shared/constants";
  import Table from "../components/Table.svelte";
  import TimelineSegment from "./TimelineSegment.svelte";
  import { options } from "../shared/shared.svelte";

  let { month }: { month: MonthData } = $props();
  let tableData: string[][] = [];
  for (const milestone of month.milestones) {
    tableData.push([Math.round(milestone.neededNetWorth).toLocaleString() + " " + options.currency, milestone.message]);
  }
  let noMilestones = tableData.length <= 0;
  let hideMilestones = $state(true);
</script>

<div class="month-wrapper" onclick={() => hideMilestones = !hideMilestones}>
  <div class="month-header-wrapper">
    <div class="month-column month-name">
      {month.monthName}
    </div>
    <div class="timeline-segment">
      <TimelineSegment reachedState={month.reachedState} />
    </div>
    <div class="month-column estimated-net-worth row-padding">
      {Math.round(month.estimatedNetWorth).toLocaleString()}
      {options.currency}
    </div>
    <div class="month-column monthly-growth row-padding">
      +{Math.round(month.monthlyGrowth).toLocaleString()}
      {options.currency}
    </div>
    <div class="month-column goal-percentage row-padding">
      {Math.round(month.percentageOfReachingThis)}%
    </div>
    <div class="month-column months-until row-padding">
      {month.yearsAndMonthsUntil}
    </div>
    <div class={["milestone-indicator", { noMilestones }]}></div>
  </div>
  <div class={["milestones", { hideMilestones }]}>
    {#if month.milestones.length > 0}
      <Table tableHeaders={["Needed net worth", "Milestones"]} {tableData} />
    {/if}
  </div>
</div>

<style>
  .month-wrapper {
    display: flex;
    flex-direction: column;
  }

  .month-header-wrapper {
    display: flex;
    flex-direction: row;
    border: 1px solid white;
    position: relative;
    justify-content: space-between;
  }

  .month-name {
    flex: 1 1 10%;
  }

  .timeline-segment {
    flex: 1 1 5%;
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

  .milestones {

  }

  .hideMilestones {
    display: none;
  }

  .month-column {
    align-self: center;
  }

  .row-padding {
    /*
    padding-bottom: 1rem;
    padding-top: 1rem;
    */
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

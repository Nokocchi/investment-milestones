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
</script>

<div class="month-wrapper">
  <div class="month-column month-name">
    {month.monthName}
  </div>
  <div class="timeline-segment">
    <TimelineSegment reachedState={month.reachedState} />
  </div>
  <div class="month-column month-currency row-padding">
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
  <div class="milestones">
    {#if month.milestones.length > 0}
      <Table tableHeaders={["Needed net worth", "Milestones"]} {tableData} />
    {/if}
  </div>
</div>

<style>
  .month-wrapper {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    border: 1px solid white;
  }

  .month-name {
    flex-basis: 6rem;
    font-size: 2rem;
  }
  
  .milestones {
    flex-grow: 1;
  }

  .month-column {
    align-self: center;
  }

  .row-padding {
    padding-bottom: 1rem;
    padding-top: 1rem;
  }

  .goal-percentage {
    flex-basis: 5rem;
    font-size: 1.2rem;
  }

  .months-until {
    flex-basis: 11rem;
    font-size: 1.2rem;
  }

  .monthly-growth {
    flex-basis: 8rem;
    font-size: 1.2rem;
  }

  .month-currency {
    flex-basis: 10rem;
    font-size: 1.5rem;
  }


</style>

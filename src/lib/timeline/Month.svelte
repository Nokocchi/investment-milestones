<script lang="ts">
  import type { MonthData, ReachedState } from "../constants";
  import Table from "../Table.svelte";
  import TimelineSegment from "./TimelineSegment.svelte";

  let { month }: { month: MonthData } = $props();
  let tableData: string[][] = [];
  for (const milestone of month.milestones) {
    tableData.push([Math.round(milestone.neededNetWorth).toLocaleString() + " SEK", milestone.message]);
  }
</script>

<div class="month-wrapper">
  <div class="month-name">
    <h2>{month.monthName}</h2>
  </div>
  <TimelineSegment reachedState={month.reachedState} />
  <div class="estimated-net-worth">
    <h4>{Math.round(month.estimatedNetWorth).toLocaleString()} SEK</h4>
  </div>
  {#if month.milestones.length > 0}
    <Table tableHeaders={["Needed net worth", "Milestones"]} {tableData} />
  {/if}
</div>

<style>
  .month-wrapper {
    display: flex;
    flex-direction: row;
  }

  .month-name {
    width: 150px;
  }

  .estimated-net-worth {
    margin-left: 25px;
    width: 150px;
  }
</style>

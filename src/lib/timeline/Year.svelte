<script lang="ts">
  import { CURRENT_YEAR, type YearHeader } from "../constants";
    import TimelineSegment from "./TimelineSegment.svelte";

  let { yearHeader }: { yearHeader: YearHeader } = $props();
  let yearsFromNow: number = yearHeader.year - CURRENT_YEAR;
  let yearText: string = yearsFromNow < 0 ? "years ago" : "years from now";

</script>

<div class="year-wrapper">
  <div class="month-name">
    <h2>{yearHeader.year}</h2>
  </div>
  <TimelineSegment reachedState={yearHeader.reachedState} />
  <div class="estimated-net-worth">
    <h4>Age: {yearHeader.age}</h4>
  </div>
  <div class="estimated-net-worth">
    <h4>{yearsFromNow == 0 ? "This year" : Math.abs(yearsFromNow) + " " + yearText}</h4>
  </div>
</div>

<style>
  .year-wrapper {
    display: flex;
    flex-direction: row;
    border: 2px solid white;
  }

  .month-name {
    width: 150px;
  }

  .estimated-net-worth {
    margin-left: 25px;
    width: 150px;
  }
</style>

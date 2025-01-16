<script lang="ts">
    import { CURRENT_YEAR, type YearHeader } from "../shared/constants";
    import TimelineSegment from "./TimelineSegment.svelte";

    let { yearHeader }: { yearHeader: YearHeader } = $props();
    let yearsFromNow: number = yearHeader.year - CURRENT_YEAR;
    let yearText: string = yearsFromNow < 0 ? "years ago" : "years from now";
</script>

<div class="year-wrapper">
    <div class="left header-column">
        <div class="year row-padding">
            {yearHeader.year}
        </div>
        <div class="timeline-segment">
            <TimelineSegment reachedState={yearHeader.reachedState} />
        </div>
    </div>
    <div class="right">
        <div class="estimated-age header-column">
            Age: {yearHeader.age}
        </div>
        <div class="estimated-year header-column">
            {yearsFromNow == 0 ? "This year" : Math.abs(yearsFromNow) + " " + yearText}
        </div>
    </div>
</div>

<style>
    .year-wrapper {
        display: flex;
        flex-direction: row;
        border: 1px solid blue;
        box-sizing: border-box;
    }

    .left {
        display: flex;
        flex-direction: row;
        flex: 1 1 20%;
    }

    .right {
        display: flex;
        flex-direction: row;
        flex: 1 1 80%;
    }

    .year {
        flex: 1 1 80%;
    }

    .timeline-segment {
        flex: 1 1 20%;
    }

    .estimated-age {
        flex: 1 1 45%;
    }

    .estimated-year {
        flex: 1 1 40%;
    }

    .header-column {
        align-self: center;
    }

    .row-padding {
    padding-bottom: 1rem;
    padding-top: 1rem;
  }
</style>

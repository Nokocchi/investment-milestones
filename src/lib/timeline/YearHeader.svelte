<script lang="ts">
    import { CURRENT_YEAR, type YearHeader } from "../shared/constants";
    import TimelineSegment from "./TimelineSegment.svelte";

    let { yearHeader }: { yearHeader: YearHeader } = $props();
    let yearsFromNow: number = yearHeader.year - CURRENT_YEAR;
    let yearText: string = yearsFromNow < 0 ? "years ago" : "years from now";
</script>

<div class="year-wrapper">
    <div class="year header-column row-padding">
        {yearHeader.year}
    </div>
       
    <div class="timeline-segment">
        <TimelineSegment reachedState={yearHeader.reachedState} />
    </div>
    <div class="estimated-age header-column row-padding">
        Age: {yearHeader.age}
    </div>
    <div class="estimated-year header-column row-padding">
        {yearsFromNow == 0 ? "This year" : Math.abs(yearsFromNow) + " " + yearText}
    </div>
</div>

<style>
    .year-wrapper {
        display: flex;
        flex-direction: row;
        border: 1px solid blue;
        box-sizing: border-box;
    }

    .year {
        flex: 1 1 10%;
    }

    .timeline-segment {
        flex: 1 1 5%;
    }

    .estimated-age {
        flex: 1 1 45%;
    }

    .estimated-year {
        flex: 1 1 40%;
    }

    .row-padding {
        padding-top: 1rem;
        padding-bottom: 1rem;
    }

    .header-column {
        align-self: center;
    }
</style>

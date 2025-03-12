<script lang="ts">
    import { CURRENT_YEAR } from "../../../shared/constants";
    import type { YearHeader } from "../../../shared/types";

    let { yearHeader }: { yearHeader: YearHeader } = $props();
    let yearsFromNow: number = yearHeader.year - CURRENT_YEAR;
    let yearText: string = yearsFromNow < 0 ? "years ago" : "years from now";
</script>

<div class="year-wrapper">
    <div class="header-column row-padding">
        {yearHeader.year}
    </div>
    <div class="header-column">
        Age: {yearHeader.age}
    </div>
    <div class="header-column">
        {yearsFromNow == 0 ? "This year" : Math.abs(yearsFromNow) + " " + yearText}
    </div>
</div>

<style>
    .year-wrapper {
 
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        border: 1px solid var(--border-color);
        border-bottom: none;
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
        box-sizing: border-box;
        background-color: var(--year-header-bg-color);
        padding-bottom: 1rem;
        padding-top: 1rem;
        font-weight: bold;
        font-size: 1.1rem;
    }

    .header-column {
        align-self: center;

    }
</style>

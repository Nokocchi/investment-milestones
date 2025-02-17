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
        border: 1px solid blue;
        box-sizing: border-box;
        background-color: rgba(150, 150, 255, 50%);
        padding-bottom: 1rem;
        padding-top: 1rem;
    }

    .header-column {
        align-self: center;
        flex: 1 1 0px;
    }
</style>

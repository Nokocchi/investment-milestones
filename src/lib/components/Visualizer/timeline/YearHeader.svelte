<script lang="ts">
    import { CURRENT_YEAR} from "../../../shared/constants";
    import type { YearHeader } from "../../../shared/types";

    let { yearHeader }: { yearHeader: YearHeader } = $props();
    let yearsFromNow: number = yearHeader.year - CURRENT_YEAR;
    let yearText: string = yearsFromNow < 0 ? "years ago" : "years from now";
</script>

<div class="year-wrapper">
    <div class="left header-column row-padding">
        {yearHeader.year}
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
        background-color: rgba(150, 150, 255, 50%);
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

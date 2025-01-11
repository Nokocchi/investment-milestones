<script lang="ts">
    import { CURRENT_YEAR, monthNames, monthsInAYear, ReachedState, type Milestone, type MonthData, type YearData, type YearHeader } from "./constants";
    import Table from "./Table.svelte";
    import Month from "./timeline/Month.svelte";
    import Year from "./timeline/Year.svelte";

    let { timelineData }: {
        timelineData: YearData[]
    } = $props();


</script>

{#each timelineData as year}
    <Year yearHeader={year.yearHeader}/>
    {#each year.monthData as month}
        <Month {month} />
    {/each}
{/each}

<style>
    .horizontal {
        display: flex;
        flex-direction: row;
    }

    .month-header {
        margin-right: 2rem;
    }

    .month-data {
        margin-bottom: 2rem;
    }
</style>

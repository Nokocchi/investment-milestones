<script lang="ts">
    import { monthNames, monthsInAYear, ReachedState, type Milestone, type MonthData, type YearData, type YearHeader } from "./constants";
    import Table from "./Table.svelte";
    import Month from "./timeline/Month.svelte";

    let { milestonesByMonth, netWorthByMonthList, currentAge, currentNetWorth }: {
        milestonesByMonth: Milestone[][],
        netWorthByMonthList: number[],
        currentAge: number,
        currentNetWorth: number
    } = $props();
    const milestoneDataHeaders = ["Milestones"];

    // TODO: a "required net worth" for each milestone
    let passedCurrentNetworth = false;
    let data: YearData[] = [];

    for (let monthNumber = 0; monthNumber < milestonesByMonth.length; monthNumber++) {
        const monthNumberInYear = monthNumber % 12;
        const networthAtThisTime = netWorthByMonthList[monthNumber];
        let yearsFromNow = Math.floor(monthNumber / 12);
        let year = 2025 + yearsFromNow;
        let monthName = monthNames[monthNumberInYear];
        let reachedState: ReachedState;

        if (networthAtThisTime < currentNetWorth) {
            reachedState = ReachedState.REACHED;
        } else if (!passedCurrentNetworth) {
            reachedState = ReachedState.HERE;
            passedCurrentNetworth = true;
        } else {
            reachedState = ReachedState.IN_FUTURE;
        }

        let monthData: MonthData = {
            reachedState: reachedState,
            monthName: monthName,
            estimatedNetWorth: networthAtThisTime,
            milestones: milestonesByMonth[monthNumber],
        };

        if (monthNumberInYear == 0) {
            let yearHeader: YearHeader = {
                year: year,
                age: currentAge + yearsFromNow,
                yearsFromNow: yearsFromNow,
            };

            let yearData: YearData = {
                yearHeader: yearHeader,
                monthData: [],
            };

            data.push(yearData);
        }

        data[yearsFromNow].monthData.push(monthData);
    }

</script>

{#each data as year}
    <h1>Age: {year.yearHeader.age} | Year: {year.yearHeader.year} | Years from now: {year.yearHeader.yearsFromNow}</h1>

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

<script lang="ts">
    import { monthNames, monthsInAYear } from "./constants";
    import Table from "./Table.svelte";

    let { milestonesByMonth, netWorthByMonthList, currentAge, currentNetWorth } = $props();
    const milestoneDataHeaders = ["Milestones"];

    type MonthData = {
        currentNetWorthLineAbove: boolean;
        monthName: string;
        estimatedNetWorth: number;
        milestones: string[][];
    };

    type YearHeader = {
        year: number;
        age: number;
        yearsFromNow: number;
    };

    type YearData = {
        yearHeader: YearHeader;
        monthData: MonthData[];
    };

    // TODO: a "required net worth" for each milestone
    let passedCurrentNetworth = false;
    let data: YearData[] = [];

    for (let monthNumber = 0; monthNumber < milestonesByMonth.length; monthNumber++) {
        const monthNumberInYear = monthNumber % 12;
        const networthAtThisTime = netWorthByMonthList[monthNumber];
        let yearsFromNow = Math.floor(monthNumber / 12);
        let year = 2025 + yearsFromNow;
        let monthName = monthNames[monthNumberInYear];
        let lineAbove = false;
        if (!passedCurrentNetworth && networthAtThisTime > currentNetWorth) {
            lineAbove = true;
            passedCurrentNetworth = true;
        }

        const milestones: string[][] = [];
        for (const milestone of milestonesByMonth[monthNumber]) {
            milestones.push([milestone]);
        }
        console.log(milestones);

        let monthData: MonthData = {
            currentNetWorthLineAbove: lineAbove,
            monthName: monthName,
            estimatedNetWorth: networthAtThisTime,
            milestones: milestones,
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

    console.log(data);
</script>

{#each data as year}
    <p>---------------------------------------------------</p>
    <p>Age: {year.yearHeader.age} | Year: {year.yearHeader.year} | Years from now: {year.yearHeader.yearsFromNow}</p>
    <p>---------------------------------------------------</p>

    {#each year.monthData as month}
        {#if month.currentNetWorthLineAbove}
        <p><b>HERE YOU ARE - HERE YOU ARE - HERE YOU ARE - HERE YOU ARE - HERE YOU ARE - HERE YOU ARE - HERE YOU ARE - HERE YOU ARE - HERE YOU ARE - HERE YOU ARE - HERE YOU ARE</b></p>
        {/if}
        <p>Month: {month.monthName}</p>
        <p>Estimated net worth: {Math.round(month.estimatedNetWorth).toLocaleString()}</p>
        {#if month.milestones.length > 0}
            <Table tableHeaders={milestoneDataHeaders} tableData={month.milestones} />
        {/if}
    {/each}
{/each}

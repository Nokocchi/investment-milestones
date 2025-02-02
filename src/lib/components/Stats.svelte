<script lang="ts">
    import { CURRENT_DATETIME, getMonth, monthsInAYear, workHoursPerYear, type DerivedOptions, type Options } from "../shared/constants";
    import { options } from "../shared/shared.svelte";
    import LabelAndText from "./LabelAndText.svelte";
    import LabelAndToggle from "./LabelAndToggle.svelte";
    import MonthCircle from "./MonthCircle.svelte";
    import PercentCircle from "./PercentCircle.svelte";

    const { derivedOptions, netWorthByMonthListNowAndFuture }: { derivedOptions: DerivedOptions; netWorthByMonthListNowAndFuture: number[] } = $props();

    const fireHowManyMonthsInFuture = (netWorthByMonthList: number[], fireNumber: number): number => {
        for (const [i, networthAtThisMonth] of netWorthByMonthList.entries()) {
            if (fireNumber < networthAtThisMonth) {
                return i;
            }
        }
        return 0;
    };

    const getCoastFireReachedMonthsInFuture = (options: DerivedOptions, netWorthByMonth: number[]): number => {
        const fireAmount = (options.monthlyExpensesAfterTax * 12) / options.safeWithdrawalRateDivided;
        for (const [i, networthAtThisMonth] of netWorthByMonth.entries()) {
            const monthsLeft = netWorthByMonth.length - i;
            const monthlyInterest = 1 + options.interestDivided / 12;
            const noContributionsFinalAmount = networthAtThisMonth * Math.pow(monthlyInterest, monthsLeft);
            if (noContributionsFinalAmount > fireAmount) {
                return i;
            }
        }
        return 0;
    };

    const getMonthsAsYearMonthString = (months: number | null) => {
        if (!months) {
            return "";
        }

        let coastFireReachedYearsInFuture = months / monthsInAYear;
        let coastFireReachedYearsInFutureFloored = Math.floor(coastFireReachedYearsInFuture);
        let coastFireReachedMonthPart = Math.ceil((coastFireReachedYearsInFuture % 1) * monthsInAYear);

        if (coastFireReachedYearsInFuture == 0 && coastFireReachedMonthPart == 0) {
            return "";
        }

        let yearSegment = "";
        if (coastFireReachedYearsInFutureFloored != 0) {
            yearSegment = `${coastFireReachedYearsInFutureFloored} years`;
        }

        let monthSegment = "";
        if (coastFireReachedMonthPart != 0) {
            monthSegment = `${coastFireReachedMonthPart} months`;
        }

        let divider = "";
        if (coastFireReachedMonthPart != 0 && coastFireReachedYearsInFutureFloored != 0) {
            divider = ", ";
        }

        return yearSegment + divider + monthSegment;
    };

    const perHour = (derivedOptions.currentNetWorth * derivedOptions.interestDivided) / workHoursPerYear;
    const fireMonths = (derivedOptions.currentNetWorth * derivedOptions.safeWithdrawalRateDivided) / derivedOptions.monthlyExpensesAfterTax;

    const safeWithdrawalPerMonth = (derivedOptions.currentNetWorth *derivedOptions.safeWithdrawalRateDivided) / monthsInAYear;

    const investmentStartMonth: number | null = derivedOptions.investmentStart ? getMonth(derivedOptions.investmentStart) : null;
    const monthsInvestedSoFar: number | null = investmentStartMonth ? getMonth(CURRENT_DATETIME) - investmentStartMonth : null;

    const coastFireReachedMonthsInFuture: number = getCoastFireReachedMonthsInFuture(derivedOptions, netWorthByMonthListNowAndFuture);
    const coastFireReachedPercentage =
        monthsInvestedSoFar === null ? 0 : (monthsInvestedSoFar / (monthsInvestedSoFar + coastFireReachedMonthsInFuture)) * 100;

    const fireNumber = (derivedOptions.monthlyExpensesAfterTax * monthsInAYear) / derivedOptions.safeWithdrawalRateDivided;
    const fireMonthsInFuture = fireHowManyMonthsInFuture(netWorthByMonthListNowAndFuture, fireNumber);
    const fireReachedPercentage =
        monthsInvestedSoFar === null ? 0 : (monthsInvestedSoFar / (monthsInvestedSoFar + fireMonthsInFuture)) * 100;

    const monthlyInterest = (derivedOptions.currentNetWorth * derivedOptions.interestDivided) / monthsInAYear;
</script>

<div class="stats"></div>
<div class="row circles">
    <div class="column">
        <PercentCircle percent={Math.round(coastFireReachedPercentage)} title="Coast FIRE" />
    </div>
    <div class="column">
        <PercentCircle percent={Math.round(fireReachedPercentage)} title="FIRE" />
    </div>
    <div class="column">
        <MonthCircle numberOfMonths={fireMonths} title="FI months" />
    </div>
</div>

<div class="row">
    <div class="column">
        <LabelAndText label={"Net worth"} text={`${Math.round(derivedOptions.currentNetWorth).toLocaleString()} ${derivedOptions.currency}`} />
        <LabelAndText label={"Earn per work hour"} text={`${Math.round(perHour).toLocaleString()} ${derivedOptions.currency}`} />
        <LabelAndText label={"Monthly interest"} text={`${Math.round(monthlyInterest).toLocaleString()} ${derivedOptions.currency}`} />
        <LabelAndText
            label={"Safe monthly withdrawal"}
            text={`${Math.round(safeWithdrawalPerMonth).toLocaleString()} ${derivedOptions.currency}`}
        />
    </div>
    <div class="column">
        <LabelAndText label={"Planned retirement"} text={`${derivedOptions.retireByAge} years | ${getMonthsAsYearMonthString(netWorthByMonthListNowAndFuture.length - 1)} from now`} />
        <LabelAndText label={"Investing for"} text={getMonthsAsYearMonthString(monthsInvestedSoFar)} />
        <LabelAndText label={"Until Coast FIRE"} text={getMonthsAsYearMonthString(coastFireReachedMonthsInFuture)} />
        <LabelAndText label={"Until FIRE"} text={getMonthsAsYearMonthString(fireMonthsInFuture)} />
        <LabelAndToggle label="Expand all milestones" bind:checked={options.showAllMilestones} />
    </div>
</div>

<style>
    .column {
        display: flex;
        flex-direction: column;
        padding: 1rem;
    }

    .row {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .circles {
        margin-bottom: 1rem;
    }
</style>

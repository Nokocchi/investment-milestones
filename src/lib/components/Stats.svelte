<script lang="ts">
    import { getMonthsAsYearMonthString } from "../shared/constants";
    import { options } from "../shared/shared.svelte";
    import type { DerivedOptions } from "../shared/types";
    import LabelAndText from "./LabelAndText.svelte";
    import LabelAndToggle from "./LabelAndToggle.svelte";
    import MonthCircle from "./MonthCircle.svelte";
    import PercentCircle from "./PercentCircle.svelte";

    const {
        derivedOptions,
        netWorthByMonthListNowAndFuture,
    }: { derivedOptions: DerivedOptions; netWorthByMonthListNowAndFuture: number[] } = $props();

    const fireHowManyMonthsInFuture = (netWorthByMonthList: number[], fireNumber: number): number => {
        for (const [i, networthAtThisMonth] of netWorthByMonthList.entries()) {
            if (fireNumber < networthAtThisMonth) {
                return i;
            }
        }
        return 0;
    };

    const getCoastFireReachedMonthsInFuture = (options: DerivedOptions, netWorthByMonth: number[]): number => {
        for (const [i, networthAtThisMonth] of netWorthByMonth.entries()) {
            const monthsLeft = netWorthByMonth.length - i;
            const monthlyInterest = 1 + options.monthlyInterestDivided;
            const noContributionsFinalAmount = networthAtThisMonth * Math.pow(monthlyInterest, monthsLeft);
            if (noContributionsFinalAmount > options.fireNumber) {
                return i;
            }
        }
        return 0;
    };

    const monthsSinceInvestmentStart = derivedOptions.monthsSinceInvestmentStart;
    const fireMonthsInFuture = fireHowManyMonthsInFuture(netWorthByMonthListNowAndFuture, derivedOptions.fireNumber);
    const fireReachedPercentage = monthsSinceInvestmentStart
        ? (monthsSinceInvestmentStart / (monthsSinceInvestmentStart + fireMonthsInFuture)) * 100
        : 0;

    const coastFireReachedMonthsInFuture: number = getCoastFireReachedMonthsInFuture(derivedOptions, netWorthByMonthListNowAndFuture);
    const coastFireReachedPercentage = monthsSinceInvestmentStart
        ? (monthsSinceInvestmentStart / (monthsSinceInvestmentStart + coastFireReachedMonthsInFuture)) * 100
        : 0;
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
        <MonthCircle numberOfMonths={derivedOptions.fireMonthsFractional} title="FI months" />
    </div>
</div>

<div class="row">
    <div class="column">
        <LabelAndText
            label={"Net worth"}
            text={`${Math.round(derivedOptions.currentNetWorth).toLocaleString()} ${derivedOptions.currency}`}
        />
        <LabelAndText
            label={"Earn per work hour"}
            text={`${Math.round(derivedOptions.perHour).toLocaleString()} ${derivedOptions.currency}`}
        />
        <LabelAndText
            label={"Monthly interest"}
            text={`${Math.round(derivedOptions.monthlyInterestGrowth).toLocaleString()} ${derivedOptions.currency}`}
        />
        <LabelAndText
            label={"Safe monthly withdrawal"}
            text={`${Math.round(derivedOptions.safeMonthlyWithdrawal).toLocaleString()} ${derivedOptions.currency}`}
        />
    </div>
    <div class="column">
        <LabelAndText
            label={"Planned retirement"}
            text={`${derivedOptions.retireByAge} years | ${getMonthsAsYearMonthString(netWorthByMonthListNowAndFuture.length - 1)} from now`}
        />
        <LabelAndText label={"Investing for"} text={getMonthsAsYearMonthString(derivedOptions.monthsSinceInvestmentStart)} />
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

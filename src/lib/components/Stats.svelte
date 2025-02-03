<script lang="ts">
    import { options } from "../shared/shared.svelte";
    import type { DerivedOptions } from "../shared/types";
    import { getMonthAsAgeYearString, getMonthsAsYearMonthString } from "../shared/utils";
    import LabelAndText from "./LabelAndText.svelte";
    import LabelAndToggle from "./LabelAndToggle.svelte";
    import MonthCircle, { CircleType } from "./MonthCircle.svelte";
    import PercentCircle from "./PercentCircle.svelte";

    const {
        derivedOptions,
        netWorthByMonthListNowAndFuture,
        fireMonthsInFuture,
        coastFireReachedMonthsInFuture,
    }: {
        derivedOptions: DerivedOptions;
        netWorthByMonthListNowAndFuture: number[];
        fireMonthsInFuture: number | null;
        coastFireReachedMonthsInFuture: number | null;
    } = $props();

    const coastFireReachedPercentage =
        coastFireReachedMonthsInFuture !== null
            ? (derivedOptions.monthsSinceInvestmentStart / (derivedOptions.monthsSinceInvestmentStart + coastFireReachedMonthsInFuture)) *
              100
            : null;

    const fireReachedPercentage =
        fireMonthsInFuture !== null
            ? (derivedOptions.monthsSinceInvestmentStart / (derivedOptions.monthsSinceInvestmentStart + fireMonthsInFuture)) * 100
            : null;
         
</script>

<div class="stats"></div>
<div class="row circles">
    <div class="column">
        <MonthCircle value={coastFireReachedPercentage} title="Coast FIRE" type={CircleType.PERCENT} />
    </div>
    <div class="column">
        <MonthCircle value={fireReachedPercentage} title="FIRE" type={CircleType.PERCENT} />
    </div>
    <div class="column">
        <MonthCircle value={derivedOptions.fireMonthsFractional} title="FI months" type={CircleType.MONTHS} />
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
        <LabelAndText
            label={"Needed for coast now"}
            text={`${Math.round(derivedOptions.netWorthNeededNowForCoast).toLocaleString()} ${derivedOptions.currency}`}
        />
        <LabelAndText
        label={"Minimum monthly Contribution for FIRE"}
        text={`${Math.max(0, Math.abs(Math.round(derivedOptions.minimumMonthlyContributionsNeededToReachFire))).toLocaleString()} ${derivedOptions.currency}`}
    />
    </div>
    <div class="column">
        <LabelAndText
            label={"Planned retirement"}
            text={getMonthsAsYearMonthString(netWorthByMonthListNowAndFuture.length - 1)}
            text2={getMonthAsAgeYearString(netWorthByMonthListNowAndFuture.length - 1, derivedOptions.currentAge)}
        />
        <LabelAndText label={"Investing for"} text={getMonthsAsYearMonthString(derivedOptions.monthsSinceInvestmentStart)} />
        {#if derivedOptions.coastFromDateMonthsInFuture}
            <LabelAndText
                label={"Chosen Coast Date"}
                text={getMonthsAsYearMonthString(derivedOptions.coastFromDateMonthsInFuture, "Reached")}
                text2={getMonthAsAgeYearString(derivedOptions.coastFromDateMonthsInFuture, derivedOptions.currentAge)}
            />
        {:else}
            <LabelAndText
                label={"Estimated Coast FIRE"}
                text={getMonthsAsYearMonthString(coastFireReachedMonthsInFuture, "Reached")}
                text2={getMonthAsAgeYearString(coastFireReachedMonthsInFuture, derivedOptions.currentAge)}
            />
        {/if}
        <LabelAndText
            label={"Estimated FIRE"}
            text={getMonthsAsYearMonthString(fireMonthsInFuture, "Reached")}
            text2={getMonthAsAgeYearString(fireMonthsInFuture, derivedOptions.currentAge)}
        />
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

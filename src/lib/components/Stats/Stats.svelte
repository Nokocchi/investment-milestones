<script lang="ts">
    import { options } from "../../shared/shared.svelte";
    import type { DerivedOptions } from "../../shared/types";
    import { getMonthAsAgeYearString, getMonthsAsYearMonthString, roundAndFormat } from "../../shared/utils";
    import LabelAndText from "./LabelAndText.svelte";
    import MonthCircle from "./MonthCircle.svelte";
    import { CircleType } from "./MonthCircle.svelte";
    import LabelAndToggle from "./LabelAndToggle.svelte";

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
        <LabelAndText label={"Net worth"} text={roundAndFormat(derivedOptions.currentNetWorth, derivedOptions.currency)} />
        <LabelAndText label={"Earn per work hour"} text={roundAndFormat(derivedOptions.perHour, derivedOptions.currency)} />
        <LabelAndText label={"Monthly interest"} text={roundAndFormat(derivedOptions.monthlyInterestGrowth, derivedOptions.currency)} />
        <LabelAndText
            label={"Safe monthly withdrawal"}
            text={roundAndFormat(derivedOptions.safeMonthlyWithdrawal, derivedOptions.currency)}
        />
        <!-- The needed amount is nice to keep, for the extra info. Maybe I can mark as "already reached"? derivedOptions.netWorthNeededNowForCoast <= derivedOptions.currentNetWorth -->
        <LabelAndText
            label={"Needed to coast now"}
            text={roundAndFormat(derivedOptions.netWorthNeededNowForCoast, derivedOptions.currency)}
        />
        <!-- If we have no months left to invest, and we are projected not to hit fire, there's nothing to print here -->
        <LabelAndText
            label={"Minimum monthly Contribution for FIRE"}
            text={coastFireReachedMonthsInFuture == 0 && !fireMonthsInFuture ? "N/A" : roundAndFormat(derivedOptions.minimumMonthlyContributionsNeededToReachFire, derivedOptions.currency)}
        />
    </div>
    <div class="column">
        <LabelAndText label={"Investing for"} text={getMonthsAsYearMonthString(derivedOptions.monthsSinceInvestmentStart)} />
        {#if derivedOptions.coastFromDateMonthsInFuture}
            <LabelAndText
                label={"Chosen Coast Date"}
                text={getMonthsAsYearMonthString(derivedOptions.coastFromDateMonthsInFuture, "Reached")}
                text2={getMonthAsAgeYearString(derivedOptions.coastFromDateMonthsInFuture, derivedOptions.currentAge)}
                text3={derivedOptions.coastFromDateMonthsInFuture
                    ? `${roundAndFormat(netWorthByMonthListNowAndFuture[derivedOptions.coastFromDateMonthsInFuture], derivedOptions.currency)}`
                    : undefined}
            />
        {:else}
            <LabelAndText
                label={"Estimated Coast FIRE"}
                text={getMonthsAsYearMonthString(coastFireReachedMonthsInFuture, "Reached")}
                text2={getMonthAsAgeYearString(coastFireReachedMonthsInFuture, derivedOptions.currentAge)}
                text3={coastFireReachedMonthsInFuture
                    ? `${roundAndFormat(netWorthByMonthListNowAndFuture[coastFireReachedMonthsInFuture], derivedOptions.currency)}`
                    : undefined}
            />
        {/if}
        <LabelAndText
            label={"Estimated FIRE"}
            text={getMonthsAsYearMonthString(fireMonthsInFuture, "Reached")}
            text2={getMonthAsAgeYearString(fireMonthsInFuture, derivedOptions.currentAge)}
            text3={fireMonthsInFuture
                ? `${roundAndFormat(netWorthByMonthListNowAndFuture[fireMonthsInFuture], derivedOptions.currency)}`
                : undefined}
        />
        <LabelAndText
            label={"Planned retirement"}
            text={getMonthsAsYearMonthString(netWorthByMonthListNowAndFuture.length - 1)}
            text2={getMonthAsAgeYearString(netWorthByMonthListNowAndFuture.length - 1, derivedOptions.currentAge)}
            text3={`${roundAndFormat(netWorthByMonthListNowAndFuture[netWorthByMonthListNowAndFuture.length - 1], derivedOptions.currency)}`}
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

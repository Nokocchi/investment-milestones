<script lang="ts">
    import { options } from "../../shared/shared.svelte";
    import type { DerivedOptions } from "../../shared/types";
    import { getMonthAsAgeYearString, getMonthsAsYearMonthString, roundAndFormat } from "../../shared/utils";
    import LabelAndText from "./LabelAndText.svelte";
    import MonthCircle from "./MonthCircle.svelte";
    import { CircleType } from "./MonthCircle.svelte";
    import LabelAndToggle from "./LabelAndToggle.svelte";
    import {
        tooltipText_CoastFromChosenDate,
        tooltipText_EarnPerHour,
        tooltipText_estimatedCoastFireText,
        tooltipText_FireNumber,
        tooltipText_neededToRetireAmountText,
        tooltipText_plannedRetirementText,
        tooltipText_whenFireText,
    } from "../../shared/TooltipTexts";

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

    let screenWidth: number = $state(0);
    let tooltipMaxWidth: string = $derived(screenWidth > 1280 ? screenWidth / 2 + "px" : screenWidth / 4 + "px");

    const hideMinimumMonthlyContributions = (coastFireReachedMonthsInFuture == 0 && !fireMonthsInFuture) || !derivedOptions.safeWithdrawalRatePercentage;

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

<svelte:window bind:outerWidth={screenWidth} />
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

<div class="row" style="--tooltip-max-width: {tooltipMaxWidth}">
    <div class="column">
        <LabelAndText label={"Net worth"} texts={[roundAndFormat(derivedOptions.currentNetWorth, derivedOptions.currency)]} />
        <LabelAndText
            label={"Your FIRE number"}
            texts={[
                derivedOptions.safeWithdrawalRatePercentage
                    ? roundAndFormat(derivedOptions.fireNumber, derivedOptions.currency)
                    : "Impossible",
            ]}
            tooltipText={tooltipText_FireNumber(
                derivedOptions.safeWithdrawalRatePercentage,
                derivedOptions.annualInterestPercent,
                derivedOptions.monthlyExpensesAfterTax,
                derivedOptions.currency,
            )}
        />
        <LabelAndText
            label={"Earn per work hour"}
            texts={[roundAndFormat(derivedOptions.perHour, derivedOptions.currency)]}
            tooltipText={tooltipText_EarnPerHour()}
        />
        <LabelAndText label={"Monthly interest"} texts={[roundAndFormat(derivedOptions.monthlyInterestGrowth, derivedOptions.currency)]} />
        <LabelAndText
            label={"Safe monthly withdrawal"}
            texts={[roundAndFormat(derivedOptions.safeMonthlyWithdrawal, derivedOptions.currency)]}
        />
        <!-- The needed amount is nice to keep, for the extra info. Maybe I can mark as "already reached"? derivedOptions.netWorthNeededNowForCoast <= derivedOptions.currentNetWorth -->
        <LabelAndText
            label={"Needed now to coast"}
            texts={[
                derivedOptions.safeWithdrawalRatePercentage
                    ? roundAndFormat(derivedOptions.netWorthNeededNowForCoast, derivedOptions.currency)
                    : "Impossible",
            ]}
            difference={derivedOptions.safeWithdrawalRatePercentage ? (derivedOptions.currentNetWorth - derivedOptions.netWorthNeededNowForCoast) : undefined}
        />
        <!-- If we have no months left to invest, and we are projected not to hit fire, there's nothing to print here -->
        <LabelAndText
            label={"Minimum monthly Contribution for FIRE"}
            texts={[
                hideMinimumMonthlyContributions
                    ? "Impossible"
                    : roundAndFormat(derivedOptions.minimumMonthlyContributionsNeededToReachFire, derivedOptions.currency),
            ]}
            difference={hideMinimumMonthlyContributions ? undefined: derivedOptions.monthlyContribution - derivedOptions.minimumMonthlyContributionsNeededToReachFire}
            tooltipText={tooltipText_neededToRetireAmountText(derivedOptions.retireByAge, derivedOptions.coastFromDate)}
        />
    </div>
    <div class="column">
        <LabelAndText label={"Investing for"} texts={[getMonthsAsYearMonthString(derivedOptions.monthsSinceInvestmentStart)]} />
        {#if derivedOptions.coastFromDateMonthsInFuture}
            <LabelAndText
                label={"Chosen Coast Date"}
                texts={[
                    getMonthsAsYearMonthString(derivedOptions.coastFromDateMonthsInFuture, "Reached"),
                    getMonthAsAgeYearString(derivedOptions.coastFromDateMonthsInFuture, derivedOptions.currentAge),
                    derivedOptions.coastFromDateMonthsInFuture
                        ? `${roundAndFormat(netWorthByMonthListNowAndFuture[derivedOptions.coastFromDateMonthsInFuture], derivedOptions.currency)}`
                        : undefined,
                ]}
                tooltipText={tooltipText_CoastFromChosenDate()}
            />
        {:else}
            <LabelAndText
                label={"Estimated Coast FIRE"}
                texts={[
                    getMonthsAsYearMonthString(coastFireReachedMonthsInFuture, "Reached"),
                    getMonthAsAgeYearString(coastFireReachedMonthsInFuture, derivedOptions.currentAge),
                    coastFireReachedMonthsInFuture
                        ? `${roundAndFormat(netWorthByMonthListNowAndFuture[coastFireReachedMonthsInFuture], derivedOptions.currency)}`
                        : undefined,
                ]}
                tooltipText={tooltipText_estimatedCoastFireText(
                    derivedOptions.fireNumber,
                    derivedOptions.currency,
                    derivedOptions.retireByAge,
                    derivedOptions.annualInterestPercent,
                )}
            />
        {/if}
        <LabelAndText
            label={"Estimated FIRE"}
            texts={[
                getMonthsAsYearMonthString(fireMonthsInFuture, "Reached"),
                getMonthAsAgeYearString(fireMonthsInFuture, derivedOptions.currentAge),
                fireMonthsInFuture
                    ? `${roundAndFormat(netWorthByMonthListNowAndFuture[fireMonthsInFuture], derivedOptions.currency)}`
                    : undefined,
            ]}
            tooltipText={tooltipText_whenFireText(derivedOptions.coastFromDate)}
        />
        <LabelAndText
            label={"Planned retirement"}
            texts={[
                getMonthsAsYearMonthString(netWorthByMonthListNowAndFuture.length - 1),
                getMonthAsAgeYearString(netWorthByMonthListNowAndFuture.length - 1, derivedOptions.currentAge),
                `${roundAndFormat(netWorthByMonthListNowAndFuture[netWorthByMonthListNowAndFuture.length - 1], derivedOptions.currency)}`,
            ]}
            tooltipText={tooltipText_plannedRetirementText(derivedOptions.coastFromDate)}
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

    :global(#tooltip) {
        width: var(--tooltip-width);
    }
</style>

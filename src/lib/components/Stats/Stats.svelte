<script lang="ts">
    import { options } from "../../shared/shared.svelte";
    import { TextColor, type DerivedOptions, type TextWithSubtext } from "../../shared/types";
    import {
        createSimpleText,
        formatNumberWithSign,
        getMonthAsAgeYearString,
        getMonthsAsYearMonthString,
        roundAndFormat,
    } from "../../shared/utils";
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

    const hideMinimumMonthlyContributions =
        (coastFireReachedMonthsInFuture == 0 && !fireMonthsInFuture) || !derivedOptions.safeWithdrawalRatePercentage;

    const coastFireReachedPercentage =
        coastFireReachedMonthsInFuture !== null
            ? (derivedOptions.monthsSinceInvestmentStart / (derivedOptions.monthsSinceInvestmentStart + coastFireReachedMonthsInFuture)) *
              100
            : null;

    const fireReachedPercentage =
        fireMonthsInFuture !== null
            ? (derivedOptions.monthsSinceInvestmentStart / (derivedOptions.monthsSinceInvestmentStart + fireMonthsInFuture)) * 100
            : null;

    const howFarFromCoastNumber = derivedOptions.currentNetWorth - derivedOptions.netWorthNeededNowForCoast;
    const howFarFromMinimumMonthlyContribution =
        derivedOptions.monthlyContribution - derivedOptions.minimumMonthlyContributionsNeededToReachFire;

    const yourFireNumber = derivedOptions.safeWithdrawalRatePercentage
        ? roundAndFormat(derivedOptions.fireNumber, derivedOptions.currency)
        : "Impossible";

    const netWorthText: TextWithSubtext = createSimpleText(roundAndFormat(derivedOptions.currentNetWorth, derivedOptions.currency));
    const yourFireNumberText: TextWithSubtext = createSimpleText(yourFireNumber);
    const earnPerWorkHour: TextWithSubtext = createSimpleText(roundAndFormat(derivedOptions.perHour, derivedOptions.currency));
    const monthlyInterest: TextWithSubtext = createSimpleText(
        roundAndFormat(derivedOptions.monthlyInterestGrowth, derivedOptions.currency),
    );
    const safeMonthlyWithdrawal: TextWithSubtext = createSimpleText(
        roundAndFormat(derivedOptions.safeMonthlyWithdrawal, derivedOptions.currency),
    );
    const investingFor: TextWithSubtext = createSimpleText(getMonthsAsYearMonthString(derivedOptions.monthsSinceInvestmentStart));
    const estimatedCoastFire1: TextWithSubtext = createSimpleText(getMonthsAsYearMonthString(coastFireReachedMonthsInFuture, "Reached"));
    const estimatedCoastFire2: TextWithSubtext = createSimpleText(getMonthAsAgeYearString(fireMonthsInFuture, derivedOptions.currentAge));
    const estimatedCoastFire3: TextWithSubtext = {
        text: {
            value: coastFireReachedMonthsInFuture
                ? `${roundAndFormat(netWorthByMonthListNowAndFuture[coastFireReachedMonthsInFuture], derivedOptions.currency)}`
                : undefined,
        },
    };

    const estimatedFire1: TextWithSubtext = createSimpleText(getMonthsAsYearMonthString(fireMonthsInFuture, "Reached"));
    const estimatedFire2: TextWithSubtext = createSimpleText(getMonthAsAgeYearString(fireMonthsInFuture, derivedOptions.currentAge));
    const estimatedFire3: TextWithSubtext = {
        text: {
            value: fireMonthsInFuture
                ? `${roundAndFormat(netWorthByMonthListNowAndFuture[fireMonthsInFuture], derivedOptions.currency)}`
                : undefined,
        },
    };

    const plannedRetirement1: TextWithSubtext = createSimpleText(getMonthsAsYearMonthString(netWorthByMonthListNowAndFuture.length - 1));
    const plannedRetirement2: TextWithSubtext = createSimpleText(
        getMonthAsAgeYearString(netWorthByMonthListNowAndFuture.length - 1, derivedOptions.currentAge),
    );
    const plannedRetirement3: TextWithSubtext = createSimpleText(
        `${roundAndFormat(netWorthByMonthListNowAndFuture[netWorthByMonthListNowAndFuture.length - 1], derivedOptions.currency)}`,
    );

    const neededNowToCoast: TextWithSubtext = {
        text: {
            value: derivedOptions.safeWithdrawalRatePercentage
                ? roundAndFormat(derivedOptions.netWorthNeededNowForCoast, derivedOptions.currency)
                : "Impossible",
        },
        subtext: {
            value: derivedOptions.safeWithdrawalRatePercentage
                ? formatNumberWithSign(derivedOptions.currency, howFarFromCoastNumber)
                : undefined,
            color: howFarFromCoastNumber > 0 ? TextColor.GREEN : TextColor.RED,
        },
    };

    const minimumMonthlyContributionsNeededToReachFire: TextWithSubtext = {
        text: {
            value: hideMinimumMonthlyContributions
                ? "Impossible"
                : roundAndFormat(derivedOptions.minimumMonthlyContributionsNeededToReachFire, derivedOptions.currency),
        },
        subtext: {
            value: hideMinimumMonthlyContributions
                ? undefined
                : formatNumberWithSign(derivedOptions.currency, howFarFromMinimumMonthlyContribution),
            color: howFarFromMinimumMonthlyContribution > 0 ? TextColor.GREEN : TextColor.RED,
        },
    };

    const coastDateOkay: boolean = derivedOptions.coastFromDateMonthsInFuture != null && fireMonthsInFuture != null;
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
        <LabelAndText label={"Net worth"} texts={[netWorthText]} />
        <LabelAndText
            label={"Your FIRE number"}
            texts={[yourFireNumberText]}
            tooltipText={tooltipText_FireNumber(
                derivedOptions.safeWithdrawalRatePercentage,
                derivedOptions.annualInterestPercent,
                derivedOptions.monthlyExpensesAfterTax,
                derivedOptions.currency,
            )}
        />
        <LabelAndText label={"Earn per work hour"} texts={[earnPerWorkHour]} tooltipText={tooltipText_EarnPerHour()} />
        <LabelAndText label={"Monthly interest"} texts={[monthlyInterest]} />
        <LabelAndText label={"Safe monthly withdrawal"} texts={[safeMonthlyWithdrawal]} />
        <LabelAndText label={"Needed now to coast"} texts={[neededNowToCoast]} />
        <LabelAndText
            label={"Minimum monthly Contribution for FIRE"}
            texts={[minimumMonthlyContributionsNeededToReachFire]}
            tooltipText={tooltipText_neededToRetireAmountText(derivedOptions.retireByAge, derivedOptions.coastFromDate)}
        />
    </div>
    <div class="column">
        <LabelAndText label={"Investing for"} texts={[investingFor]} />
        {#if derivedOptions.coastFromDateMonthsInFuture}
            <LabelAndText
                label={"Chosen Coast Date"}
                texts={[
                    createSimpleText(getMonthsAsYearMonthString(derivedOptions.coastFromDateMonthsInFuture, "Reached")),
                    createSimpleText(getMonthAsAgeYearString(derivedOptions.coastFromDateMonthsInFuture, derivedOptions.currentAge)),
                    createSimpleText(
                        derivedOptions.coastFromDateMonthsInFuture
                            ? `${roundAndFormat(netWorthByMonthListNowAndFuture[derivedOptions.coastFromDateMonthsInFuture], derivedOptions.currency)}`
                            : undefined,
                    ),
                    {
                        text: {
                            value: coastDateOkay ? "Coast date OK" : "Too early to FIRE",
                            color: coastDateOkay ? TextColor.GREEN : TextColor.RED,
                        },
                    },
                ]}
                tooltipText={tooltipText_CoastFromChosenDate()}
            />
        {:else}
            <LabelAndText
                label={"Estimated Coast FIRE"}
                texts={[estimatedCoastFire1, estimatedCoastFire2, estimatedCoastFire3]}
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
            texts={[estimatedFire1, estimatedFire2, estimatedFire3]}
            tooltipText={tooltipText_whenFireText(derivedOptions.coastFromDate)}
        />
        <LabelAndText
            label={"Planned retirement"}
            texts={[plannedRetirement1, plannedRetirement2, plannedRetirement3]}
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

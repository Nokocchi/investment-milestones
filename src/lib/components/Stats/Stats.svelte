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

    let screenWidth: number = $state(0);
    let tooltipMaxWidth: string = $derived(screenWidth / 6 + "px");

    const coastFireReachedPercentage =
        coastFireReachedMonthsInFuture !== null
            ? (derivedOptions.monthsSinceInvestmentStart / (derivedOptions.monthsSinceInvestmentStart + coastFireReachedMonthsInFuture)) *
              100
            : null;

    const fireReachedPercentage =
        fireMonthsInFuture !== null
            ? (derivedOptions.monthsSinceInvestmentStart / (derivedOptions.monthsSinceInvestmentStart + fireMonthsInFuture)) * 100
            : null;

    const neededToRetireAmountText: string = derivedOptions.coastFromDate
        ? `Assuming you keep investing until your coast fire date ${derivedOptions.coastFromDate.toLocaleDateString()}, and then you coast until your retirement age of ${derivedOptions.retireByAge}`
        : `Assuming you keep investing until your retirement age of ${derivedOptions.retireByAge}`;

    const whenFireText: string = derivedOptions.coastFromDate
        ? `This is the estimated date and time you will hit your fire number, assuming you are coasting from ${derivedOptions.coastFromDate.toLocaleDateString()}, and not investing anything after this.`
        : `This is the estimated date and time you will hit your fire number`;

    const estimatedCoastFireText: string = `The estimated date and time that you could completely stop investing, and your net worth would grow to your fire number ${roundAndFormat(derivedOptions.fireNumber, derivedOptions.currency)} by the chosen retirement age ${derivedOptions.retireByAge}, assuming an annual interest of ${derivedOptions.annualInterestPercent}%`;

    const plannedRetirementText: string = "When you want to retire. Your investments are simulated until this date" + (derivedOptions.coastFromDate ? `. You have selected a coast fire date of ${derivedOptions.coastFromDate.toLocaleDateString()}, so monthly contributions are only taken into account until this date` : "");
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
        <LabelAndText label={"Net worth"} text={roundAndFormat(derivedOptions.currentNetWorth, derivedOptions.currency)} />
        <LabelAndText
            label={"Your FIRE number"}
            text={roundAndFormat(derivedOptions.fireNumber, derivedOptions.currency)}
            tooltipText={`This is the amount of money you need to be financially independent, assuming a SWR of ${derivedOptions.safeWithdrawalRatePercentage}%, an annual interest of ${derivedOptions.annualInterestPercent}%, and monthly expenses of ${roundAndFormat(derivedOptions.monthlyExpensesAfterTax, derivedOptions.currency)}`}
        />
        <LabelAndText
            label={"Earn per work hour"}
            text={roundAndFormat(derivedOptions.perHour, derivedOptions.currency)}
            tooltipText={"Assuming 40 hours of work per week, and 46 work hours per year, you work 1840 hours per year. Assuming your current annual interest is earned in similar 1840 one-hour increments, this value shows how much you earn from interest per work hour."}
        />
        <LabelAndText label={"Monthly interest"} text={roundAndFormat(derivedOptions.monthlyInterestGrowth, derivedOptions.currency)} />
        <LabelAndText
            label={"Safe monthly withdrawal"}
            text={roundAndFormat(derivedOptions.safeMonthlyWithdrawal, derivedOptions.currency)}
        />
        <!-- The needed amount is nice to keep, for the extra info. Maybe I can mark as "already reached"? derivedOptions.netWorthNeededNowForCoast <= derivedOptions.currentNetWorth -->
        <LabelAndText
            label={"Needed now to coast"}
            text={roundAndFormat(derivedOptions.netWorthNeededNowForCoast, derivedOptions.currency)}
        />
        <!-- If we have no months left to invest, and we are projected not to hit fire, there's nothing to print here -->
        <LabelAndText
            label={"Minimum monthly Contribution for FIRE"}
            text={coastFireReachedMonthsInFuture == 0 && !fireMonthsInFuture
                ? "N/A"
                : roundAndFormat(derivedOptions.minimumMonthlyContributionsNeededToReachFire, derivedOptions.currency)}
            tooltipText={neededToRetireAmountText}
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
                tooltipText={"This is the date from which you will no longer invest any money, and instead you are letting your net worth grow by itself."}
            />
        {:else}
            <LabelAndText
                label={"Estimated Coast FIRE"}
                text={getMonthsAsYearMonthString(coastFireReachedMonthsInFuture, "Reached")}
                text2={getMonthAsAgeYearString(coastFireReachedMonthsInFuture, derivedOptions.currentAge)}
                text3={coastFireReachedMonthsInFuture
                    ? `${roundAndFormat(netWorthByMonthListNowAndFuture[coastFireReachedMonthsInFuture], derivedOptions.currency)}`
                    : undefined}
                tooltipText={estimatedCoastFireText}
            />
        {/if}
        <LabelAndText
            label={"Estimated FIRE"}
            text={getMonthsAsYearMonthString(fireMonthsInFuture, "Reached")}
            text2={getMonthAsAgeYearString(fireMonthsInFuture, derivedOptions.currentAge)}
            text3={fireMonthsInFuture
                ? `${roundAndFormat(netWorthByMonthListNowAndFuture[fireMonthsInFuture], derivedOptions.currency)}`
                : undefined}
            tooltipText={whenFireText}
        />
        <LabelAndText
            label={"Planned retirement"}
            text={getMonthsAsYearMonthString(netWorthByMonthListNowAndFuture.length - 1)}
            text2={getMonthAsAgeYearString(netWorthByMonthListNowAndFuture.length - 1, derivedOptions.currentAge)}
            text3={`${roundAndFormat(netWorthByMonthListNowAndFuture[netWorthByMonthListNowAndFuture.length - 1], derivedOptions.currency)}`}
            tooltipText={plannedRetirementText}
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
        width: var(--tooltip-max-width);
    }
</style>

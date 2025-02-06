<script lang="ts">
    import { CURRENT_DATETIME_ABSOLUTE, monthsInAYear, workHoursPerYear } from "../../shared/constants";

    import { options } from "../../shared/shared.svelte";
    import type { DerivedOptions, Options } from "../../shared/types";
    import {
        getAbsoluteMonth,
        getMonthlyContributionNeededForFutureValue,
        getPrincipalNeededForNoContributionFutureValue,
    } from "../../shared/utils";
    import MainPage from "./MainPage.svelte";

    const getDerivedOptions = (opts: Options): DerivedOptions | null => {

        if (!(opts.currentAge && opts.retireByAge && opts.retireByAge >= opts.currentAge)) {
            return null;
        }

        const monthlyContribution = opts.monthlyContribution || 0;
        const currency = opts.currency || "";
        const currentNetWorth = opts.currentNetWorth || 0;
        const annualInterestPercent = opts.annualInterestPercent || 0;
        const annualInterestDivided = annualInterestPercent / 100;
        const monthlyInterestDivided = annualInterestDivided / monthsInAYear;
        const monthlyInterestPlusOne = 1 + monthlyInterestDivided;
        const monthlyExpensesAfterTax = opts.monthlyExpensesAfterTax || 0;
        const annualExpensesAfterTax = monthlyExpensesAfterTax * monthsInAYear;
        const showAllMilestones = opts.showAllMilestones || false;
        const safeWithdrawalRatePercentage = opts.safeWithdrawalRatePercentage || 0;
        const safeWithdrawalRateDivided = opts.safeWithdrawalRatePercentage ? opts.safeWithdrawalRatePercentage / 100 : 0;
        const monthlySafeWithdrawalRateDivided = safeWithdrawalRateDivided / monthsInAYear;
        const safeannualWithdrawal = currentNetWorth * safeWithdrawalRateDivided;
        const safeMonthlyWithdrawal = safeannualWithdrawal / monthsInAYear;
        const investmentStart = opts.investmentStart ? new Date(opts.investmentStart) : new Date();
        const coastFromDate = opts.coastFromDate ? new Date(opts.coastFromDate) : undefined;
        const coastFromDateMonthsInFuture = coastFromDate ? getAbsoluteMonth(coastFromDate) - CURRENT_DATETIME_ABSOLUTE : undefined;
        const monthsUntilRetirement = (opts.retireByAge - opts.currentAge) * monthsInAYear;
        const monthsSinceInvestmentStart = CURRENT_DATETIME_ABSOLUTE - getAbsoluteMonth(investmentStart);
        const annualInterestGrowth = currentNetWorth * annualInterestDivided;
        const monthlyInterestGrowth = annualInterestGrowth / monthsInAYear;
        const fireNumber = (monthlyExpensesAfterTax * monthsInAYear) / safeWithdrawalRateDivided;
        const perHour = (currentNetWorth * annualInterestDivided) / workHoursPerYear;
        const fireMonthsFractional = monthlyExpensesAfterTax ? (currentNetWorth * safeWithdrawalRateDivided) / monthlyExpensesAfterTax : 0;
        const netWorthNeededNowForCoast = Math.ceil(
            getPrincipalNeededForNoContributionFutureValue(fireNumber, monthlyInterestPlusOne, monthsUntilRetirement),
        );
        const minimumMonthlyContributionsNeededToReachFire = Math.max(
            0,
            Math.abs(
                Math.ceil(
                    getMonthlyContributionNeededForFutureValue(fireNumber, currentNetWorth, monthsUntilRetirement, monthlyInterestDivided),
                ),
            ),
        );

        return {
            monthlyContribution: monthlyContribution,
            currentAge: opts.currentAge,
            currency: currency,
            currentNetWorth: currentNetWorth,
            annualInterestPercent: annualInterestPercent,
            annualInterestDivided: annualInterestDivided,
            monthlyInterestDivided: monthlyInterestDivided,
            monthlyInterestPlusOne: monthlyInterestPlusOne,
            monthlyExpensesAfterTax: monthlyExpensesAfterTax,
            annualExpensesAfterTax: annualExpensesAfterTax,
            annualInterestGrowth: annualInterestGrowth,
            monthlyInterestGrowth: monthlyInterestGrowth,
            safeWithdrawalRatePercentage: safeWithdrawalRatePercentage,
            safeWithdrawalRateDivided: safeWithdrawalRateDivided,
            monthlySafeWithdrawalRateDivided: monthlySafeWithdrawalRateDivided,
            safeannualWithdrawal: safeannualWithdrawal,
            safeMonthlyWithdrawal: safeMonthlyWithdrawal,
            showAllMilestones: showAllMilestones,
            investmentStart: investmentStart,
            retireByAge: opts.retireByAge,
            monthsUntilRetirement: monthsUntilRetirement,
            monthsSinceInvestmentStart: monthsSinceInvestmentStart,
            fireNumber: fireNumber,
            perHour: perHour,
            fireMonthsFractional: fireMonthsFractional,
            coastFromDate: coastFromDate,
            coastFromDateMonthsInFuture: coastFromDateMonthsInFuture,
            netWorthNeededNowForCoast: netWorthNeededNowForCoast,
            minimumMonthlyContributionsNeededToReachFire: minimumMonthlyContributionsNeededToReachFire,
        };
    };

    const derivedOptions: DerivedOptions | null = $derived(getDerivedOptions(options));
</script>

{#if derivedOptions}
    <MainPage {derivedOptions} />
{/if}

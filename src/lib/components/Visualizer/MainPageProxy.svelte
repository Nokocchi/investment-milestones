<script lang="ts">
    import { CURRENT_DATETIME, CURRENT_DATETIME_ABSOLUTE, monthsInAYear, workHoursPerYear } from "../../shared/constants";

    import { options } from "../../shared/shared.svelte";
    import type { DerivedOptions, Options } from "../../shared/types";
    import { findMonthlyContribution, getAbsoluteMonth, getPrincipalNeededForNoContributionFutureValue } from "../../shared/utils";
    import MainPage from "./MainPage.svelte";

    const getAsNumber = (input?: string): number => {
        return input ? +input : 0;
    };

    const getDerivedOptions = (opts: Options): DerivedOptions | null => {
        const coastFromDateUnchecked = opts.coastFromDate;
        const currentAgeUnchecked = opts.currentAge;
        const retireByAgeUnchecked = opts.retireByAge;

        if (!currentAgeUnchecked || !retireByAgeUnchecked) {
            return null;
        }

        const retireByAge: number = getAsNumber(retireByAgeUnchecked);
        const currentAge: number = getAsNumber(currentAgeUnchecked);

        const monthsUntilRetirement: number = (retireByAge - currentAge) * monthsInAYear;

        const agesAreOkay = retireByAge > currentAge;

        let coastFromDateOkay = true;
        if (coastFromDateUnchecked) {
            const coastFromDate = new Date(coastFromDateUnchecked);
            coastFromDate.setHours(23, 59, 59); // In case the coast fire date is today. The defaul h/m/s are 00:00:00, which would not pass the check below.
            const chosenCoastDateMonthsInFuture = getAbsoluteMonth(coastFromDate) - CURRENT_DATETIME_ABSOLUTE;
            coastFromDateOkay = (coastFromDate >= CURRENT_DATETIME) && (chosenCoastDateMonthsInFuture <= monthsUntilRetirement);
        }

        if (!coastFromDateOkay || !agesAreOkay) {
            return null;
        }

        const monthlyContribution: number = getAsNumber(opts.monthlyContribution);
        const currency = opts.currency || "";
        const currentNetWorth: number = getAsNumber(opts.currentNetWorth);
        const annualInterestPercent: number = getAsNumber(opts.annualInterestPercent);
        const annualInterestDivided: number = annualInterestPercent / 100;
        const monthlyInterestDivided: number = annualInterestDivided / monthsInAYear;
        const monthlyInterestPlusOne: number = 1 + monthlyInterestDivided;
        const monthlyExpensesAfterTax: number = getAsNumber(opts.monthlyExpensesAfterTax);
        const annualExpensesAfterTax: number = monthlyExpensesAfterTax * monthsInAYear;
        const showAllMilestones: boolean = opts.showAllMilestones || false;
        const safeWithdrawalRatePercentage: number = getAsNumber(opts.safeWithdrawalRatePercentage);
        const safeWithdrawalRateDivided: number = safeWithdrawalRatePercentage / 100;
        const monthlySafeWithdrawalRateDivided: number = safeWithdrawalRateDivided / monthsInAYear;
        const safeannualWithdrawal: number = currentNetWorth * safeWithdrawalRateDivided;
        const safeMonthlyWithdrawal: number = safeannualWithdrawal / monthsInAYear;
        const investmentStart: Date = opts.investmentStart ? new Date(opts.investmentStart) : new Date();
        const coastFromDate: Date | undefined = opts.coastFromDate ? new Date(opts.coastFromDate) : undefined;
        const coastFromDateMonthsInFuture: number | undefined = coastFromDate
            ? getAbsoluteMonth(coastFromDate) - CURRENT_DATETIME_ABSOLUTE
            : undefined;
        const monthsSinceInvestmentStart: number = CURRENT_DATETIME_ABSOLUTE - getAbsoluteMonth(investmentStart);
        const annualInterestGrowth: number = currentNetWorth * annualInterestDivided;
        const monthlyInterestGrowth: number = annualInterestGrowth / monthsInAYear;
        const fireNumber: number = (monthlyExpensesAfterTax * monthsInAYear) / safeWithdrawalRateDivided;
        const perHour: number = (currentNetWorth * annualInterestDivided) / workHoursPerYear;
        const fireMonthsFractional: number = monthlyExpensesAfterTax
            ? (currentNetWorth * safeWithdrawalRateDivided) / monthlyExpensesAfterTax
            : 0;
        const netWorthNeededNowForCoast: number = Math.ceil(
            getPrincipalNeededForNoContributionFutureValue(fireNumber, monthlyInterestPlusOne, monthsUntilRetirement),
        );
        
        const minimumMonthlyContributionsNeededToReachFire: number = Math.max(
            0,
            Math.ceil(
                findMonthlyContribution(
                    currentNetWorth,
                    annualInterestDivided,
                    monthsUntilRetirement,
                    fireNumber,
                    coastFromDateMonthsInFuture,
                ),
            ),
        );

        //console.log("Net worth needed now for coast", netWorthNeededNowForCoast);
        //console.log("Minimum monthly contribution needed to reach fire", minimumMonthlyContributionsNeededToReachFire);

        return {
            monthlyContribution: monthlyContribution,
            currentAge: currentAge,
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
            retireByAge: retireByAge,
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

{#key derivedOptions}
    {#if derivedOptions}
        <MainPage {derivedOptions} />
    {:else}
        Retirement age and current age must be set!
    {/if}
{/key}

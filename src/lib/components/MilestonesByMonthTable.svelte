<script lang="ts">
    import {
        CURRENT_DATETIME,
        CURRENT_MONTH,
        CURRENT_YEAR,
        getMonth,
        monthNames,
        monthsInAYear,
        ReachedState,
        workHoursPerYear,
        type Milestone,
        type MonthData,
        type Options,
        type YearData,
        type YearHeader,
    } from "../shared/constants";
    import {
        milestones_annualGrowth,
        milestones_annualInterest,
        milestones_bigNetWorth,
        milestones_extraMonthsOfInvestment,
        milestones_financiallyIndependentMonths,
        milestones_interestPercentageOfContribution,
        milestones_interestPercentageOfMonthlySpending,
        milestones_monthlyGrowth,
        milestones_monthlyInterest,
        milestones_ownContributionPercentageOfGrowth,
        milestones_perHour,
        milestones_safeMonthlyWithdrawal,
    } from "../shared/milestones";
    import { options } from "../shared/shared.svelte";
    import Year from "../timeline/Year.svelte";
    import PercentCircle from "./PercentCircle.svelte";
    import Stats from "./Stats.svelte";

    let testOptions: Options = $derived({
        monthlyContribution: options.monthlyContribution || 1,
        currentAge: options.currentAge,
        currency: options.currency,
        currentNetWorth: options.currentNetWorth || 0,
        interestPercent: options.interestPercent || 0,
        monthlyExpensesAfterTax: options.monthlyExpensesAfterTax,
        safeWithdrawalRatePercentage: options.safeWithdrawalRatePercentage,
        showAllMilestones: options.showAllMilestones,
        investmentStart: options.investmentStart ? new Date(options.investmentStart) : null,
        retireByAge: options.retireByAge || 0,
    });

    function getNetWorthByMonth(options: Options) {
        let interest = options.interestPercent / 100;
        let monthlyInterest = interest / monthsInAYear;
        let netWorthList = [options.currentNetWorth];
        let numberOfYears = options.retireByAge - options.currentAge;
        for (let i = 0; i < (numberOfYears + 1) * monthsInAYear; i++) {
            let amount = netWorthList[i] * (1 + monthlyInterest) + options.monthlyContribution;
            netWorthList.push(amount);
        }
        return netWorthList;
    }

    const addToMap = (mapToAddTo: Map<number, string[]>, networthNeeded: number, message: string) => {
        if (!mapToAddTo.has(networthNeeded)) {
            mapToAddTo.set(networthNeeded, [message]);
        } else {
            mapToAddTo.get(networthNeeded)?.push(message);
        }
    };

    const generateMilestonesList = (options: Options): Map<number, string[]> => {
        var netWorthMilestoneMap = new Map();
        let interestFraction = options.interestPercent / 100;

        for (let perHour of milestones_perHour) {
            const needed = (perHour * workHoursPerYear) / interestFraction;
            const message = `${perHour} ${options.currency} per hour`;
            addToMap(netWorthMilestoneMap, needed, message);
        }

        for (let annualInterest of milestones_annualInterest) {
            const needed = annualInterest / interestFraction;
            const message = `${annualInterest.toLocaleString()} ${options.currency} annual interest`;
            addToMap(netWorthMilestoneMap, needed, message);
        }

        for (let monthlyInterestMilestone of milestones_monthlyInterest) {
            const needed = (monthlyInterestMilestone * monthsInAYear) / interestFraction;
            const message = `${monthlyInterestMilestone.toLocaleString()} ${options.currency} monthly interest`;
            addToMap(netWorthMilestoneMap, needed, message);
        }

        for (let extraMonthOfInvestment of milestones_extraMonthsOfInvestment) {
            const annualInterestNeeded = extraMonthOfInvestment * options.monthlyContribution;
            const needed = annualInterestNeeded / interestFraction;
            const message = extraMonthOfInvestment + ` extra months of investment per year`;
            addToMap(netWorthMilestoneMap, needed, message);
        }

        for (let monthlyGrowth of milestones_monthlyGrowth(options.monthlyContribution)) {
            const monthlyInterestNeeded = monthlyGrowth - options.monthlyContribution;
            const needed = (monthlyInterestNeeded * monthsInAYear) / interestFraction;
            const message = `${monthlyGrowth.toLocaleString()} ${options.currency} monthly growth`;
            addToMap(netWorthMilestoneMap, needed, message);
        }

        for (let annualGrowth of milestones_annualGrowth) {
            const annualInterestNeeded = annualGrowth - options.monthlyContribution;
            const needed = annualInterestNeeded / interestFraction;
            const message = `${annualGrowth.toLocaleString()} ${options.currency} annual growth`;
            addToMap(netWorthMilestoneMap, needed, message);
        }

        for (let ownContributionPercentage of milestones_ownContributionPercentageOfGrowth) {
            const ownContributionPercentageDivided = ownContributionPercentage / 100;
            const monthlyGrowthNeeded = options.monthlyContribution / ownContributionPercentageDivided;
            const monthlyInterestNeeded = monthlyGrowthNeeded - options.monthlyContribution;
            const needed = (monthlyInterestNeeded * monthsInAYear) / interestFraction;
            const message = `Own contribution is ${ownContributionPercentage}% of monthly growth`;
            addToMap(netWorthMilestoneMap, needed, message);
        }

        for (let interestPercentageOfContribution of milestones_interestPercentageOfContribution) {
            const interestPercentageDivided = interestPercentageOfContribution / 100;
            const monthlyInterestNeeded = interestPercentageDivided * options.monthlyContribution;
            const needed = (monthlyInterestNeeded * monthsInAYear) / interestFraction;
            const message = `Interest is ${interestPercentageOfContribution}% of monthly contribution`;
            addToMap(netWorthMilestoneMap, needed, message);
        }

        for (let bigNetWorth of milestones_bigNetWorth) {
            const message = `` + bigNetWorth.toLocaleString();
            //addToMap(netWorthMilestoneMap, bigNetWorth, message);
        }

        for (let interestPercentageOfMonthlySpending of milestones_interestPercentageOfMonthlySpending) {
            const interestPercentageDivided = interestPercentageOfMonthlySpending / 100;
            const monthlyInterestNeeded = interestPercentageDivided * options.monthlyExpensesAfterTax;
            const needed = (monthlyInterestNeeded * monthsInAYear) / interestFraction;
            const message = `Interest is ${interestPercentageOfMonthlySpending}% of monthly budget`;
            addToMap(netWorthMilestoneMap, needed, message);
        }

        for (let safeMonthlyWithdrawal of milestones_safeMonthlyWithdrawal) {
            const needed = (safeMonthlyWithdrawal * monthsInAYear) / (options.safeWithdrawalRatePercentage / 100);
            const message = `${safeMonthlyWithdrawal.toLocaleString()} ${options.currency} can safely be withdrawn per month`;
            addToMap(netWorthMilestoneMap, needed, message);
        }

        for (let financiallyIndependentMonths of milestones_financiallyIndependentMonths) {
            const needed = (options.monthlyExpensesAfterTax / (options.safeWithdrawalRatePercentage / 100)) * financiallyIndependentMonths;
            const message =
                financiallyIndependentMonths == 12 ? "Financially independent" : `${financiallyIndependentMonths} FIRE months / year`;
            addToMap(netWorthMilestoneMap, needed, message);
        }

        // Is there really not a better way to sort a map by its keys in Javascript?
        return new Map([...netWorthMilestoneMap].sort((a, b) => a[0] - b[0]));
    };

    // Certified mega monster mayhem method :(
    const generateTimelineData = (
        netWorthByMonthListNowAndFuture: number[],
        netWorthMilestoneSortedMap: Map<number, string[]>,
        shouldGenerateData: boolean,
        options: Options,
    ): YearData[] => {
        if (!shouldGenerateData) {
            return [];
        }
        let investmentStartMonth: number | null = options.investmentStart ? getMonth(options.investmentStart) : null;
        let monthsSinceInvestmentStart: number | null = investmentStartMonth ? getMonth(CURRENT_DATETIME) - investmentStartMonth : null;
        let currentNetWorth: number = netWorthByMonthListNowAndFuture[0];

        let yearIndex = 0;

        let timelineData: YearData[] = [];

        for (const [i, networthAtThisMonth] of netWorthByMonthListNowAndFuture.entries()) {
            let networthNextMonth = i >= netWorthByMonthListNowAndFuture.length ? 0 : netWorthByMonthListNowAndFuture[i + 1];
            let yearsAndMonthsUntil = "";
            let reachedPercentage =
                monthsSinceInvestmentStart === null ? null : (monthsSinceInvestmentStart / (monthsSinceInvestmentStart + i)) * 100;

            let monthsInTheFuture = CURRENT_MONTH + i;
            let monthsInTheFutureAdjusted = monthsInTheFuture % 12;
            let monthNumber = CURRENT_MONTH + monthsInTheFutureAdjusted;

            if (yearIndex == 0 && monthsInTheFutureAdjusted == 0) {
                yearsAndMonthsUntil = "Now";
            } else {
                if (yearIndex > 0) {
                    yearsAndMonthsUntil += yearIndex + " years, ";
                }
                yearsAndMonthsUntil += monthsInTheFutureAdjusted + " months";
            }

            let monthReachedState: ReachedState;
            if (networthAtThisMonth <= currentNetWorth) {
                if (netWorthByMonthListNowAndFuture[i + 1] > currentNetWorth) {
                    monthReachedState = ReachedState.HERE;
                } else {
                    monthReachedState = ReachedState.REACHED;
                }
            } else {
                monthReachedState = ReachedState.IN_FUTURE;
            }

            let milestones: Milestone[] = [];
            for (const [neededNetworth, milestoneMessages] of [...netWorthMilestoneSortedMap.entries()]) {
                if (neededNetworth > networthAtThisMonth) {
                    break;
                }

                for (const milestoneMessage of milestoneMessages) {
                    let milestone: Milestone = {
                        neededNetWorth: neededNetworth,
                        message: milestoneMessage,
                    };
                    milestones.push(milestone);
                    netWorthMilestoneSortedMap.delete(neededNetworth);
                }
            }

            let monthData: MonthData = {
                estimatedNetWorth: networthAtThisMonth,
                monthName: monthNames[monthNumber],
                milestones: milestones,
                monthlyGrowth: Math.max(0, networthNextMonth - networthAtThisMonth - options.monthlyContribution),
                reachedState: monthReachedState,
                yearsAndMonthsUntil: yearsAndMonthsUntil,
                percentageOfReachingThis: reachedPercentage,
            };

            // It's either the first month at all, or January. Add a new year
            if (i == 0 || monthNumber == 0) {
                let year = CURRENT_YEAR + yearIndex;

                const yearReachedState = year <= CURRENT_YEAR ? ReachedState.REACHED : ReachedState.IN_FUTURE;

                let yearHeader: YearHeader = {
                    year: year,
                    age: options.currentAge + yearIndex,
                    reachedState: yearReachedState,
                };

                let yearData = {
                    yearHeader: yearHeader,
                    monthData: [monthData],
                };
                timelineData[yearIndex] = yearData;
            } else {
                timelineData[yearIndex].monthData.push(monthData);
            }

            // Finished December, increasing year index
            if (monthNumber == 11) {
                yearIndex++;
            }
        }

        return timelineData;
    };

    let shouldGenerateData = $derived(
        testOptions.currentNetWorth >= 0 &&
            testOptions.interestPercent >= 0 &&
            testOptions.monthlyContribution >= 0 &&
            testOptions.retireByAge >= testOptions.currentAge,
    );
    let netWorthByMonthListNowAndFuture: number[] = $derived(getNetWorthByMonth(testOptions));

    let netWorthMilestoneSortedMap: Map<number, string[]> = $derived(generateMilestonesList(testOptions));
    let timelineData: YearData[] = $derived(
        generateTimelineData(netWorthByMonthListNowAndFuture, netWorthMilestoneSortedMap, shouldGenerateData, testOptions),
    );
</script>

<Stats options={testOptions} {netWorthByMonthListNowAndFuture} />
{#key timelineData}
    {#each timelineData as yearData}
        <Year {yearData} />
    {/each}
{/key}

<style>
</style>

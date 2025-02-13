<script lang="ts">
    import {
        CURRENT_DATETIME,
        CURRENT_MONTH,
        CURRENT_YEAR,
        monthNames,
        monthsInAYear,
        ReachedState,
        workHoursPerYear,
    } from "../../shared/constants";
    import {
        milestones_annualGrowth,
        milestones_annualInterest,
        milestones_bigNetWorth,
        milestones_extraMonthsOfInvestmentGenerator,
        milestones_financiallyIndependentMonthsGenerator,
        milestones_interestPercentageOfContributionGenerator,
        milestones_interestPercentageOfMonthlySpendingGenerator,
        milestones_monthlyGrowthGenerator,
        milestones_monthlyInterest,
        milestones_ownContributionPercentageOfGrowthGenerator,
        milestones_perHourGenerator,
        milestones_safeMonthlyWithdrawal,
    } from "../../shared/milestones";
    import type { DerivedOptions, Milestone, MonthData, YearData, YearHeader } from "../../shared/types";
    import { getAbsoluteMonth, getMonthsAsYearMonthString, getNoContributionFinalAmount, range } from "../../shared/utils";
    import Year from "./timeline/Year.svelte";
    import Stats from "../Stats/Stats.svelte";

    let screenWidth: number = $state(0);

    function getNetWorthByMonth(options: DerivedOptions) {
        const netWorthList = [options.currentNetWorth];
        const numberOfYears = options.retireByAge - options.currentAge;
        const coastFromDateMonthsInFuture = options.coastFromDate
            ? getAbsoluteMonth(options.coastFromDate) - getAbsoluteMonth(CURRENT_DATETIME)
            : null;

        for (let i = 0; i < numberOfYears * monthsInAYear; i++) {
            const monthlyContribution =
                coastFromDateMonthsInFuture != null && coastFromDateMonthsInFuture <= i ? 0 : options.monthlyContribution;
            const amount = (netWorthList[i] + monthlyContribution) * (1 + options.monthlyInterestDivided);
            netWorthList.push(amount);
        }
        return netWorthList;
    }

    const addToMap = (mapToAddTo: Map<number, string[]>, networthNeeded: number, message: string, cutoff: number) => {
        if (networthNeeded == 0 || networthNeeded < cutoff) {
            return;
        }

        if (!mapToAddTo.has(networthNeeded)) {
            mapToAddTo.set(networthNeeded, [message]);
        } else {
            mapToAddTo.get(networthNeeded)?.push(message);
        }
    };

    const generateMilestonesList = (
        options: DerivedOptions,
        netWorthByMonthListNowAndFuture: number[],
        fireMonthsInFuture: number | null,
        coastFireReachedMonthsInFuture: number | null,
    ): Map<number, string[]> => {
        var netWorthMilestoneMap = new Map();

        const simulatedPreviousMonth = (options.currentNetWorth - options.monthlyContribution) / (1 + options.monthlyInterestDivided);
        const cutoffForMilestonesMonth0 = Math.max(0, simulatedPreviousMonth);

        for (let perHour of milestones_perHourGenerator()) {
            const needed = (perHour * workHoursPerYear) / options.annualInterestDivided;
            const message = `${perHour} ${options.currency} per hour`;
            addToMap(netWorthMilestoneMap, needed, message, cutoffForMilestonesMonth0);
        }

        for (let annualInterest of milestones_annualInterest) {
            const needed = annualInterest / options.annualInterestDivided;
            const message = `${annualInterest.toLocaleString()} ${options.currency} annual interest`;
            addToMap(netWorthMilestoneMap, needed, message, cutoffForMilestonesMonth0);
        }

        for (let monthlyInterestMilestone of milestones_monthlyInterest) {
            const needed = monthlyInterestMilestone / options.monthlyInterestDivided;
            const message = `${monthlyInterestMilestone.toLocaleString()} ${options.currency} monthly interest`;
            addToMap(netWorthMilestoneMap, needed, message, cutoffForMilestonesMonth0);
        }

        for (let extraMonthOfInvestment of milestones_extraMonthsOfInvestmentGenerator()) {
            const annualInterestNeeded = extraMonthOfInvestment * options.monthlyContribution;
            const needed = annualInterestNeeded / options.annualInterestDivided;
            const message = extraMonthOfInvestment + ` extra months of investment per year`;
            addToMap(netWorthMilestoneMap, needed, message, cutoffForMilestonesMonth0);
        }

        // TODO: Becomes horribly slow if you put in huge monthly contribution numbers. But who does that anyway? I can't really limit this to an absolute number because currencies have different values.
        for (let monthlyGrowth of milestones_monthlyGrowthGenerator(options.monthlyContribution)) {
            const monthlyInterestNeeded = monthlyGrowth - options.monthlyContribution;
            const needed = monthlyInterestNeeded / options.monthlyInterestDivided;
            const message = `${monthlyGrowth.toLocaleString()} ${options.currency} monthly growth`;
            addToMap(netWorthMilestoneMap, needed, message, cutoffForMilestonesMonth0);
        }

        for (let annualGrowth of milestones_annualGrowth) {
            const annualInterestNeeded = annualGrowth - options.monthlyContribution;
            const needed = annualInterestNeeded / options.annualInterestDivided;
            const message = `${annualGrowth.toLocaleString()} ${options.currency} annual growth`;
            addToMap(netWorthMilestoneMap, needed, message, cutoffForMilestonesMonth0);
        }

        for (let ownContributionPercentage of milestones_ownContributionPercentageOfGrowthGenerator()) {
            const ownContributionPercentageDivided = ownContributionPercentage / 100;
            const monthlyGrowthNeeded = options.monthlyContribution / ownContributionPercentageDivided;
            const monthlyInterestNeeded = monthlyGrowthNeeded - options.monthlyContribution;
            const needed = monthlyInterestNeeded / options.monthlyInterestDivided;
            const message = `Own contribution is ${ownContributionPercentage}% of monthly growth`;
            addToMap(netWorthMilestoneMap, needed, message, cutoffForMilestonesMonth0);
        }

        for (let interestPercentageOfContribution of milestones_interestPercentageOfContributionGenerator()) {
            const interestPercentageDivided = interestPercentageOfContribution / 100;
            const monthlyInterestNeeded = interestPercentageDivided * options.monthlyContribution;
            const needed = monthlyInterestNeeded / options.monthlyInterestDivided;
            const message = `Interest is ${interestPercentageOfContribution}% of monthly contribution`;
            addToMap(netWorthMilestoneMap, needed, message, cutoffForMilestonesMonth0);
        }

        for (let bigNetWorth of milestones_bigNetWorth) {
            const message = `` + bigNetWorth.toLocaleString();
            //addToMap(netWorthMilestoneMap, bigNetWorth, message);
        }

        for (let interestPercentageOfMonthlySpending of milestones_interestPercentageOfMonthlySpendingGenerator()) {
            const interestPercentageDivided = interestPercentageOfMonthlySpending / 100;
            const monthlyInterestNeeded = interestPercentageDivided * options.monthlyExpensesAfterTax;
            const needed = monthlyInterestNeeded / options.monthlyInterestDivided;
            const message = `Monthly interest is ${interestPercentageOfMonthlySpending}% of monthly budget`;
            addToMap(netWorthMilestoneMap, needed, message, cutoffForMilestonesMonth0);
        }

        for (let safeMonthlyWithdrawal of milestones_safeMonthlyWithdrawal) {
            const needed = safeMonthlyWithdrawal / options.monthlySafeWithdrawalRateDivided;
            const message = `${safeMonthlyWithdrawal.toLocaleString()} ${options.currency} can safely be withdrawn per month`;
            addToMap(netWorthMilestoneMap, needed, message, cutoffForMilestonesMonth0);
        }

        for (let financiallyIndependentMonths of milestones_financiallyIndependentMonthsGenerator()) {
            const needed = (options.monthlyExpensesAfterTax * financiallyIndependentMonths) / options.safeWithdrawalRateDivided;
            const message =
                financiallyIndependentMonths == 12 ? "Financially independent" : `${financiallyIndependentMonths} FIRE months / year`;
            addToMap(netWorthMilestoneMap, needed, message, cutoffForMilestonesMonth0);
        }

        const investedMonthsSoFar = options.monthsSinceInvestmentStart;
        if (investedMonthsSoFar) {
            if (fireMonthsInFuture) {
                const totalMonthsToFire = investedMonthsSoFar + fireMonthsInFuture;
                for (const percent of range(10, 100, 10, true)) {
                    const firePercentageTotalMonths = Math.ceil(totalMonthsToFire * (percent / 100));
                    const firePercentageMonthsInFuture = firePercentageTotalMonths - investedMonthsSoFar;
                    if (firePercentageMonthsInFuture > 0) {
                        // Your fire number can be calculated accurately, and is usually a round number. Make this milestone look nicer
                        if (percent == 100) {
                            addToMap(netWorthMilestoneMap, options.fireNumber, `${percent}% of FIRE`, cutoffForMilestonesMonth0);
                        } else {
                            addToMap(
                                netWorthMilestoneMap,
                                netWorthByMonthListNowAndFuture[firePercentageMonthsInFuture],
                                `${percent}% of FIRE`,
                                cutoffForMilestonesMonth0,
                            );
                        }
                    }
                }

                for (let i = 1; fireMonthsInFuture - i * monthsInAYear > 0; i++) {
                    const month = fireMonthsInFuture - i * monthsInAYear;
                    addToMap(netWorthMilestoneMap, netWorthByMonthListNowAndFuture[month], `${i} years to FIRE`, cutoffForMilestonesMonth0);
                }
            }
            if (coastFireReachedMonthsInFuture) {
                const totalMonthsToCoastFire = investedMonthsSoFar + coastFireReachedMonthsInFuture;

                for (const percent of range(10, 100, 10, true)) {
                    const coastFirePercentageTotalMonths = Math.ceil(totalMonthsToCoastFire * (percent / 100));
                    const coastFirePercentageMonthsInFuture = coastFirePercentageTotalMonths - investedMonthsSoFar;
                    if (coastFirePercentageMonthsInFuture > 0) {
                        addToMap(
                            netWorthMilestoneMap,
                            netWorthByMonthListNowAndFuture[coastFirePercentageMonthsInFuture],
                            `${percent}% of coast FIRE`,
                            cutoffForMilestonesMonth0,
                        );
                    }
                }

                for (let i = 1; coastFireReachedMonthsInFuture - i * monthsInAYear > 0; i++) {
                    const month = coastFireReachedMonthsInFuture - i * monthsInAYear;
                    addToMap(
                        netWorthMilestoneMap,
                        netWorthByMonthListNowAndFuture[month],
                        `${i} years to Coast FIRE`,
                        cutoffForMilestonesMonth0,
                    );
                }
            }
        }

        // Is there really not a better way to sort a map by its keys in Javascript?
        return new Map([...netWorthMilestoneMap].sort((a, b) => a[0] - b[0]));
    };

    // Certified mega monster mayhem method :(
    const generateTimelineData = (
        netWorthByMonthListNowAndFuture: number[],
        netWorthMilestoneSortedMap: Map<number, string[]>,
        options: DerivedOptions,
        fireMonthsInFuture: number | null,
        coastFireReachedMonthsInFuture: number | null,
    ): YearData[] => {
        let currentNetWorth: number = netWorthByMonthListNowAndFuture[0];
        let yearIndex = 0;
        let timelineData: YearData[] = [];

        for (const [i, networthAtThisMonth] of netWorthByMonthListNowAndFuture.entries()) {
            let networthNextMonth = i + 1 >= netWorthByMonthListNowAndFuture.length ? 0 : netWorthByMonthListNowAndFuture[i + 1];
       
            let reachedPercentage = options.monthsSinceInvestmentStart
                ? Math.min(100, (options.monthsSinceInvestmentStart / (options.monthsSinceInvestmentStart + i)) * 100)
                : null;

            let percentageTowardsFire =
                fireMonthsInFuture !== null && options.monthsSinceInvestmentStart
                    ? Math.min(
                          100,
                          ((options.monthsSinceInvestmentStart + i) / (options.monthsSinceInvestmentStart + fireMonthsInFuture)) * 100,
                      )
                    : null;

            let percentageTowardsCoastFire =
                coastFireReachedMonthsInFuture !== null && options.monthsSinceInvestmentStart
                    ? Math.min(
                          100,
                          ((options.monthsSinceInvestmentStart + i) /
                              (options.monthsSinceInvestmentStart + coastFireReachedMonthsInFuture)) *
                              100,
                      )
                    : null;

            let calendarMonth = (CURRENT_MONTH + i) % monthsInAYear;

            const timeUntilStringShort = getMonthsAsYearMonthString(i, "HERE", "", true, "\n");
            const timeUntilStringLong = getMonthsAsYearMonthString(i, "HERE", "", false, "\n");

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

            const coastFromDateMonthsInFuture = options.coastFromDate
                ? getAbsoluteMonth(options.coastFromDate) - getAbsoluteMonth(CURRENT_DATETIME)
                : null;
            const coasting = coastFromDateMonthsInFuture !== null && coastFromDateMonthsInFuture <= i;
            const monthlyContribution = coasting ? 0 : options.monthlyContribution;
            let monthData: MonthData = {
                estimatedNetWorth: networthAtThisMonth,
                monthName: monthNames[calendarMonth],
                milestones: milestones,
                monthlyGrowth: Math.max(0, networthNextMonth - networthAtThisMonth - monthlyContribution),
                reachedState: monthReachedState,
                timeUntilStringShort: timeUntilStringShort,
                timeUntilStringLong: timeUntilStringLong,
                percentageOfReachingThis: reachedPercentage,
                percentageTowardsFire: percentageTowardsFire,
                percentageTowardsCoastFire: percentageTowardsCoastFire,
                coasting: coasting,
            };

            // It's either the first month at all, or January. Add a new year
            if (i == 0 || calendarMonth == 0) {
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
            if (calendarMonth == 11) {
                yearIndex++;
            }
        }

        return timelineData;
    };

    const fireHowManyMonthsInFuture = (netWorthByMonthList: number[], fireNumber: number): number | null => {
        for (const [i, networthAtThisMonth] of netWorthByMonthList.entries()) {
            if (fireNumber < networthAtThisMonth) {
                return i;
            }
        }
        return null;
    };

    const getCoastFireReachedMonthsInFuture = (options: DerivedOptions, netWorthByMonth: number[]): number | null => {
        for (const [i, networthAtThisMonth] of netWorthByMonth.entries()) {
            const monthsLeft = netWorthByMonth.length - (i + 1); // TODO: I added +1 here so that the coast fire date works. Is this correct?
            const noContributionsFinalAmount = getNoContributionFinalAmount(
                networthAtThisMonth,
                options.monthlyInterestPlusOne,
                monthsLeft,
            );
            if (noContributionsFinalAmount > options.fireNumber) {
                return i;
            }
        }
        return null;
    };

    const { derivedOptions }: { derivedOptions: DerivedOptions } = $props();

    const netWorthByMonthListNowAndFuture: number[] = getNetWorthByMonth(derivedOptions);
    const fireMonthsInFuture: number | null = fireHowManyMonthsInFuture(netWorthByMonthListNowAndFuture, derivedOptions.fireNumber);
    const coastFireReachedMonthsInFuture: number | null =
        derivedOptions.coastFromDateMonthsInFuture ?? getCoastFireReachedMonthsInFuture(derivedOptions, netWorthByMonthListNowAndFuture);
    const netWorthMilestoneSortedMap: Map<number, string[]> = generateMilestonesList(
        derivedOptions,
        netWorthByMonthListNowAndFuture,
        fireMonthsInFuture,
        coastFireReachedMonthsInFuture,
    );
    const timelineData: YearData[] = generateTimelineData(
        netWorthByMonthListNowAndFuture,
        netWorthMilestoneSortedMap,
        derivedOptions,
        fireMonthsInFuture,
        coastFireReachedMonthsInFuture,
    );

    //console.log("Fire months in future", fireMonthsInFuture);
    //console.log("Coast fire months in future", coastFireReachedMonthsInFuture);
</script>

<svelte:window bind:outerWidth={screenWidth} />
<Stats {derivedOptions} {netWorthByMonthListNowAndFuture} {fireMonthsInFuture} {coastFireReachedMonthsInFuture} />
<div class="row">
    <p>🎯: How close are you to reaching this amount</p> 
    <p>🏄: How close is this month to Coast FIRE</p> 
    <p>🔥: How close is this month to FIRE</p> 
</div>
{#key timelineData}
    {#each timelineData as yearData}
        <Year {yearData} />
    {/each}
{/key}

<style>
    .row {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }
</style>

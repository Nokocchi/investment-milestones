<script lang="ts">
    import {
        CURRENT_MONTH,
        CURRENT_YEAR,
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

    let testOptions: Options = $derived({
        monthlyContribution: options.monthlyContribution || 1,
        currentAge: options.currentAge,
        currency: options.currency,
        currentNetWorth: options.currentNetWorth || 0,
        interestPercent: options.interestPercent || 0,
        numberOfYears: options.numberOfYears || 0,
        monthlyExpensesAfterTax: options.monthlyExpensesAfterTax,
        safeWithdrawalRatePercentage: options.safeWithdrawalRatePercentage,
        showAllMilestones: options.showAllMilestones,
        simulatePastData: options.simulatePastData
    });

    function getNetWorthByMonth(options: Options) {
        let interest = options.interestPercent / 100;
        let monthlyInterest = interest / monthsInAYear;
        let netWorthList = [options.currentNetWorth];
        for (let i = 0; i < (options.numberOfYears + 1) * monthsInAYear; i++) {
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

    const getNetWorthByMonthInPast = (options: Options): number[] => {
        if  (!options.simulatePastData){
            return [];
        }

        let pastNetWorthList: number[] = [];
        let monthlyInterest = options.interestPercent / 100 / monthsInAYear;

        if (options.currentNetWorth == 0) {
            return pastNetWorthList;
        }

        let nw = options.currentNetWorth;
        while (nw > 0) {
            let pastNetWorth = (nw - options.monthlyContribution) / (1 + monthlyInterest);
            if (pastNetWorth < 0) {
                pastNetWorth = 0;
            }
            nw = pastNetWorth;
            pastNetWorthList.push(pastNetWorth);
        }

        return pastNetWorthList.reverse();
    };

    const generateMilestonesList = (options: Options): Map<number, string[]> => {
        var netWorthMilestoneMap = new Map();
        let interestFraction = options.interestPercent / 100;

        for (let perHour of milestones_perHour) {
            const needed = (perHour * workHoursPerYear) / interestFraction;
            const message = perHour + " per hour";
            addToMap(netWorthMilestoneMap, needed, message);
        }

        for (let annualInterest of milestones_annualInterest) {
            const needed = annualInterest / interestFraction;
            const message = annualInterest.toLocaleString() + " annual interest";
            addToMap(netWorthMilestoneMap, needed, message);
        }

        for (let monthlyInterestMilestone of milestones_monthlyInterest) {
            const needed = (monthlyInterestMilestone * monthsInAYear) / interestFraction;
            const message = monthlyInterestMilestone.toLocaleString() + " monthly interest";
            addToMap(netWorthMilestoneMap, needed, message);
        }

        for (let extraMonthOfInvestment of milestones_extraMonthsOfInvestment) {
            const annualInterestNeeded = extraMonthOfInvestment * options.monthlyContribution;
            const needed = annualInterestNeeded / interestFraction;
            const message = extraMonthOfInvestment + " extra months of investment per year";
            addToMap(netWorthMilestoneMap, needed, message);
        }

        for (let monthlyGrowth of milestones_monthlyGrowth(options.monthlyContribution)) {
            const monthlyInterestNeeded = monthlyGrowth - options.monthlyContribution;
            const needed = (monthlyInterestNeeded * monthsInAYear) / interestFraction;
            const message = monthlyGrowth.toLocaleString() + " monthly growth";
            addToMap(netWorthMilestoneMap, needed, message);
        }

        for (let annualGrowth of milestones_annualGrowth) {
            const annualInterestNeeded = annualGrowth - options.monthlyContribution;
            const needed = annualInterestNeeded / interestFraction;
            const message = annualGrowth.toLocaleString() + "annual growth";
            addToMap(netWorthMilestoneMap, needed, message);
        }

        for (let ownContributionPercentage of milestones_ownContributionPercentageOfGrowth) {
            const ownContributionPercentageDivided = ownContributionPercentage / 100;
            const monthlyGrowthNeeded = options.monthlyContribution / ownContributionPercentageDivided;
            const monthlyInterestNeeded = monthlyGrowthNeeded - options.monthlyContribution;
            const needed = (monthlyInterestNeeded * monthsInAYear) / interestFraction;
            const message = "Own contribution is " + ownContributionPercentage + "% of monthly growth";
            addToMap(netWorthMilestoneMap, needed, message);
        }

        for (let interestPercentageOfContribution of milestones_interestPercentageOfContribution) {
            const interestPercentageDivided = interestPercentageOfContribution / 100;
            const monthlyInterestNeeded = interestPercentageDivided * options.monthlyContribution;
            const needed = (monthlyInterestNeeded * monthsInAYear) / interestFraction;
            const message = "Interest is " + interestPercentageOfContribution + "% of monthly contribution";
            addToMap(netWorthMilestoneMap, needed, message);
        }

        for (let bigNetWorth of milestones_bigNetWorth) {
            const message = "" + bigNetWorth.toLocaleString();
            //addToMap(netWorthMilestoneMap, bigNetWorth, message);
        }

        for (let interestPercentageOfMonthlySpending of milestones_interestPercentageOfMonthlySpending) {
            const interestPercentageDivided = interestPercentageOfMonthlySpending / 100;
            const monthlyInterestNeeded = interestPercentageDivided * options.monthlyExpensesAfterTax;
            const needed = (monthlyInterestNeeded * monthsInAYear) / interestFraction;
            const message = "Interest is " + interestPercentageOfMonthlySpending + "% of monthly budget";
            addToMap(netWorthMilestoneMap, needed, message);
        }

        for (let safeMonthlyWithdrawal of milestones_safeMonthlyWithdrawal) {
            const needed = (safeMonthlyWithdrawal * monthsInAYear) / (options.safeWithdrawalRatePercentage / 100);
            const message = safeMonthlyWithdrawal.toLocaleString() + " can safely be withdrawn per month";
            addToMap(netWorthMilestoneMap, needed, message);
        }

        // Is there really not a better way to sort a map by its keys in Javascript?
        return new Map([...netWorthMilestoneMap].sort((a, b) => a[0] - b[0]));
    };

    // Certified mega monster mayhem method :(
    const generateTimelineData = (
        netWorthByMonthListInPast: number[],
        netWorthByMonthListNowAndFuture: number[],
        netWorthMilestoneSortedMap: Map<number, string[]>,
        shouldGenerateData: boolean
    ): YearData[] => {
        if(!shouldGenerateData){
            return [];
        }
        let currentNetWorth: number = netWorthByMonthListNowAndFuture[0];
        let netWorthByMonthListTotal: number[] = netWorthByMonthListInPast.concat(netWorthByMonthListNowAndFuture);
        const currentMonthIndex = netWorthByMonthListInPast.length;

        let yearIndex = 0;
        const numOfYearsAgoDataStarts = 0 - Math.ceil(currentMonthIndex / monthsInAYear);

        let timelineData: YearData[] = [];

        for (const [i, networthAtThisMonth] of netWorthByMonthListTotal.entries()) {
            let networthNextMonth = i >= netWorthByMonthListTotal.length ? 0 : netWorthByMonthListTotal[i + 1];
            let monthNumber;
            let yearsAndMonthsUntil = "";

            if (i < currentMonthIndex) {
                let monthsAgo = currentMonthIndex - i;
                let monthsAgoAdjusted = monthsAgo % 12;
                // Going 9 months back is the same as going 12 - 9 months forward.
                monthNumber = CURRENT_MONTH + ((monthsInAYear - monthsAgoAdjusted) % monthsInAYear);
            } else {
                let monthsInTheFuture = CURRENT_MONTH + (i - currentMonthIndex);
                let monthsInTheFutureAdjusted = monthsInTheFuture % 12;
                monthNumber = CURRENT_MONTH + monthsInTheFutureAdjusted;
                let yearsInTheFuture = Math.floor(monthsInTheFuture / monthsInAYear);

                if (i > currentMonthIndex) {
                    if (yearsInTheFuture > 0) {
                        yearsAndMonthsUntil += yearsInTheFuture + " years, ";
                    }
                    yearsAndMonthsUntil += monthsInTheFutureAdjusted + " months";
                }
            }

            let monthReachedState: ReachedState;
            if (networthAtThisMonth <= currentNetWorth) {
                if (netWorthByMonthListTotal[i + 1] > currentNetWorth) {
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
                percentageOfReachingThis: Math.min(100, (currentMonthIndex / i) * 100),
            };

            // It's either the first month at all, or January. Add a new year
            if (i == 0 || monthNumber == 0) {
                const yearOffset = numOfYearsAgoDataStarts + yearIndex;
                let year = CURRENT_YEAR + yearOffset;

                const yearReachedState = year <= CURRENT_YEAR ? ReachedState.REACHED : ReachedState.IN_FUTURE;

                let yearHeader: YearHeader = {
                    year: year,
                    age: options.currentAge + yearOffset,
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

    let shouldGenerateData = $derived(testOptions.currentNetWorth >= 0 && testOptions.interestPercent >= 0 && testOptions.monthlyContribution >= 0 && testOptions.numberOfYears >= 0);
    let netWorthByMonthListInPast: number[] = $derived(getNetWorthByMonthInPast(testOptions));
    let netWorthByMonthListNowAndFuture: number[] = $derived(getNetWorthByMonth(testOptions));

    let netWorthMilestoneSortedMap: Map<number, string[]> = $derived(generateMilestonesList(testOptions));

    let timelineData: YearData[] = $derived(
        generateTimelineData(netWorthByMonthListInPast, netWorthByMonthListNowAndFuture, netWorthMilestoneSortedMap, shouldGenerateData),
    );
</script>

{#key timelineData}
    <div class="page-container">
        {#each timelineData as yearData}
            <Year {yearData} />
        {/each}
    </div>
{/key}

<style>
</style>

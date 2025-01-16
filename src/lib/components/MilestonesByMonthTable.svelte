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
    import Month from "../timeline/Month.svelte";
    import Year from "../timeline/Year.svelte";

    function getNetWorthByMonth(principal: number, interest: number, numberOfYears: number, mc: number) {
        mc = +mc;
        let monthlyInterest = interest / monthsInAYear;
        let netWorthList = [principal];
        for (let i = 0; i < (numberOfYears + 1) * monthsInAYear; i++) {
            let amount = netWorthList[i] * (1 + monthlyInterest) + mc;
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

    const getNetWorthByMonthInPast = (currentNetWorth: number, interest: number, monthlyContribution: number): number[] => {
        let pastNetWorthList: number[] = [];
        let monthlyInterest = interest / monthsInAYear;

        if (currentNetWorth == 0) {
            return pastNetWorthList;
        }

        let nw = currentNetWorth;
        while (nw > 0) {
            let pastNetWorth = (nw - monthlyContribution) / (1 + monthlyInterest);
            if (pastNetWorth < 0) {
                pastNetWorth = 0;
            }
            nw = pastNetWorth;
            pastNetWorthList.push(pastNetWorth);
        }

        return pastNetWorthList.reverse();
    };

    const generateMilestonesList = (monthlyContribution: number, interestFraction: number): Map<number, string[]> => {
        monthlyContribution = +monthlyContribution;
        var netWorthMilestoneMap = new Map();

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
            const annualInterestNeeded = extraMonthOfInvestment * monthlyContribution;
            const needed = annualInterestNeeded / interestFraction;
            const message = extraMonthOfInvestment + " extra months of investment per year";
            addToMap(netWorthMilestoneMap, needed, message);
        }

        for (let monthlyGrowth of milestones_monthlyGrowth(options.monthlyContribution)) {
            const monthlyInterestNeeded = monthlyGrowth - monthlyContribution;
            const needed = (monthlyInterestNeeded * monthsInAYear) / interestFraction;
            const message = monthlyGrowth.toLocaleString() + " monthly growth";
            addToMap(netWorthMilestoneMap, needed, message);
        }

        for (let annualGrowth of milestones_annualGrowth) {
            const annualInterestNeeded = annualGrowth - monthlyContribution;
            const needed = annualInterestNeeded / interestFraction;
            const message = annualGrowth.toLocaleString() + "annual growth";
            addToMap(netWorthMilestoneMap, needed, message);
        }

        for (let ownContributionPercentage of milestones_ownContributionPercentageOfGrowth) {
            const ownContributionPercentageDivided = ownContributionPercentage / 100;
            const monthlyGrowthNeeded = monthlyContribution / ownContributionPercentageDivided;
            const monthlyInterestNeeded = monthlyGrowthNeeded - monthlyContribution;
            const needed = (monthlyInterestNeeded * monthsInAYear) / interestFraction;
            const message = "Own contribution is " + ownContributionPercentage + "% of monthly growth";
            addToMap(netWorthMilestoneMap, needed, message);
        }

        for (let interestPercentageOfContribution of milestones_interestPercentageOfContribution) {
            const interestPercentageDivided = interestPercentageOfContribution / 100;
            const monthlyInterestNeeded = interestPercentageDivided * monthlyContribution;
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
    ): YearData[] => {
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
                monthlyGrowth: Math.max(0, (networthNextMonth - networthAtThisMonth) - options.monthlyContribution),
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

    let netWorthByMonthListInPast: number[] = $derived(
        getNetWorthByMonthInPast(options.currentNetWorth, options.interestPercent / 100, options.monthlyContribution),
    );
    let netWorthByMonthListNowAndFuture: number[] = $derived(
        getNetWorthByMonth(options.currentNetWorth, options.interestPercent / 100, options.numberOfYears, options.monthlyContribution),
    );

    let netWorthMilestoneSortedMap: Map<number, string[]> = $derived(
        generateMilestonesList(options.monthlyContribution, options.interestPercent / 100),
    );

    let timelineData: YearData[] = $derived(
        generateTimelineData(netWorthByMonthListInPast, netWorthByMonthListNowAndFuture, netWorthMilestoneSortedMap),
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

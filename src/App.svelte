<script lang="ts">
  import {
    CURRENT_MONTH,
    CURRENT_YEAR,
    monthNames,
    monthsInAYear,
    ReachedState,
    type Milestone,
    type MonthData,
    type YearData,
    type YearHeader,
  } from "./lib/constants";
  import MilestonesByMonthTable from "./lib/MilestonesByMonthTable.svelte";

  let headers = [
    "NET WORTH",
    "PER_HOUR",
    "ANNUAL_INTEREST",
    "MONTHLY_INTEREST",
    "EXTRA_MONTHS_OF_INVESTMENT",
    "MONTHLY_GROWTH",
    "ANNUAL_GROWTH",
    "OWN_CONTRIBUTION_PERCENTAGE_OF_GROWTH",
    "INTEREST_PERCENTAGE_OF_CONTRIBUTION",
    "INTEREST_PERCENTAGE_OF_MONTHLY_SPENDING",
    "SAFE_MONTHLY_WITHDRAWAL",
  ];

  enum MilestoneType {
    PER_HOUR,
    ANNUAL_INTEREST,
    MONTHLY_INTEREST,
    EXTRA_MONTHS_OF_INVESTMENT,
    MONTHLY_GROWTH,
    ANNUAL_GROWTH,
    OWN_CONTRIBUTION_PERCENTAGE_OF_GROWTH,
    INTEREST_PERCENTAGE_OF_CONTRIBUTION,
    BIG_NET_WORTH,
    INTEREST_PERCENTAGE_OF_MONTHLY_SPENDING,
    SAFE_MONTHLY_WITHDRAWAL,
  }

  let toggle = $state(false);
  const workHoursPerYear = 46 * 40; // 46 work weeeks, 40 hours per week
  let monthlyContribution: number = $state(16000);
  let currentAge: number = $state(28);
  let currency = $state("SEK");
  let currentNetWorth = $state(448000);
  let interestPercent = $state(7);
  let interest = $derived(interestPercent / 100);
  let numberOfYears = $state(30);
  let annualContribution = $derived(monthlyContribution * monthsInAYear);
  let monthlyExpensesAfterTax = $state(28000);
  let safeWithdrawalRatePercentage = $state(4);
  let safeWithdrawalRate = $derived(safeWithdrawalRatePercentage / 100);

  function* range(start: number, stop: number, step: number = 1) {
    if (stop == null) {
      // one param defined
      stop = start;
      start = 0;
    }

    for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
      yield i;
    }
  }

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

  const milestones_perHour = range(5, 205, 5);
  const milestones_annualInterest = [
    5000, 10000, 20000, 25000, 30000, 40000, 50000, 60000, 70000, 75000, 80000, 90000, 100000, 110000, 120000, 125000, 130000, 140000,
    150000, 160000, 170000, 175000, 180000, 190000, 200000, 210000, 220000, 225000, 230000, 240000, 250000, 260000, 270000, 275000, 280000,
    290000, 300000, 310000, 320000, 325000, 330000, 340000, 350000, 360000, 370000, 375000, 380000, 390000, 400000, 410000, 420000, 425000,
    430000, 440000, 450000, 460000, 470000, 475000, 480000, 490000, 500000,
  ];
  const milestones_monthlyInterest = [
    100, 200, 250, 300, 400, 500, 600, 700, 750, 800, 900, 1000, 1250, 1500, 1750, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 6000, 7000,
    8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000, 19000, 20000, 21000, 22000, 23000, 24000, 25000, 26000,
    27000, 28000, 29000, 30000, 31000, 32000, 33000, 34000, 35000, 36000, 37000, 38000, 39000, 40000,
  ];
  const milestones_extraMonthsOfInvestment = range(1, 37);
  const milestones_monthlyGrowth = $derived(range(monthlyContribution, 4 * monthlyContribution, 5000));
  const milestones_annualGrowth = [
    180000, 190000, 200000, 210000, 220000, 225000, 230000, 240000, 250000, 260000, 270000, 275000, 280000, 290000, 300000, 310000, 320000,
    325000, 330000, 340000, 350000, 360000, 370000, 375000, 380000, 390000, 400000, 410000, 420000, 425000, 430000, 440000, 450000, 460000,
    470000, 475000, 480000, 490000, 500000,
  ];
  const milestones_ownContributionPercentageOfGrowth = range(100, 0, -5);
  const milestones_interestPercentageOfContribution = range(5, 205, 5);
  const milestones_bigNetWorth = [
    10000, 25000, 50000, 75000, 100000, 125000, 150000, 175000, 200000, 250000, 300000, 350000, 400000, 450000, 500000, 600000, 700000,
    750000, 800000, 900000, 1000000, 1250000, 1500000, 1750000, 2000000, 2250000, 2500000, 2750000, 3000000, 3250000, 3500000, 3750000,
    4000000, 4250000, 4500000, 4750000, 5000000, 5250000, 5500000, 5750000, 6000000, 6250000, 650000, 6750000, 7000000, 7250000, 7500000,
    7750000, 8000000,
  ];
  const milestones_interestPercentageOfMonthlySpending = range(5, 205, 5);
  const milestones_safeMonthlyWithdrawal = [
    100, 200, 250, 300, 400, 500, 600, 700, 750, 800, 900, 1000, 1250, 1500, 1750, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 6000, 7000,
    8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000, 19000, 20000, 21000, 22000, 23000, 24000, 25000, 26000,
    27000, 28000, 29000, 30000, 31000, 32000, 33000, 34000, 35000, 36000, 37000, 38000, 39000, 40000,
  ];

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

  const generateMilestonesList = (monthlyContribution: number, interest: number): Map<number, string[]> => {
    monthlyContribution = +monthlyContribution;
    var netWorthMilestoneMap = new Map();

    for (let perHour of milestones_perHour) {
      const needed = (perHour * workHoursPerYear) / interest;
      const message = perHour + " per hour";
      addToMap(netWorthMilestoneMap, needed, message);
    }

    for (let annualInterest of milestones_annualInterest) {
      const needed = annualInterest / interest;
      const message = annualInterest.toLocaleString() + " annual interest";
      addToMap(netWorthMilestoneMap, needed, message);
    }

    for (let monthlyInterestMilestone of milestones_monthlyInterest) {
      const needed = (monthlyInterestMilestone * monthsInAYear) / interest;
      const message = monthlyInterestMilestone.toLocaleString() + " monthly interest";
      addToMap(netWorthMilestoneMap, needed, message);
    }

    for (let extraMonthOfInvestment of milestones_extraMonthsOfInvestment) {
      const annualInterestNeeded = extraMonthOfInvestment * monthlyContribution;
      const needed = annualInterestNeeded / interest;
      const message = extraMonthOfInvestment + " extra months of investment per year";
      addToMap(netWorthMilestoneMap, needed, message);
    }

    for (let monthlyGrowth of milestones_monthlyGrowth) {
      const monthlyInterestNeeded = monthlyGrowth - monthlyContribution;
      const needed = (monthlyInterestNeeded * monthsInAYear) / interest;
      const message = monthlyGrowth.toLocaleString() + " monthly growth";
      addToMap(netWorthMilestoneMap, needed, message);
    }

    for (let annualGrowth of milestones_annualGrowth) {
      const annualInterestNeeded = annualGrowth - monthlyContribution;
      const needed = annualInterestNeeded / interest;
      const message = annualGrowth.toLocaleString() + "annual growth";
      addToMap(netWorthMilestoneMap, needed, message);
    }

    for (let ownContributionPercentage of milestones_ownContributionPercentageOfGrowth) {
      const ownContributionPercentageDivided = ownContributionPercentage / 100;
      const monthlyGrowthNeeded = monthlyContribution / ownContributionPercentageDivided;
      const monthlyInterestNeeded = monthlyGrowthNeeded - monthlyContribution;
      const needed = (monthlyInterestNeeded * monthsInAYear) / interest;
      const message = "Own contribution is " + ownContributionPercentage + "% of monthly growth";
      addToMap(netWorthMilestoneMap, needed, message);
    }

    for (let interestPercentageOfContribution of milestones_interestPercentageOfContribution) {
      const interestPercentageDivided = interestPercentageOfContribution / 100;
      const monthlyInterestNeeded = interestPercentageDivided * monthlyContribution;
      const needed = (monthlyInterestNeeded * monthsInAYear) / interest;
      const message = "Interest is " + interestPercentageOfContribution + "% of monthly contribution";
      addToMap(netWorthMilestoneMap, needed, message);
    }

    for (let bigNetWorth of milestones_bigNetWorth) {
      const message = "" + bigNetWorth.toLocaleString();
      addToMap(netWorthMilestoneMap, bigNetWorth, message);
    }

    for (let interestPercentageOfMonthlySpending of milestones_interestPercentageOfMonthlySpending) {
      const interestPercentageDivided = interestPercentageOfMonthlySpending / 100;
      const monthlyInterestNeeded = interestPercentageDivided * monthlyExpensesAfterTax;
      const needed = (monthlyInterestNeeded * monthsInAYear) / interest;
      const message = "Interest is " + interestPercentageOfMonthlySpending + "% of monthly budget";
      addToMap(netWorthMilestoneMap, needed, message);
    }

    for (let safeMonthlyWithdrawal of milestones_safeMonthlyWithdrawal) {
      const needed = (safeMonthlyWithdrawal * monthsInAYear) / safeWithdrawalRate;
      const message = safeMonthlyWithdrawal.toLocaleString() + " can safely be withdrawn per month";
      addToMap(netWorthMilestoneMap, needed, message);
    }

    // Is there really not a better way to sort a map by its keys in Javascript?
    return new Map([...netWorthMilestoneMap].sort((a, b) => a[0] - b[0]));
  };

  let netWorthByMonthListInPast: number[] = getNetWorthByMonthInPast(currentNetWorth, interest, monthlyContribution);
  let netWorthByMonthListNowAndFuture: number[] = getNetWorthByMonth(currentNetWorth, interest, numberOfYears, monthlyContribution);

  let netWorthMilestoneSortedMap: Map<number, string[]> = generateMilestonesList(monthlyContribution, interest);

  // Certified mega monster mayhem method :(
  const generateTimelineData = (
    netWorthByMonthListInPast: number[],
    netWorthByMonthListNowAndFuture: number[],
    netWorthMilestoneSortedMap: Map<number, string[]>,
  ): YearData[] => {
    let currentNetWorth: number = netWorthByMonthListNowAndFuture[0];
    let netWorthByMonthListTotal: number[] = netWorthByMonthListInPast.concat(netWorthByMonthListNowAndFuture);
    var milestonesByMonth: Milestone[][] = [...Array(netWorthByMonthListTotal.length)].map((_) => Array());
    const currentMonthIndex = netWorthByMonthListInPast.length;

    let yearIndex = 0;
    const numOfYearsAgoDataStarts = 0 - Math.ceil(currentMonthIndex / monthsInAYear);

    let timelineData: YearData[] = [];

    for (const [i, networthAtThisMonth] of netWorthByMonthListTotal.entries()) {
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
          if( yearsInTheFuture > 0){
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
          age: currentAge + yearOffset,
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

  let timelineData: YearData[] = generateTimelineData(
    netWorthByMonthListInPast,
    netWorthByMonthListNowAndFuture,
    netWorthMilestoneSortedMap,
  );
</script>

<main>
  <MilestonesByMonthTable {timelineData} />
</main>

<style>
  .input-container {
    display: flex;
    flex-direction: row;
    margin-bottom: 25px;
  }
</style>

<script lang="ts">
    import { CURRENT_DATETIME, getMonth, monthsInAYear, workHoursPerYear, type Options } from "../shared/constants";
    import MonthCircle from "./MonthCircle.svelte";
    import PercentCircle from "./PercentCircle.svelte";

    const fireHowManyMonthsInFuture = (netWorthByMonthList: number[], fireNumber: number): number => {
        for (const [i, networthAtThisMonth] of netWorthByMonthList.entries()) {
            if (fireNumber < networthAtThisMonth) {
                return i;
            }
        }
        return 0;
    };

    const getCoastFireReachedMonthsInFuture = (options: Options, netWorthByMonth: number[]): number => {
        const fireAmount = (options.monthlyExpensesAfterTax * 12) / (options.safeWithdrawalRatePercentage / 100);
        for (const [i, networthAtThisMonth] of netWorthByMonth.entries()) {
            const monthsLeft = netWorthByMonth.length - i;
            const monthlyInterest = (1 + ((options.interestPercent / 100) / 12));
            const noContributionsFinalAmount = networthAtThisMonth * Math.pow(monthlyInterest, monthsLeft);
            if(noContributionsFinalAmount > fireAmount){
                return i;
            }
        }
        return 0;
    };

    const getMonthsAsYearMonthString = (months: number | null) => {
        if(!months){
            return "";
        }

        let coastFireReachedYearsInFuture = months / monthsInAYear;
        let coastFireReachedYearsInFutureFloored = Math.floor(coastFireReachedYearsInFuture);
        let coastFireReachedMonthPart = Math.ceil((coastFireReachedYearsInFuture % 1) * monthsInAYear);
        
        if (coastFireReachedYearsInFuture == 0 && coastFireReachedMonthPart == 0){
            return "";
        }
        
        let yearSegment = "";
        if(coastFireReachedYearsInFutureFloored != 0){
            yearSegment = `${coastFireReachedYearsInFutureFloored} years`
        }

        let monthSegment = "";
        if(coastFireReachedMonthPart != 0){
            monthSegment = `${coastFireReachedMonthPart} months`
        }

        let divider = "";
        if(coastFireReachedMonthPart != 0 && coastFireReachedYearsInFutureFloored != 0){
            divider = ", ";
        }

        return yearSegment + divider + monthSegment;
    }

    let { options, netWorthByMonthListNowAndFuture }: { options: Options; netWorthByMonthListNowAndFuture: number[] } = $props();


    let perHour = (options.currentNetWorth * (options.interestPercent / 100)) / workHoursPerYear;
    let fireMonths = (options.currentNetWorth * (options.safeWithdrawalRatePercentage / 100)) / options.monthlyExpensesAfterTax;

    let safeWithdrawalPerMonth = (options.currentNetWorth * (options.safeWithdrawalRatePercentage / 100)) / monthsInAYear

    let investmentStartMonth: number | null = options.investmentStart ? getMonth(options.investmentStart) : null;
    let monthsInvestedSoFar: number | null = investmentStartMonth ? getMonth(CURRENT_DATETIME) - investmentStartMonth : null;

    let coastFireReachedMonthsInFuture: number = getCoastFireReachedMonthsInFuture(options, netWorthByMonthListNowAndFuture);
    let coastFireReachedPercentage = monthsInvestedSoFar === null ? 0 : (monthsInvestedSoFar / (monthsInvestedSoFar + coastFireReachedMonthsInFuture)) * 100;
    

    let fireNumber = (options.monthlyExpensesAfterTax * monthsInAYear) / (options.safeWithdrawalRatePercentage / 100);
    let fireMonthsInFuture = fireHowManyMonthsInFuture(netWorthByMonthListNowAndFuture, fireNumber);
    let fireReachedPercentage = monthsInvestedSoFar === null ? 0 : (monthsInvestedSoFar / (monthsInvestedSoFar + fireMonthsInFuture)) * 100;

    let monthlyInterest = (options.currentNetWorth * (options.interestPercent / 100)) / monthsInAYear;

    // TODO: Current monthly safe withdrawal amount
</script>

<div class="stats"></div>
<div class="row">
    <div class="column">
        Coast FIRE
        <PercentCircle percent={Math.round(coastFireReachedPercentage)} />
    </div>
    <div class="column">
        FIRE
        <PercentCircle percent={Math.round(fireReachedPercentage)} />
    </div>
    <div class="column">
        <p>Financially independent months per year</p>
        <MonthCircle numberOfMonths={fireMonths} />
    </div>
</div>

Net worth
<p>{Math.round(options.currentNetWorth).toLocaleString()} {options.currency} net worth</p>
<br>

Investing for
<p>{getMonthsAsYearMonthString(monthsInvestedSoFar)}</p>
<br>

Earn per work hour
<p>{Math.round(perHour).toLocaleString()} {options.currency} per hour</p>
<br>

Monthly interest
<p>{Math.round(monthlyInterest).toLocaleString()} {options.currency} monthly interest</p>
<br>

Safe monthly withdrawal
<p>{Math.round(safeWithdrawalPerMonth).toLocaleString()} {options.currency} safe monthly withdrawal</p>
<br>

Time until Coast FIRE
<p>{getMonthsAsYearMonthString(coastFireReachedMonthsInFuture)}</p>
<br>

Time left until retirement
<p>{getMonthsAsYearMonthString(netWorthByMonthListNowAndFuture.length)}</p>
<style>
    .column {
        display: flex;
        flex-direction: column;
    }

    .row {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
</style>

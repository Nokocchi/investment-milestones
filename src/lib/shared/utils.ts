import { CURRENT_YEAR, monthsInAYear } from "./constants";

export function* range(start: number, stop?: number, step: number = 1, includeLast: boolean = false) {
    if (stop == null) {
        // one param defined
        stop = start;
        start = 0;
    }

    if (includeLast) {
        stop += step;
    }
    for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
        yield i;
    }
}

export const getAbsoluteMonth = (date: Date): number => {
    return date.getFullYear() * 12 + date.getMonth();
};

export const getMonthAsAgeYearString = (months: number | null, age: number): string => {
    if (!months) {
        return "";
    }

    const numberOfYearsInFuture = Math.floor(months / monthsInAYear);
    const year = CURRENT_YEAR + numberOfYearsInFuture;
    const ageInFuture = age + numberOfYearsInFuture;
    return `${year} | ${ageInFuture} years old`;
}

export const getMonthsAsYearMonthString = (months: number | null, reachedText: string = "", nullText: string = "Impossible") => {
    if (months == 0) {
        return reachedText;
    }

    if (!months) {
        return nullText;
    }

    let yearsInFuture = months / monthsInAYear;
    let yearsInFutureFloored = Math.floor(yearsInFuture);
    let monthPart = months % monthsInAYear;

    if (yearsInFuture == 0 && monthPart == 0) {
        return "";
    }

    let yearSegment = "";
    if (yearsInFutureFloored != 0) {
        yearSegment = `${yearsInFutureFloored} year`;
        if (yearsInFutureFloored > 1) {
            yearSegment += "s";
        }
    }

    let monthSegment = "";
    if (monthPart != 0) {
        monthSegment = `${monthPart} month`;
        if (monthPart > 1) {
            monthSegment += "s";
        }
    }

    let divider = "";
    if (monthPart != 0 && yearsInFutureFloored != 0) {
        divider = ", ";
    }

    return yearSegment + divider + monthSegment;
};

export const getPercentage = (a: number, b: number): number => {
    if (a && b) {
        return (a / b) * 100;
    }
    return 0;
}

// https://money.stackexchange.com/questions/16507/calculate-future-value-with-recurring-deposits
// Payment and interest, beginning and end of period - do I care?
export const getFutureValueAnnual = (principal: number, monthlyContribution: number, months: number, monthlyInterestDivided: number): number => {
    const interestPlusOne = monthlyInterestDivided + 1;
    const totalInterest = Math.pow(interestPlusOne, months);
    const something = ((totalInterest - 1) / monthlyInterestDivided) * interestPlusOne;

    return principal * totalInterest + monthlyContribution * something;
}

const calculateFinalBalance = (
    principal: number,
    interest: number,
    monthlyContribution: number,
    monthsWithContribution: number,
    monthsWithoutContribution: number
): number => {
    // Calculate balance during the contribution phase
    let balance = principal;
    const monthlyRate = interest / 12; // Convert annual interest rate to monthly rate

    for (let i = 0; i < monthsWithContribution; i++) {
        balance = balance * (1 + monthlyRate) + monthlyContribution;
    }

    //console.log("Balance from contributing phase", balance);
    const testt = balance;

    // Calculate balance during the non-contribution phase
    for (let i = 0; i < monthsWithoutContribution; i++) {
        balance = balance * (1 + monthlyRate);
    }

    //console.log("Balance from coasting phase", balance - testt);


    return balance;
}

export const findMonthlyContribution = (
    principal: number,
    interest: number,
    monthsUntilRetirement: number,
    finalAmount: number,
    coastFromMonthsInFuture?: number
): number => {
    const monthsWithContribution = coastFromMonthsInFuture === undefined ? monthsUntilRetirement : coastFromMonthsInFuture;
    const monthsWithoutContribution = coastFromMonthsInFuture === undefined ? 0 : monthsUntilRetirement - coastFromMonthsInFuture;
    //console.log("MonthsWithContributions", monthsWithContribution);
    //console.log("MonthsWithoutContributions", monthsWithoutContribution);
    //console.log("Principal", principal);
    //console.log("Final amount", finalAmount);
    //console.log("Interest", interest);
    let lowerBound = 0;
    let upperBound = finalAmount / monthsWithContribution; // A reasonable upper guess
    let monthlyContributionSoFar = 0;
    let calculatedFinalSoFar = 0;

    if (monthsWithContribution == 0){
        return 0;
    }

    // Use bisection method to find the correct monthly contribution
    while (calculatedFinalSoFar < finalAmount || Math.abs((calculatedFinalSoFar - finalAmount)) > 1) {
        //console.log("Calculated final", calculatedFinalSoFar);
        monthlyContributionSoFar = (lowerBound + upperBound) / 2;
        calculatedFinalSoFar = calculateFinalBalance(
            principal,
            interest,
            monthlyContributionSoFar,
            monthsWithContribution,
            monthsWithoutContribution
        );

        if (calculatedFinalSoFar < finalAmount) {
            // Increase the monthly contribution
            lowerBound = monthlyContributionSoFar;
        } else {
            // Decrease the monthly contribution
            upperBound = monthlyContributionSoFar;
        }
    }

    // Return the midpoint as the solution
    return monthlyContributionSoFar;
}

export const getNoContributionFinalAmount = (principal: number, monthlyInterestPlusOne: number, months: number) => {
    /*
        let balance: number = principal;
    for (let i = 0; i < months; i++) {
        balance = balance * monthlyInterestPlusOne;
    }
    return balance;
    */
    return principal * Math.pow(monthlyInterestPlusOne, months);
}

export const getPrincipalNeededForNoContributionFutureValue = (futureValue: number, monthlyInterestPlusOne: number, months: number) => {
    return futureValue / Math.pow(monthlyInterestPlusOne, months);
}

export const roundAndFormat = (value: number, currency: string) => {
    return `${Math.round(value).toLocaleString()} ${currency}`;
}
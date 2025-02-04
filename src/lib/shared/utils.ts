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

    return principal*totalInterest + monthlyContribution*something;
}

// Broken?
export const getMonthlyContributionNeededForFutureValue = (futureValue: number, principal: number, months: number, monthlyInterestDivided: number): number => {
    const interestPlusOne = monthlyInterestDivided + 1;
    const totalInterest = Math.pow(interestPlusOne, months);
    const something = ((totalInterest - 1) / monthlyInterestDivided) * interestPlusOne;
    return (futureValue - principal*totalInterest) / something;
}

export const getNoContributionFinalAmount = (principal: number, monthlyInterestPlusOne: number, months: number) => {
    return principal * Math.pow(monthlyInterestPlusOne, months);
}

export const getPrincipalNeededForNoContributionFutureValue = (futureValue: number, monthlyInterestPlusOne: number, months: number) => {
    return futureValue / Math.pow(monthlyInterestPlusOne, months);
}

export const roundAndFormat = (value: number, currency: string) => {
    return `${Math.round(value).toLocaleString()} ${currency}`;
}
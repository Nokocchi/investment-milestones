export const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

export const monthsInAYear = monthNames.length;

export enum ReachedState {
    REACHED,
    HERE,
    IN_FUTURE
}

export const CURRENT_DATETIME = new Date();
export const CURRENT_MONTH = CURRENT_DATETIME.getMonth();
export const CURRENT_YEAR = CURRENT_DATETIME.getFullYear();

export enum MenuChoice {
    MAIN,
    OPTIONS,
    ABOUT,
    STATS
}

export const workHoursPerYear = 46 * 40; // 46 work weeeks, 40 hours per week

export const getMonth = (date: Date): number => {
    return date.getFullYear() * 12 + date.getMonth();
};

export const getMonthsAsYearMonthString = (months: number | null) => {
    if (!months) {
        return "";
    }

    let yearsInFuture = months / monthsInAYear;
    let yearsInFutureFloored = Math.floor(yearsInFuture);
    let monthPart = Math.ceil((yearsInFuture % 1) * monthsInAYear);

    if (yearsInFuture == 0 && monthPart == 0) {
        return "";
    }

    let yearSegment = "";
    if (yearsInFutureFloored != 0) {
        yearSegment = `${yearsInFutureFloored} years`;
    }

    let monthSegment = "";
    if (monthPart != 0) {
        monthSegment = `${monthPart} months`;
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
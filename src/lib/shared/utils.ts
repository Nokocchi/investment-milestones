import { monthsInAYear } from "./constants";

export function* range(start: number, stop?: number, step: number = 1, includeLast: boolean = false) {
    if (stop == null) {
        // one param defined
        stop = start;
        start = 0;
    }

    if(includeLast){
        stop += step;
    }
    for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
        yield i;
    }
}

export const getAbsoluteMonth = (date: Date): number => {
    return date.getFullYear() * 12 + date.getMonth();
};

export const getMonthsAsYearMonthString = (months: number | null, reachedText: string = "", nullText: string = "Impossible") => {
    if(months == 0){
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
        if(yearsInFutureFloored > 1){
            yearSegment += "s";
        }
    }

    let monthSegment = "";
    if (monthPart != 0) {
        monthSegment = `${monthPart} month`;
        if(monthPart > 1){
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
import { getAbsoluteMonth } from "./utils";

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
export const DEFAULT_RETIREMENT_AGE = 67;

export enum ReachedState {
    REACHED,
    HERE,
    IN_FUTURE
}

export enum InputType {
    number,
    string,
    date,
    currency
}

export const getLastMonth = () => {
    let lastMonth = new Date();
    lastMonth.setDate(0);
    return lastMonth;
}


export const CURRENT_DATETIME = new Date();
export const CURRENT_MONTH = CURRENT_DATETIME.getMonth();
export const CURRENT_YEAR = CURRENT_DATETIME.getFullYear();
export const CURRENT_DATETIME_ABSOLUTE = getAbsoluteMonth(CURRENT_DATETIME);

export enum MenuChoice {
    HOME,
    VISUALIZER,
    ABOUT,
    ADVANCED_STATS
}

export const workHoursPerYear = 46 * 40; // 46 work weeeks, 40 hours per week
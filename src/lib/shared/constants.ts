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
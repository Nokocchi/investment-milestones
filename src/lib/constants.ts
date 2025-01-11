export const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export const monthsInAYear = monthNames.length;

export enum ReachedState {
    REACHED,
    HERE,
    IN_FUTURE
}

export type MonthData = {
    reachedState: ReachedState;
    monthName: string;
    estimatedNetWorth: number;
    milestones: Milestone[];
};

export type YearHeader = {
    year: number;
    age: number;
    reachedState: ReachedState
};

export type YearData = {
    yearHeader: YearHeader;
    monthData: MonthData[];
};

export type Milestone = {
    neededNetWorth: number;
    message: string;
}

const currentTime = new Date();
export const CURRENT_MONTH = currentTime.getMonth();
export const CURRENT_YEAR = currentTime.getFullYear();
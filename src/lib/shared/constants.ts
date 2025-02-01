
import type { SVGAttributes } from 'svelte/elements';
export const monthNamesFull = [
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

export type MonthData = {
    reachedState: ReachedState;
    monthName: string;
    estimatedNetWorth: number;
    yearsAndMonthsUntil: string;
    percentageOfReachingThis: number | null;
    monthlyGrowth: number;
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

export const CURRENT_DATETIME = new Date();
export const CURRENT_MONTH = CURRENT_DATETIME.getMonth() - 1; // Temporary circumvention of time-related bug so I can develop past midnight without worrying about it now..
export const CURRENT_YEAR = CURRENT_DATETIME.getFullYear();
console.log("Current date time", new Date());
console.log("Current month", CURRENT_MONTH);

export type Options = {
    monthlyContribution: number;
    currentAge: number;
    currency: string;
    currentNetWorth: number;
    interestPercent: number;
    monthlyExpensesAfterTax: number;
    safeWithdrawalRatePercentage: number;
    showAllMilestones: boolean;
    investmentStart: Date | null;
    retireByAge: number;
}

export enum MenuChoice {
    MAIN,
    OPTIONS,
    ABOUT,
    STATS
}

export const workHoursPerYear = 46 * 40; // 46 work weeeks, 40 hours per week

export const headers = [
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

export enum MilestoneType {
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


type SvgAttrs = SVGAttributes<SVGElement>;

export interface CircleProps extends Omit<SvgAttrs, 'width' | 'height'> {
    lineWidth?: number;
    bgColor?: string;
    color?: string;
    textColor?: string;
    percent?: number;
    rounded?: boolean;
    responsive?: boolean;
    animation?: boolean;
    textStyle?: string;
    size?: number;
}

export const getMonth = (date: Date): number => {
    return date.getFullYear() * 12 + date.getMonth();
};
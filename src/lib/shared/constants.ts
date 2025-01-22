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
    percentageOfReachingThis: number;
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

const currentTime = new Date();
export const CURRENT_MONTH = currentTime.getMonth();
export const CURRENT_YEAR = currentTime.getFullYear();

export type Options = {
    monthlyContribution: number;
    currentAge: number;
    currency: string;
    currentNetWorth: number;
    interestPercent: number;
    numberOfYears: number;
    monthlyExpensesAfterTax: number;
    safeWithdrawalRatePercentage: number;
    showAllMilestones: boolean;
    simulatePastData: boolean;
}

export enum MenuChoice {
    MAIN,
    OPTIONS,
    ABOUT
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
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

export type Options = {
    monthlyContribution?: number;
    currentAge?: number;
    currency?: string;
    currentNetWorth?: number;
    interestPercent?: number;
    monthlyExpensesAfterTax?: number;
    safeWithdrawalRatePercentage?: number;
    showAllMilestones: boolean;
    investmentStart?: string;
    retireByAge?: number;
}

export type DerivedOptions = {
    monthlyContribution: number;
    currentAge: number;
    currency: string;
    currentNetWorth: number;
    interestPercent: number;
    interestDivided: number;
    monthlyExpensesAfterTax: number;
    safeWithdrawalRatePercentage: number;
    safeWithdrawalRateDivided: number;
    showAllMilestones: boolean;
    investmentStart?: Date;
    retireByAge: number;
}

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
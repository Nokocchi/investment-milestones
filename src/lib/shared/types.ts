import type { SVGAttributes } from 'svelte/elements';

export type MonthData = {
    calendarMonth: number;
    estimatedNetWorth: number;
    timeUntilStringShort: string;
    timeUntilStringLong: string;
    percentageOfReachingThis: number | null;
    percentageTowardsFire: number | null;
    percentageTowardsCoastFire: number | null;
    monthlyGrowth: number;
    milestones: Milestone[];
    coasting: boolean;
};

export type YearHeader = {
    year: number;
    age: number;
};

export type YearData = {
    yearHeader: YearHeader;
    monthData: MonthData[];
};

export type Milestone = {
    neededNetWorth: number;
    message: string;
}

type SvgAttrs = SVGAttributes<SVGElement>;

export interface CircleProps extends Omit<SvgAttrs, 'width' | 'height'> {
    lineWidth?: number;
    bgColor?: string;
    color?: string;
    textColor?: string;
    percent?: number | null;
    rounded?: boolean;
    responsive?: boolean;
    animation?: boolean;
    textStyle?: string;
    size?: number;
    title?: string;
}

export type Options = {
    monthlyContribution?: string;
    currentAge?: string;
    currency?: string;
    currentNetWorth?: string;
    annualInterestPercent?: string;
    monthlyExpensesAfterTax?: string;
    safeWithdrawalRatePercentage?: string;
    showAllMilestones?: boolean;
    investmentStart?: string;
    retireByAge?: string;
    coastFromDate?: string;
}

export type DerivedOptions = {
    monthlyContribution: number;
    currentAge: number;
    currency: string;
    currentNetWorth: number;
    annualInterestPercent: number;
    annualInterestDivided: number;
    monthlyInterestDivided: number;
    monthlyInterestPlusOne: number;
    monthlyExpensesAfterTax: number;
    annualExpensesAfterTax: number;
    annualInterestGrowth: number;
    monthlyInterestGrowth: number;
    safeWithdrawalRatePercentage: number;
    safeWithdrawalRateDivided: number;
    monthlySafeWithdrawalRateDivided: number;
    safeannualWithdrawal: number;
    safeMonthlyWithdrawal: number;
    showAllMilestones: boolean;
    investmentStart?: Date;
    retireByAge: number;
    monthsUntilRetirement: number;
    monthsSinceInvestmentStart: number;
    fireNumber: number;
    perHour: number;
    fireMonthsFractional: number;
    coastFromDate?: Date;
    coastFromDateMonthsInFuture?: number;
    netWorthNeededNowForCoast: number;
    minimumMonthlyContributionsNeededToReachFire: number;
}

export enum TextColor {
    RED,
    GREEN
}

export type TextAndColor = {
    value?: string;
    color?: TextColor;
}

export type TextWithSubtext = {
    text?: TextAndColor;
    subtext?: TextAndColor;
}
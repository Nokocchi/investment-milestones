import type { SVGAttributes } from 'svelte/elements';
import type { ReachedState } from './constants';

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
    monthlyContribution?: number;
    currentAge?: number;
    currency?: string;
    currentNetWorth?: number;
    annualInterestPercent?: number;
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
    annualInterestPercent: number;
    annualInterestDivided: number;
    monthlyInterestDivided: number;
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
    monthsSinceInvestmentStart: number | null;
    shouldGenerateData: boolean;
    fireNumber: number;
    perHour: number;
    fireMonthsFractional: number;
}
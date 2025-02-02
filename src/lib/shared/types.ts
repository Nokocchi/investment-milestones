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
    percent?: number;
    rounded?: boolean;
    responsive?: boolean;
    animation?: boolean;
    textStyle?: string;
    size?: number;
    title?: string;
}
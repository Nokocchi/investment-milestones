import { MenuChoice } from "./constants";
import type { Options } from "./types";

export const options: Options = $state({
    monthlyContribution: 25408,
    currentAge: 29,
    currency: "SEK",
    currentNetWorth: 470000,
    annualInterestPercent: 7,
    numberOfYears: 30,
    monthlyExpensesAfterTax: 28000,
    safeWithdrawalRatePercentage: 4,
    test: 0,
    showAllMilestones: false,
    investmentStart: "2023-05-01",
    retireByAge: 50,
    coastFromDate: null
});

export let menuChoice: MenuChoice = $state(MenuChoice.MAIN);
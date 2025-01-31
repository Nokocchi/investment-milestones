import { MenuChoice, type Options } from "./constants";

export const options: Options = $state({
    monthlyContribution: 25408,
    currentAge: 29,
    currency: "SEK",
    currentNetWorth: 470000,
    interestPercent: 7,
    numberOfYears: 30,
    monthlyExpensesAfterTax: 28000,
    safeWithdrawalRatePercentage: 4,
    test: 0,
    showAllMilestones: false,
    investmentStart: "2023/05/01",
    retireByAge: 50
});

export let menuChoice: MenuChoice = $state(MenuChoice.MAIN);
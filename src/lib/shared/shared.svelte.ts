import { CURRENT_DATETIME, CURRENT_YEAR } from "./constants";
import type { Options } from "./types";
import { getAsIsoYearMonth } from "./utils";

let five_years_ago = new Date();
five_years_ago.setFullYear(CURRENT_YEAR - 5);

const defaultOptions: Options = {
    annualInterestPercent: "7",
    safeWithdrawalRatePercentage: "4",
    investmentStart: getAsIsoYearMonth(five_years_ago),
    currentAge: "32",
    retireByAge: "50",
    monthlyExpensesAfterTax: "30000",
    currency: "SEK",
    currentNetWorth: "2500000",
    monthlyContribution: "5000"
}

const localStorageOptions = JSON.parse(localStorage.getItem("options") ?? JSON.stringify(defaultOptions));
const colorModeLocalStorage: string | null = localStorage.getItem("colorMode");
export const initializeWithColorMode: string = colorModeLocalStorage ? colorModeLocalStorage : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? "dark" : "light";
export const options: Options = $state({...localStorageOptions});

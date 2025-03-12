import { CURRENT_DATETIME } from "./constants";
import type { Options } from "./types";
import { getAsIsoYearMonth } from "./utils";

const defaultOptions: Options = {
    annualInterestPercent: "7",
    safeWithdrawalRatePercentage: "4",
    investmentStart: getAsIsoYearMonth(CURRENT_DATETIME)
}

const localStorageOptions = JSON.parse(localStorage.getItem("options") ?? JSON.stringify(defaultOptions));
const colorModeLocalStorage: string | null = localStorage.getItem("colorMode");
export const initializeWithColorMode: string = colorModeLocalStorage ? colorModeLocalStorage : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? "dark" : "light";
export const options: Options = $state({...localStorageOptions});

import { CURRENT_DATETIME } from "./constants";
import type { Options } from "./types";
import { getAsIsoYearMonth } from "./utils";

const defaultOptions: Options = {
    annualInterestPercent: "7",
    safeWithdrawalRatePercentage: "4",
    investmentStart: getAsIsoYearMonth(CURRENT_DATETIME)
}

const localStorageOptions = JSON.parse(localStorage.getItem("options") ?? JSON.stringify(defaultOptions));
export const options: Options = $state({...localStorageOptions});

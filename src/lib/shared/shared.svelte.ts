import type { Options } from "./types";

const defaultOptions: Options = {
    annualInterestPercent: "7",
    safeWithdrawalRatePercentage: "4"
}

const localStorageOptions = JSON.parse(localStorage.getItem("options") ?? JSON.stringify(defaultOptions));
export const options: Options = $state({...localStorageOptions});

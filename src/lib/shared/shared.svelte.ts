import { MenuChoice } from "./constants";
import type { Options } from "./types";

const localStorageOptions = JSON.parse(localStorage.getItem("options") ?? JSON.stringify({}));
export const options: Options = $state({...localStorageOptions});

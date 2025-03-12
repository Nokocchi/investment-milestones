<script lang="ts">
    import { CURRENT_DATETIME, InputType } from "../../shared/constants";
    import { options } from "../../shared/shared.svelte";
    import { tooltipText_coastFromDate, tooltipText_investmentStart, tooltipText_monthlyExpensesAfterTax } from "../../shared/TooltipTexts";
    import type { Options } from "../../shared/types";
    import { getAsIsoYearMonth } from "../../shared/utils";
    import LabelAndInput from "./LabelAndInput.svelte";

    const { saveHandler } = $props();

    export const saveToLocalStorage = (opts: Options) => {
        localStorage.setItem("options", JSON.stringify(opts));
    };

    $effect(() => saveToLocalStorage(options));

    const saveHandlerInternal = () => {
        saveHandler();
    };

    const getMaxCoastYearAsIsoDate = (retireByAge?: string, currentAge?: string): Date | undefined => {
        if (!currentAge || isNaN(+currentAge) || !retireByAge || isNaN(+retireByAge)) {
            return undefined;
        }
        const yearsInFuture = +retireByAge - +currentAge;
        let maxCoastYear = new Date(CURRENT_DATETIME);
        maxCoastYear.setFullYear(CURRENT_DATETIME.getFullYear() + yearsInFuture);
        return maxCoastYear;
    };

    const maxCoastYear: Date | undefined = $derived(getMaxCoastYearAsIsoDate(options.retireByAge, options.currentAge));
</script>

<div>
    <div class="options-panel">
        <div class="column">
            <LabelAndInput label="Monthly Contribution" type={InputType.number} bind:value={options.monthlyContribution} />
            <LabelAndInput label="Current net worth" type={InputType.number} bind:value={options.currentNetWorth} />
            <LabelAndInput label="Annual interest %" type={InputType.number} bind:value={options.annualInterestPercent} />
            <LabelAndInput label="Safe withdrawal rate %" type={InputType.number} bind:value={options.safeWithdrawalRatePercentage} />
            <LabelAndInput
                label="Monthly expenses after tax"
                min={"1"}
                type={InputType.number}
                bind:value={options.monthlyExpensesAfterTax}
                tooltipText={tooltipText_monthlyExpensesAfterTax()}
            />
        </div>
        <div class="column">
            <LabelAndInput
                label="* When did you start investing?"
                type={InputType.month}
                bind:value={options.investmentStart}
                tooltipText={tooltipText_investmentStart()}
            />
            <LabelAndInput label="* Current age" type={InputType.number} bind:value={options.currentAge} />
            <LabelAndInput label="* Retire by age" type={InputType.number} bind:value={options.retireByAge} />
            <LabelAndInput label="Currency" type={InputType.string} bind:value={options.currency} />
            <LabelAndInput
                label="Coast from"
                type={InputType.month}
                bind:value={options.coastFromDate}
                min={getAsIsoYearMonth(CURRENT_DATETIME)}
                max={maxCoastYear != null ? getAsIsoYearMonth(maxCoastYear) : undefined}
                disabled={maxCoastYear === undefined}
                tooltipText={tooltipText_coastFromDate()}
            />
        </div>
    </div>
    <button onclick={saveHandlerInternal}>Close</button>
</div>

<style>
    .options-panel {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        padding: 1rem 2rem;
        gap: 0.5rem;
        flex-wrap: wrap;
    }

    @media (max-width: 1700px) {
        .options-panel {
            justify-content: space-evenly;
        }
    }

    .column {
        display: flex;
        flex-direction: column;
        width: 100%;
        min-width: 50px;
        max-width: 400px;
    }

    button {
        background-color: var(--top-menu-btn-bg-color);
        padding: 0.4rem 0.6rem;
        border: none;
        font-weight: bold;
    }
</style>

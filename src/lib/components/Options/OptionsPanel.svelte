<script lang="ts">
    import { options } from "../../shared/shared.svelte";
    import type { Options } from "../../shared/types";
    import LabelAndInput from "./LabelAndInput.svelte";

    const { saveHandler } = $props();

    export const saveToLocalStorage = (opts: Options) => {
        localStorage.setItem("options", JSON.stringify(opts));
    };

    $effect(() => saveToLocalStorage(options));
</script>

<div>
    <div class="options-panel">
        <div class="column">
            <LabelAndInput label="Monthly Contribution" type="number" bind:value={options.monthlyContribution} />
            <LabelAndInput label="Current net worth" type="number" bind:value={options.currentNetWorth} />
            <LabelAndInput label="Annual interest %" type="number" bind:value={options.annualInterestPercent} />
            <LabelAndInput label="Safe withdrawal rate %" type="number" bind:value={options.safeWithdrawalRatePercentage} />
            <LabelAndInput
                label="Monthly expenses after tax (excluding current monthly contribution)"
                type="number"
                bind:value={options.monthlyExpensesAfterTax}
            />
        </div>
        <div class="column">
            <LabelAndInput label="When did you start investing?" type="date" bind:value={options.investmentStart} />
            <LabelAndInput label="Current age" type="number" bind:value={options.currentAge} />
            <LabelAndInput label="Retire by age" type="number" bind:value={options.retireByAge} />
            <LabelAndInput label="Currency" type="text" bind:value={options.currency} />
            <LabelAndInput label="Coast from" type="date" bind:value={options.coastFromDate} />
        </div>
    </div>
    <button onclick={saveHandler}>Save</button>
</div>

<style>
    .options-panel {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .column {
        display: flex;
        flex-direction: column;
        padding: 0.5rem;
    }

    .input-with-label {
        display: flex;
        flex-direction: column;
    }
</style>

<script lang="ts">
    import { InputType } from "../../shared/constants";
    import { options } from "../../shared/shared.svelte";
    import type { Options } from "../../shared/types";
    import LabelAndInput from "./LabelAndInput.svelte";

    const { saveHandler } = $props();

    export const saveToLocalStorage = (opts: Options) => {
        localStorage.setItem("options", JSON.stringify(opts));
    };

    $effect(() => saveToLocalStorage(options));

    const saveHandlerInternal = () => {
        saveHandler();
    }
</script>

<div>
    <div class="options-panel">
        <div class="column">
            <LabelAndInput label="Monthly Contribution" type={InputType.currency} bind:value={options.monthlyContribution} />
            <LabelAndInput label="Current net worth" type={InputType.currency} bind:value={options.currentNetWorth} />
            <LabelAndInput label="Annual interest %" type={InputType.number} bind:value={options.annualInterestPercent} />
            <LabelAndInput label="Safe withdrawal rate %" type={InputType.number} bind:value={options.safeWithdrawalRatePercentage} />
            <LabelAndInput label="Monthly expenses after tax" type={InputType.currency} bind:value={options.monthlyExpensesAfterTax} />
        </div>
        <div class="column">
            <LabelAndInput label="When did you start investing?" type={InputType.date} bind:value={options.investmentStart} />
            <LabelAndInput label="Current age" type={InputType.number} bind:value={options.currentAge} />
            <LabelAndInput label="Retire by age" type={InputType.number} bind:value={options.retireByAge} />
            <LabelAndInput label="Currency" type={InputType.string} bind:value={options.currency} />
            <LabelAndInput label="Coast from" type={InputType.date} bind:value={options.coastFromDate} />
        </div>
    </div>
    <button onclick={saveHandlerInternal}>Save</button>
</div>

<style>
    .options-panel {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        padding: 1rem;
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
</style>

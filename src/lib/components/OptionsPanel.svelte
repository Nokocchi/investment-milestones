<script lang="ts">
    import { options } from "../shared/shared.svelte";
    import LabelAndInput from "./LabelAndInput.svelte";
</script>

<div class="options-panel">
    <div class="column">
        <LabelAndInput label="Monthly Contribution" type="number" bind:something={options.monthlyContribution} />
        <LabelAndInput label="Current net worth" type="number" bind:something={options.currentNetWorth} />
        <LabelAndInput label="Annual interest %" type="number" bind:something={options.interestPercent} />
        <LabelAndInput label="Safe withdrawal rate %" type="number" bind:something={options.safeWithdrawalRatePercentage} />
        <LabelAndInput label="Monthly expenses after tax (excluding current monthly contribution)" type="number" bind:something={options.monthlyExpensesAfterTax} />
    </div>
    <div class="column">
        <LabelAndInput label="When did you start investing?" type="date" bind:something={options.investmentStart} />
        <LabelAndInput label="Current age" type="number" bind:something={options.currentAge} />
        <LabelAndInput label="Retire by age" type="number" bind:something={options.retireByAge} />
        <LabelAndInput label="Currency" type="text" bind:something={options.currency} />
       
    </div>
</div>

<style>
    label {
        text-align: left;
    }

    .options-panel {
        display: flex;
        flex-direction: row;
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

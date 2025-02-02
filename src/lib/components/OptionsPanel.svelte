<script lang="ts">
    import { options } from "../shared/shared.svelte";
    import LabelAndInput from "./LabelAndInput.svelte";
</script>

<div class="options-panel">
    <div class="column">
        <LabelAndInput label="Monthly Contribution" type="number" bind:value={options.monthlyContribution} />
        <LabelAndInput label="Current net worth" type="number" bind:value={options.currentNetWorth} />
        <LabelAndInput label="Annual interest %" type="number" bind:value={options.interestPercent} />
        <LabelAndInput label="Safe withdrawal rate %" type="number" bind:value={options.safeWithdrawalRatePercentage} />
        <LabelAndInput label="Monthly expenses after tax (excluding current monthly contribution)" type="number" bind:value={options.monthlyExpensesAfterTax} />
    </div>
    <div class="column">
        <LabelAndInput label="When did you start investing?" type="date" bind:value={options.investmentStart} />
        <LabelAndInput label="Current age" type="number" bind:value={options.currentAge} />
        <LabelAndInput label="Retire by age" type="number" bind:value={options.retireByAge} />
        <LabelAndInput label="Currency" type="text" bind:value={options.currency} />
       
    </div>
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

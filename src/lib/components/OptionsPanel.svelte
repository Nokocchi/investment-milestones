<script lang="ts">
    import { InputType } from "../shared/constants";
    import { options } from "../shared/shared.svelte";
    import Input from "./Input.svelte";

    let toggle = $state(true);
</script>

<div class="page-container">
    <input type="checkbox" bind:checked={toggle} />
    {#if toggle}
        <div class="options-panel">
            <div class="column">
                <Input label="Monthly Contribution" inputType={InputType.number} bind:value={options.monthlyContribution} />
                <Input label="Number of years to invest" inputType={InputType.number} bind:value={options.numberOfYears} />
                <Input label="Current net worth" inputType={InputType.number} bind:value={options.currentNetWorth} />
                <Input label="Annual interest %" inputType={InputType.number} bind:value={options.interestPercent} />
            </div>
            <div class="column">
                <Input label="Safe withdrawal rate %" inputType={InputType.number} bind:value={options.safeWithdrawalRatePercentage} />
                <Input
                    label="Monthly expenses after tax (excluding current monthly contribution)"
                    inputType={InputType.number}
                    bind:value={options.monthlyExpensesAfterTax}
                />
                <Input label="Current age" inputType={InputType.number} bind:value={options.currentAge} />
                <Input label="Currency" inputType={InputType.text} bind:value={options.currency} />
            </div>
        </div>
    {/if}
</div>

<style>
    .options-panel {
        margin-bottom: 50px;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .column {
        display: flex;
        flex-direction: column;
    }
</style>

<script lang="ts">
    import { options } from "../shared/shared.svelte";
</script>

<div class="options-panel">
    <div class="column">
        <label class="input-with-label"
            >Monthly Contribution
            <input type="number" bind:value={options.monthlyContribution} />
        </label>
        <label class="input-with-label">
            Current net worth
            <input type="number" bind:value={options.currentNetWorth} />
        </label>
        <label class="input-with-label">
            Annual interest %
            <input type="number" bind:value={options.interestPercent} />
        </label>
        <label class="input-with-label">
            Safe withdrawal rate %
            <input type="number" bind:value={options.safeWithdrawalRatePercentage} />
        </label>
        <label class="input-with-label">
            Monthly expenses after tax (excluding current monthly contribution)
            <input type="number" bind:value={options.monthlyExpensesAfterTax} />
        </label>
    </div>
    <div class="column">
        <label class="input-with-label">
            When did you start investing?
            <input type="date" bind:value={options.investmentStart} />
        </label>
        <label class="input-with-label">
            Current age
            <input type="number" bind:value={options.currentAge} />
        </label>
        <label class="input-with-label">
            Retire by age
            <input type="number" bind:value={options.retireByAge} />
        </label>
        <label class="input-with-label">
            Currency
            <input type="text" bind:value={options.currency} />
        </label>
        <label class="input-with-label">
            Expand all milestones
            <input type="checkbox" bind:checked={options.showAllMilestones} />
        </label>
    </div>
</div>

<style>
    .options-panel {
        margin-top: 40px;
        margin-bottom: 50px;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .column {
        display: flex;
        flex-direction: column;
    }

    .input-with-label {
        display: flex;
        flex-direction: column;
        margin-right: 25px;
        margin-bottom: 25px;
    }
</style>

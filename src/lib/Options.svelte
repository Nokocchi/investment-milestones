<script>
    import Input from "./Input.svelte";


</script>

<Input label="Monthly Contribution" bind:value={monthlyContribution} />
<Input label="Number of years to invest" bind:value={numberOfYears} />
<Input label="Current net worth" bind:value={currentNetWorth} />
<Input label="Annual interest %" bind:value={interestPercent} />
<Input label="Safe withdrawal rate %" bind:value={safeWithdrawalRatePercentage} />
<Input label="Monthly expenses after tax (excluding current monthly contribution)" bind:value={monthlyExpensesAfterTax} />
<Input label="Current age" bind:value={currentAge} />
<Input label="Currency" bind:value={currency} />
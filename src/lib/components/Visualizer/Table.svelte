<script lang="ts">
	let { tableHeaders, tableData } = $props();
</script>

<table>
	<thead>
		<tr>
			{#each tableHeaders as columnHeading}
				<th>{columnHeading}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each tableData as row}
			<tr>
				{#each row as cell}
					<td>{cell}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		background-color: var(--milestone-table-bg-color);
		border-top: none;
		border-bottom: none;
		text-align: left;
		border-collapse: collapse;
		width: calc(100% - 8px);
		margin: auto;
	}

	table thead {
		background-color: var(--milestone-table-head-bg-color);
		border-bottom: 1px solid var(--border-color);
	}

	table tr:nth-child(even) {
		background: var(--milestone-table-even-rows-bg-color);
	}

	table td, table th {
		border-left: 1px solid var(--border-color);
		border-right: 1px solid var(--border-color);
		border-top: none;
		border-bottom: none;
		padding: 0.3rem 0.4rem;
	}

	table tr {
		padding-left: 0.5rem;	
	}

	table tr:not(:last-child) {
		border-bottom: 1px solid var(--border-color);
	}

</style>

<script lang="ts">
	let { tableHeaders, tableData } = $props();
</script>

<table class="blueTable">
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
	table,
	th,
	td {
		border: 1px solid;
		border-collapse: collapse;
		margin-bottom: 10px;
	}

	table.blueTable {
		border: 1px solid #171718;
		background-color: rgb(112, 105, 105);
		width: auto;
		text-align: left;
		border-collapse: collapse;
	}
	table.blueTable td,
	table.blueTable th {
		border: 1px solid #228e9c;
		padding: 3px 2px;
	}
	table.blueTable tbody td {
		font-size: 13px;
	}
	table.blueTable tr:nth-child(even) {
		background: #383c3f;
	}
	table.blueTable thead {
		background: #242627;
		background: -moz-linear-gradient(top, #5592bb 0%, #327cad 66%, #1c6ea4 100%);
		background: -webkit-linear-gradient(top, #5592bb 0%, #327cad 66%, #1c6ea4 100%);
		background: linear-gradient(to bottom, #5592bb 0%, #327cad 66%, #1c6ea4 100%);
		border-bottom: 2px solid #444444;
	}
	table.blueTable thead th {
		font-size: 15px;
		font-weight: bold;
		color: #ffffff;
		border-left: 2px solid #5085b4;
	}
	table.blueTable thead th:first-child {
		border-left: none;
	}
</style>

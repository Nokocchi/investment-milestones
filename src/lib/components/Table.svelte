<script lang="ts">
    import { fade, fly, slide } from "svelte/transition";

	let { tableHeaders, tableData } = $props();
</script>

<table transition:slide>
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
	}

	table {
		border: 1px solid #171718;
		background-color: rgb(112, 105, 105);
		text-align: left;
		border-collapse: collapse;
		width: 100%;
	}
	table td,
	table th {
		border: 1px solid #228e9c;
		padding: 3px 2px;
	}

	table tr:nth-child(even) {
		background: #383c3f;
	}
	table thead {
		background: #242627;
		background: -moz-linear-gradient(top, #5592bb 0%, #327cad 66%, #1c6ea4 100%);
		background: -webkit-linear-gradient(top, #5592bb 0%, #327cad 66%, #1c6ea4 100%);
		background: linear-gradient(to bottom, #5592bb 0%, #327cad 66%, #1c6ea4 100%);
		border-bottom: 2px solid #444444;
	}
	table thead th {
		font-size: 15px;
		font-weight: bold;
		color: #ffffff;
		border-left: 2px solid #5085b4;
	}
	table thead th:first-child {
		border-left: none;
	}

	table td:first-child {
		width: 9rem;
	}
</style>

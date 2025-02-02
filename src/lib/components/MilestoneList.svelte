<script lang="ts">
    import Table from "./Table.svelte";

    let { data } = $props();
    const tableHeaders = ["Net worth", "Milestones"];

    let tableData = [];

    for (const [networth, milestones] of data.entries()) {
        for (const milestone of milestones) {
            let row = [];
            row[0] = Math.round(networth).toLocaleString();
            row[1] = milestone;
            tableData.push(row);
        }
    }
</script>

<Table {tableHeaders} {tableData} />

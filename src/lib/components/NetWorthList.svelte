<script lang="ts">
    import { monthNames, monthsInAYear } from "../shared/constants";


    import Table from "./Table.svelte";

    let { netWorthByMonthList } = $props();
    const headers = ["Date", "Net worth"]

    let tableData = [];

    let currentMonthIndex = 0;

    for (const [i, netWorth] of netWorthByMonthList.entries()) {
        let row = [];
        if (i == 0) {
            row[0] = "Principal: ";
            row[1] = Math.round(netWorth).toLocaleString();
        } else {
            let iAdjusted = i - 1;
            let monthNumber = (iAdjusted + currentMonthIndex) % monthsInAYear;
            let year = 2025 + Math.floor(iAdjusted / 12);
            row[0] = year + " " + monthNames[monthNumber];
            row[1] =  Math.round(netWorth).toLocaleString();
        }
        tableData.push(row)
    }
</script>

<Table tableHeaders={headers} {tableData}/>

<script lang="ts">
    import MilestonesByMonthTable from "./lib/components/MilestonesByMonthTable.svelte";
    import OptionsPanel from "./lib/components/OptionsPanel.svelte";

</script>

<main>
  <OptionsPanel/>
  <MilestonesByMonthTable />
</main>

<style>
  main {
    margin: 0 auto;
    padding: 0;
    width: 100%;
  }
</style>

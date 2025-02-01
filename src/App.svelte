<script lang="ts">
  import About from "./lib/components/About.svelte";
  import Menu from "./lib/components/Menu.svelte";
  import MilestonesByMonthTable from "./lib/components/MilestonesByMonthTable.svelte";
  import OptionsPanel from "./lib/components/OptionsPanel.svelte";
  import { CURRENT_MONTH, MenuChoice } from "./lib/shared/constants";

  console.log("Current date time", new Date());
  console.log("Current month", CURRENT_MONTH);

  let page: MenuChoice = $state(MenuChoice.MAIN);
</script>

<main class="page-container">
  <div class="content-container">
    {#if page == MenuChoice.MAIN}
      <MilestonesByMonthTable />
    {:else if page == MenuChoice.OPTIONS}
      <OptionsPanel />
    {:else if page == MenuChoice.ABOUT}
      <About />
    {/if}
  </div>
  <Menu bind:page />
</main>

<style>
  main {
    margin: 0 auto;
    padding: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100vh; /*Causes the expansion of milestones to be super slow. Fix*/
    position: relative;
  }

  .content-container {
    overflow-y: auto;
    flex-grow: 1;
  }

  .page-container {
    max-width: 1280px;
    text-align: center;
    /*
  position: relative;
  padding: 0.5rem;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  */
    box-sizing: border-box;
  }
</style>

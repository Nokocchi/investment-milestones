<script lang="ts">
    import About from "./lib/components/About/About.svelte";
    import OptionsPanel from "./lib/components/Options/OptionsPanel.svelte";
    import MainPageProxy from "./lib/components/Visualizer/MainPageProxy.svelte";
    import Menu from "./lib/components/Visualizer/Menu.svelte";


  import { MenuChoice } from "./lib/shared/constants";

  let page: MenuChoice = $state(MenuChoice.MAIN);
</script>

<main class="page-container">
  <Menu bind:page />
  <div class="content-container">
    {#if page == MenuChoice.MAIN}
      <MainPageProxy />
    {:else if page == MenuChoice.OPTIONS}
      <OptionsPanel />
    {:else if page == MenuChoice.ABOUT}
      <About />
    {/if}
  </div>
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
    padding: 0.5rem;
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

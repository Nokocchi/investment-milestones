<script lang="ts">
  import About from "./lib/components/About/About.svelte";
  import FrontPage from "./lib/components/FrontPage/FrontPage.svelte";
  import OptionsPanel from "./lib/components/Options/OptionsPanel.svelte";
  import MainPageProxy from "./lib/components/Visualizer/MainPageProxy.svelte";
  import Menu from "./lib/components/Menus/Menu.svelte";

  import { MenuChoice } from "./lib/shared/constants";
  import SideMenu from "./lib/components/Menus/SideMenu.svelte";
  import { fly } from "svelte/transition";

  let page: MenuChoice = $state(MenuChoice.HOME);
  let menuBtnOpen: boolean = $state(false);
  let settingsBtnOpen: boolean = $state(false);
</script>

<main>
  <div class="top-menu">
    <Menu bind:menuBtnOpen bind:settingsBtnOpen bind:page />
  </div>
  <div class="rest-of-page">
    {#if menuBtnOpen}
      <div class="sidemenu navigation" transition:fly={{ x: "-100%" }}>
        <SideMenu bind:menuBtnOpen bind:settingsBtnOpen bind:page />
      </div>
    {/if}
    {#if settingsBtnOpen}
      <div class="sidemenu settings" transition:fly={{ x: "100%" }}>
        <OptionsPanel
          saveHandler={() => {
            settingsBtnOpen = false;
          }}
        />
      </div>
    {/if}

    <div class="content-container">
      {#if page == MenuChoice.HOME}
        <FrontPage bind:page />
      {:else if page == MenuChoice.VISUALIZER}
        <MainPageProxy />
      {:else if page == MenuChoice.ABOUT}
        <About />
      {/if}
    </div>
  </div>
</main>

<style>
  main {
    margin: 0 auto;
    padding: 0;
    width: 100%;
    position: relative;
    text-align: center;
    box-sizing: border-box;
    overflow-y: hidden;
    display: flex;
    flex-direction: column;
    height: 100dvh;
  }

  .rest-of-page {
    position: relative;
    overflow-x: hidden;
    flex-grow: 1;
  }

  .top-menu {
    width: 100%;
  }

  .navigation {
    left: 0;
    border-right: 1px solid black;
  }

  .settings {
    right: 0;
    border-left: 1px solid black;
  }

  .sidemenu {
    position: absolute;
    top: 0;
    height: 100%;
    width: calc(calc(100vw - 1280px) / 2);
    z-index: 1;
    background-color: #1a1a1a;
  }

  @media (max-width: 1700px) {
    .sidemenu {
      width: 100%;
    }
  }

  .content-container {
    margin: 0 auto;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    max-width: 1280px;
    text-align: center;
    box-sizing: border-box;
    position: relative;
    overflow-x: hidden;
    flex-grow: 1;
    padding: 1rem;
  }
</style>

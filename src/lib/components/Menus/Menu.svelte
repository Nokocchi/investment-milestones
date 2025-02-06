<script lang="ts">
    import { MenuChoice } from "../../shared/constants";

    let {
        menuBtnOpen = $bindable(),
        settingsBtnOpen = $bindable(),
        page = $bindable(),
    }: { menuBtnOpen: boolean; settingsBtnOpen: boolean; page: MenuChoice } = $props();

    const reset = () => {
        menuBtnOpen = false;
        settingsBtnOpen = false;
        page = MenuChoice.VISUALIZER;
    };

    const settingsClickHandler = () => {
        menuBtnOpen = false;
        settingsBtnOpen = !settingsBtnOpen;
    };

    const sideMenuClickHandler = () => {
        settingsBtnOpen = false;
        menuBtnOpen = !menuBtnOpen;
    };
</script>

<div class="menu">
    <button class="menu-btn" onclick={sideMenuClickHandler}>
        {#if menuBtnOpen}
            X
        {:else}
            Menu
        {/if}
    </button>
    <button class="home" onclick={reset}>INVESTMENT VISUALIZER</button>
    <button class="settings-btn" onclick={settingsClickHandler}>
        {#if settingsBtnOpen}
            X
        {:else}
            Settings
        {/if}
    </button>
</div>

<style>
    .menu {
        height: 45px;
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-shrink: 0;
        background-color: blue;
        justify-content: space-between;
        align-items: center;
    }

    button {
        height: 100%;
        width: 4rem;
    }

    .home {
        background-color: blue;
        flex-grow: 1;
        border: none;
    }
</style>

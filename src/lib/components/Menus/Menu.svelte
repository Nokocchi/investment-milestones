<script lang="ts">
    import { MenuChoice } from "../../shared/constants";

    let {
        menuBtnOpen = $bindable(),
        settingsBtnOpen = $bindable(),
        page = $bindable(),
        menuHeight = $bindable(),
    }: { menuBtnOpen: boolean; settingsBtnOpen: boolean; page: MenuChoice, menuHeight: number; } = $props();

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

<div class="menu" bind:clientHeight={menuHeight}>
    <div class="limited-width">
        <button class="menu-btn" onclick={sideMenuClickHandler}>
            {#if menuBtnOpen}
                X
            {:else}
                <svg style="width:20px;height:20px" viewBox="0 0 20 20">
                    <path fill="currentColor" d="M1,4 H18 V6 H1 V4 M1,9 H18 V11 H1 V7 M3,14 H18 V16 H1 V14" />
                </svg>
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
</div>

<style>
    .menu {
        height: 3rem;
        width: 100%;
        background-color: #1a1a1a;
        border-bottom: 1px solid black;
    }

    .limited-width {
        margin: auto;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        max-width: 1280px;
        
    }

    button {
        height: 100%;
        width: 4rem;
    }

    .home {
        background-color: #1a1a1a;
        flex-grow: 1;
        border: none;
        text-align: center;
    }
</style>

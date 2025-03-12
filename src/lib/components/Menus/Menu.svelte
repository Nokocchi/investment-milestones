<script lang="ts">
    import { onMount } from "svelte";
    import { MenuChoice } from "../../shared/constants";
    import { initializeWithColorMode } from "../../shared/shared.svelte";

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

    const setColorModeOnBody = (colorMode: string) => {
        if (!colorMode) {
            return;
        }
        if (body != undefined) {
            body.classList.toggle("darkMode", colorMode === "dark");
            body.classList.toggle("lightMode", colorMode === "light");
        }
    };

    let body: HTMLBodyElement | undefined;
    let colorMode: string = $state(initializeWithColorMode);

    $effect(() => setColorModeOnBody(colorMode));

    const darkModeClickHandler = () => {
        colorMode = colorMode === "light" ? "dark" : "light";
        localStorage.setItem("colorMode", String(colorMode));
    };
</script>

<svelte:body bind:this={body} />
<div class="menu">
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
        <button class="settings-btn" onclick={darkModeClickHandler}>
            {#if !colorMode || colorMode === "light"}
                DARK
            {:else}
                LIGHT
            {/if}
        </button>
        {#if page === MenuChoice.VISUALIZER}
            <button class="settings-btn" onclick={settingsClickHandler}>
                {#if settingsBtnOpen}
                    X
                {:else}
                    Settings
                {/if}
            </button>
        {:else}
            <div class="placeholder"></div>
        {/if}
    </div>
</div>

<style>
    .menu {
        height: 45px;
        width: 100%;
        background-color: var(--top-menu-bg-color);
        border-bottom: 1px solid var(--border-color);
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

    button,
    .placeholder {
        height: 100%;
        width: 4rem;
        background-color: var(--top-menu-btn-bg-color);
        border-color: var(--top-menu-btn-bg-color);
    }

    .home {
        background-color: var(--top-menu-bg-color);
        flex-grow: 1;
        border: none;
        text-align: center;
    }
</style>

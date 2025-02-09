<script lang="ts">
    import { MenuChoice } from "../../shared/constants";

    let {
        menuBtnOpen = $bindable(),
        settingsBtnOpen = $bindable(),
        page = $bindable(),
    }: { menuBtnOpen: boolean; settingsBtnOpen: boolean; page: MenuChoice } = $props();

    const clickHandler = (menuChoice: MenuChoice) => {
        menuBtnOpen = false;
        settingsBtnOpen = false;
        page = menuChoice;
    };
</script>

<div class="menu">
    <div class="btn-container">
        <button class={{ selected: page == MenuChoice.HOME }} onclick={() => clickHandler(MenuChoice.HOME)}>Home</button>
        <button class={{ selected: page == MenuChoice.VISUALIZER }} onclick={() => clickHandler(MenuChoice.VISUALIZER)}>Visualizer</button>
        <button class={{ selected: page == MenuChoice.ABOUT }} onclick={() => clickHandler(MenuChoice.ABOUT)}>About</button>
    </div>
    <div class="author">
        Created by Nokocchi 2025
    </div>
</div>

<style>
    .menu {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 1rem;
        box-sizing: border-box;
    }

    .btn-container {
        display: flex;
        flex-direction: column;
    }

    button {
        margin-bottom: 1rem;
        border: 1px solid #121212;
        padding: 1rem;
        border-radius: 0.5rem;
        background-color: #2a2a2a;
    }

    button:hover {
        background-color: #3a3a3a;
    }
</style>

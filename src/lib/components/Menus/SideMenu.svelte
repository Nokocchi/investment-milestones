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
<button class={{ selected: page == MenuChoice.HOME }} onclick={() => clickHandler(MenuChoice.HOME)}>Home</button>
<button class={{ selected: page == MenuChoice.VISUALIZER }} onclick={() => clickHandler(MenuChoice.VISUALIZER)}>Visualizer</button>
<button class={{ selected: page == MenuChoice.ABOUT }} onclick={() => clickHandler(MenuChoice.ABOUT)}>About</button>
</div>

<style>
    .menu {
        height: 100%;
        display: flex;
        flex-direction: column;
    }
</style>

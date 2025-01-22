<script lang="ts">
    import { MenuChoice } from "../shared/constants";

    let { page = $bindable() }: { page: MenuChoice } = $props();
</script>

<div class="menu">
    <button class={{ selected: page == MenuChoice.MAIN }} onclick={() => (page = MenuChoice.MAIN)}>Main</button>
    <button class={{ selected: page == MenuChoice.OPTIONS }} onclick={() => (page = MenuChoice.OPTIONS)}>Options</button>
    <button class={{ selected: page == MenuChoice.ABOUT }} onclick={() => (page = MenuChoice.ABOUT)}>About</button>
</div>

<style>
    .menu {
        height: 75px;
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-shrink: 0;
    }

    button {
        border-radius: 0%;
        width: calc(100% / 3);
        background-color: grey;
    }

    button.selected {
        background-color: green;
    }
</style>

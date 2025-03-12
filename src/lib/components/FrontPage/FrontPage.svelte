<script lang="ts">
    import { MenuChoice } from "../../shared/constants";
    import lizard from "../../../assets/lizard.jpg";

    let { page = $bindable() }: { page: MenuChoice } = $props();
</script>

<div class="frontpage-content info">
    <h2>Investment Visualizer</h2>
    <p>
        This is a tool which shows the projected growth of your investments in the future, as well as the milestones you will hit along the
        way.
    </p>
    <p>
        Investing is a slow process, and the milesones and reason to celebrate can feel few and far between. This tool aims to give you
        multiple milestones to look forward and celebrate every year, using various different metrics like your safe withdrawal rate,
        monthly growth from interest, etc.
    </p>
</div>
<div class="frontpage-content">
    <img alt="showcase" src={lizard} />
</div>
<button class="visualizer-btn" onclick={() => (page = MenuChoice.VISUALIZER)}>
    Go to visualizer
</button>


<style>
    .frontpage-content {
        border: 1px solid var(--border-color);
        padding: 1rem;
        border-radius: 0.5rem;
        background-color: var(--side-menu-bg-color);
        box-shadow: 2px 4px var(--box-shadow-color);
    }

    .visualizer-btn {
        font-weight: bold;
        background-color: var(--goto-visualizer-btn-bg-color);
        border-color: var(--goto-visualizer-btn-border-color);
        padding: 1rem;
        border-radius: 0.5rem;
    }

    .frontpage-content:not(:last-child) {
        margin-bottom: 2rem;
    }

    img {
        max-width: 100%;
    }

    h2 {
        margin: 0;
    }
</style>

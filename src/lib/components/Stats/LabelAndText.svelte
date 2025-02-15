<script lang="ts">
    import { options } from "../../shared/shared.svelte";
    import Tooltip from "./Tooltip.svelte";

    let {
        label,
        texts,
        tooltipText,
        difference,
    }: { label: string; texts: (string | undefined)[]; tooltipText?: string; difference?: number } = $props();

    const getDifferenceText = (difference?: number): string | undefined => {
        if (!difference){
            return undefined;
        }

        return `${(difference > 0 ? "+" : "")} ${difference.toLocaleString()} ${options.currency}`;
    }

    const differenceText: string | undefined = getDifferenceText(difference);
</script>

<div class="label-and-tooltip">
    <p class="label">
        {label}
    </p>
    <div class="tooltip">
        {#if tooltipText}
            <Tooltip {tooltipText} />
        {/if}
    </div>
</div>

<!-- TODO: This component needs to be refactored. Maybe it should take either a string array or a "text&difference" object of some sort -->
<div class="text">
    {#each texts as text}
        <p>
            {text}
            {#if difference}
                <span class={["diff", { negative: difference < 0}]}>{differenceText}</span>
            {/if}
        </p>
    {/each}
</div>

<style>
    p {
        margin-block-start: 0;
        margin-block-end: 0;
        text-align: left;
    }

    .label-and-tooltip {
        text-align: left;
    }

    .tooltip {
        display: inline-block;
    }

    .label {
        color: darkgreen;
        font-weight: bold;
        font-size: 1.2em;
        display: inline-block;
    }

    .text {
        margin-bottom: 25px;
    }

    .diff {
        color: green;
    }

    .diff.negative {
        color: red;
    }
</style>

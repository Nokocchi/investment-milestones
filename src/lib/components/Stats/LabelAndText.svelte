<script lang="ts">
    import { TextColor, type TextWithSubtext } from "../../shared/types";
    import Tooltip from "./Tooltip.svelte";

    let { label, texts, tooltipText }: { label: string; texts: TextWithSubtext[]; tooltipText?: string } = $props();
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

<div class="text">
    {#each texts as { text, subtext }}
        {#if text && text.value}
            <p class={[text.color != null ? TextColor[text.color] : undefined]}>
                {text.value}
                {#if subtext && subtext.value}
                    <span class={[subtext.color != null ? TextColor[subtext.color] : undefined]}>{subtext.value}</span>
                {/if}
            </p>
        {/if}
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
        margin-right: 0.5rem;
    }

    .text {
        margin-bottom: 25px;
    }

    .text p.RED {
        color: red;
    }

    .text p.GREEN {
        color: green;
    }

    .text span.RED {
        color: red;
    }

    .text span.GREEN {
        color: green;
    }
</style>

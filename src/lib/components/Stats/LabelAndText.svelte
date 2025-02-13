<script lang="ts">
    import Tooltip from "./Tooltip.svelte";

    let { label, text, text2, text3, tooltipText }: { label: string; text: string; text2?: string; text3?: string; tooltipText?: string } =
        $props();
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
    <p>{text}</p>
    {#if text2}
        <p>{text2}</p>
    {/if}
    {#if text3}
        <p>{text3}</p>
    {/if}
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
</style>

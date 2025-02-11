<script lang="ts">
    import { tooltip } from "../../shared/tooltip";

    let { label, text, text2, text3, tooltipText }: { label: string; text: string; text2?: string; text3?: string, tooltipText?: string } = $props();
</script>

<p class="label">
    {label}
    {#if tooltipText}
        <span use:tooltip={tooltipText}></span>
    {/if}
</p>
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

    .label {
        color: darkgreen;
        font-weight: bold;
        font-size: 1.2em;
    }

    .text {
        margin-bottom: 25px;
    }
</style>

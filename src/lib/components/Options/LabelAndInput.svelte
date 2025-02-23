<script lang="ts">
    import { InputType } from "../../shared/constants";
    import Tooltip from "../Stats/Tooltip.svelte";

    // TODO: Maybe some day I will rewrite this to be a generic LabelAndInput class that takes an input as a snippet and renders it. Not sure how to properly bind that to the reactive options object without making the solution more ugly..

    let {
        label,
        type,
        value = $bindable(),
        tooltipText,
        disabled = false,
        min,
        max,
    }: {
        label: string;
        type: InputType;
        value: string | undefined;
        tooltipText?: string;
        disabled?: boolean;
        min?: string;
        max?: string;
    } = $props();

    const hasTooltip: boolean = tooltipText != null;
    const formatter = Intl.NumberFormat("en-US");

    const cleanUpWithRegex = (val: string): string => {
        return val.replace(/[^0-9]/g, "");
    };

    const onInputHandler = () => {
        if (type === InputType.currency && internalValue) {
            internalValue = cleanUpWithRegex(internalValue);
        }
    };

    const formatIfNecessary = (value?: string): string | undefined => {
        if (type !== InputType.currency) {
            return value;
        }

        if (!value) {
            return "";
        }

        return formatter.format(+cleanUpWithRegex(value));
    };

    const onBlurHandler = () => {
        if (type !== InputType.currency) {
            value = internalValue;
            return;
        }
        value = String(internalValue);
        internalValue = formatIfNecessary(internalValue);
    };

    let internalValue = $state(formatIfNecessary(value));
    const typeAdjusted = type === InputType.currency ? InputType.string : type;
</script>

<label class={["input-with-label", { hasTooltip }]}>
    <div class="label-with-tooltip">
        <p>{label}</p>
        {#if tooltipText}
            <Tooltip {tooltipText} />
        {/if}
    </div>
    <input
        {disabled}
        type={InputType[typeAdjusted]}
        bind:value={internalValue}
        oninput={onInputHandler}
        onblur={onBlurHandler}
        {min}
        {max}
    />
</label>

<style>
    .input-with-label {
        display: flex;
        flex-direction: column;
        text-align: left;
        margin-bottom: 1rem;
    }

    .label-with-tooltip {
        margin-bottom: 0.5rem;
    }

    .hasTooltip p {
        margin-right: 0.5rem;
    }

    input {
        width: 100%;
        height: 2rem;
        max-width: 450px;
        padding: 0.2rem;
        padding-left: 0.5rem;
        box-sizing: border-box;
    }

    div {
        display: flex;
        flex-direction: row;
    }

    p {
        margin-block-start: 0;
        margin-block-end: 0;
    }
</style>

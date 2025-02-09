<script lang="ts">
    import { InputType } from "../../shared/constants";

// TODO: Maybe some day I will rewrite this to be a generic LabelAndInput class that takes an input as a snippet and renders it. Not sure how to properly bind that to the reactive options object without making the solution more ugly..

    let {
        label,
        type,
        value = $bindable(),
    }: {
        label: string;
        type: InputType;
        value: string | undefined;
    } = $props();

    const formatter = Intl.NumberFormat("en-US");

    const formatIfNecessary = (value?: string) => {
        if (type !== InputType.currency) {
            return value;
        }
        
        return formatter.format(getValueAsNumber(value));
    }

    const getValueAsNumber = (val?: string): number => {
        if (!val) {
            return 0;
        }

        return +(String(val).replace(/[^0-9]/g, ""));
    };

    let internalValue = $state(formatIfNecessary(value));
    const typeAdjusted = type === InputType.currency ? InputType.string : type;

    // Make sure the caret is in the correct location after update. 
    const onInputHandler = () => {
        if (type !== InputType.currency) {
            value = internalValue;
            return;
        }
        const asNumber = getValueAsNumber(internalValue);
        const currencyString = formatter.format(asNumber);
        internalValue = currencyString;
        value = String(asNumber);
    };
</script>

<label class="input-with-label">
    {label}
    <input type={InputType[typeAdjusted]} bind:value={internalValue} oninput={onInputHandler} />
</label>

<style>
    .input-with-label {
        display: flex;
        flex-direction: column;
        text-align: left;
        margin-bottom: 0.5rem;
    }

    input {
        width: 100%;
        height: 25px;
        max-width: 450px;
        padding: 0.2rem;
        padding-left: 0.5rem;
    }
</style>

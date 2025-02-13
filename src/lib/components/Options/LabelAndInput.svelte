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

    const cleanUpWithRegex = (val: string): string => {
        return val.replace(/[^0-9]/g, "");
    };

    const onInputHandler = () => {
        if(type === InputType.currency && internalValue){
            internalValue = cleanUpWithRegex(internalValue);
        }
    };

    const formatIfNecessary = (value?: string): string | undefined => {
        if (type !== InputType.currency) {
            return value;
        }
        
        if(!value){
            return "";
        }

        return formatter.format(+cleanUpWithRegex(value));
    }

    const onBlurHandler = () => {
        if (type !== InputType.currency) {
            value = internalValue;
            return;
        }
        value = String(internalValue);
        internalValue = formatIfNecessary(internalValue);
    }



    let internalValue = $state(formatIfNecessary(value));
    const typeAdjusted = type === InputType.currency ? InputType.string : type;

</script>

<label class="input-with-label">
    {label}
    <input type={InputType[typeAdjusted]} bind:value={internalValue} oninput={onInputHandler} onblur={onBlurHandler}/>
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

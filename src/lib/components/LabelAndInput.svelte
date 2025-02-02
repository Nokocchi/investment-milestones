<script lang="ts">
    import { options } from "../shared/shared.svelte";
    let { label, type, something = $bindable() } = $props();
</script>

<label class="input-with-label">
    {label}
    <input {type} bind:value={something} />
</label>

<style>
    .input-with-label {
        display: flex;
        flex-direction: column;
    }
</style>

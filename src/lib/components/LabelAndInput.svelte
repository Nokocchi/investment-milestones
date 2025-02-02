<script lang="ts">
    let { label, type, value = $bindable() } = $props();
</script>

<label class="input-with-label">
    {label}
    <input {type} bind:value />
</label>

<style>
    .input-with-label {
        display: flex;
        flex-direction: column;
        text-align: left;
    }

    input {
        width: 100%;
    }
</style>

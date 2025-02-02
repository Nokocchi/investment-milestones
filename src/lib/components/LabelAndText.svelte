<script lang="ts">
    let {label, text} = $props();
</script>

<p class="label">{label}</p>
<p class="text">{text}</p>

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
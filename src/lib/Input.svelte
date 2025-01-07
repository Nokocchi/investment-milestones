<script lang="ts">
    let { label, value = $bindable() } = $props();
</script>

<div class="input-with-label">
    <label for={"input-" + label}>{label}</label>

    <input id={"input-" + label} bind:value />
</div>

<style>
    .input-with-label {
      display: flex;
      flex-direction: column;
      margin-right: 25px;
    }
  </style>
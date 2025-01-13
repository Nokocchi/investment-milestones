<script lang="ts">
    import { InputType } from "../shared/constants";

    let { label, inputType, value = $bindable() }: {
      label: string,
      value: number | string,
      inputType: InputType
    } = $props();
    let type = InputType[inputType];
</script>

<div class="input-with-label">
    <label for={"input-" + label}>{label}</label>

    <input {type} id={"input-" + label} bind:value />
</div>

<style>
    .input-with-label {
      display: flex;
      flex-direction: column;
      margin-right: 25px;
      margin-bottom: 25px;
    }
  </style>
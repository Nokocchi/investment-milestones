<script lang="ts">
    import { ReachedState } from "../shared/constants";

    let { reachedState } = $props();
</script>

<div class="timeline-segment {ReachedState[reachedState]}">
</div>

<style>
    .timeline-segment {
      border: 1px solid white;
      box-sizing: border-box;
      height: 100%;
      width: 8px;
    }

    .REACHED {
      background-color: green;
    }

    .HERE {
      background-color: yellow;
    }

    .IN_FUTURE {
      background-color: red;
    }
  </style>
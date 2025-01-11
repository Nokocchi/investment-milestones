<script lang="ts">
    import { ReachedState } from "../constants";

    let { reachedState } = $props();
</script>

<div class="timeline-segment {ReachedState[reachedState]}">
</div>

<style>
    .timeline-segment {
      width: 20px;
      border: 3px solid white;
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
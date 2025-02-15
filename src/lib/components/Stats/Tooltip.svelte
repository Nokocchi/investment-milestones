<script lang="ts">
    import {
        FloatingArrow,
        arrow,
        autoUpdate,
        flip,
        offset,
        shift,
        useDismiss,
        useFloating,
        useHover,
        useInteractions,
        useRole,
    } from "@skeletonlabs/floating-ui-svelte";
    import { fade } from "svelte/transition";

    let open = $state(false);
    let elemArrow: HTMLElement | null = $state(null);
    let screenWidth: number = $state(0);
    
    // Half of the body - on screens larger than 1280px, body is 1280px. On smaller screens, it could be any width.
    let tooltipWidth: string = $derived(Math.min((1280 / 2), (screenWidth / 2)) + "px");

    const floating = useFloating({
        whileElementsMounted: autoUpdate,
        get open() {
            return open;
        },
        onOpenChange: (v) => {
            open = v;
        },
        placement: "top",
        get middleware() {
            return [offset(10), flip(), shift({ padding: 10 }), elemArrow && arrow({ element: elemArrow })];
        },
    });
    const role = useRole(floating.context, { role: "tooltip" });
    const hover = useHover(floating.context, { move: false });
    const dismiss = useDismiss(floating.context);
    const interactions = useInteractions([role, hover, dismiss]);

    let { tooltipText }: { tooltipText: string } = $props();
</script>

<svelte:window bind:outerWidth={screenWidth} />
<div style="--tooltip-width:{tooltipWidth}" class="relative">
    <i class="fa fa-question-circle" bind:this={floating.elements.reference} {...interactions.getReferenceProps()}></i>
    {#if open}
        <div
            bind:this={floating.elements.floating}
            style={floating.floatingStyles}
            {...interactions.getFloatingProps()}
            class="floating popover-neutral"
            transition:fade={{ duration: 200 }}
        >
            <p>
                {tooltipText}
            </p>
            <FloatingArrow bind:ref={elemArrow} context={floating.context} fill="#575969" />
        </div>
    {/if}
</div>

<style>
    p {
        margin-block-start: 0;
        margin-block-end: 0;
        text-align: left;
    }

    .relative {
        position: relative;
    }

    .floating {
        z-index: 1;
        background-color: black;
        width: max-content;
        max-width: var(--tooltip-width);
    }

    .floating p {
        padding: 0.5rem;
        white-space: pre-line;
    }
</style>

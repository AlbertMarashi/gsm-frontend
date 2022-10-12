<script lang="ts">
import type { SvelteComponent } from "svelte"

export let icon: typeof SvelteComponent
export let style: undefined | "brand" = undefined

</script>
<div class="icon {style}">
    <svelte:component this={icon}/>
</div>
<style lang="stylus">
@import "variables"
.icon
    display inline-flex
    &.brand
        color $brand
</style>
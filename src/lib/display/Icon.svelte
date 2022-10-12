<script lang="ts">
import type { SvelteComponent } from "svelte"

export let icon: typeof SvelteComponent
</script>
<div class="icon">
    <svelte:component this={icon}/>
</div>
<style lang="stylus">
.icon
    display inline-flex
</style>
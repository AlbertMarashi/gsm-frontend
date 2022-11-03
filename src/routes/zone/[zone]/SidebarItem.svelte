<script lang="ts">
import Icon from "$lib/display/Icon.svelte"
import zone from "$lib/zones/lumina/data"
import type { SvelteComponent } from "svelte"


export let title: string
export let href: string | undefined = undefined
export let icon: typeof SvelteComponent | undefined = undefined

$: tag = href ? "a" : "div"
</script>
<svelte:element this={tag} class="data" href={href}>
    <div class="tag">
        { title }
    </div>
    <div class="content">
        {#if icon}
            <Icon icon={icon}/>
        {/if}
        <div>
            <slot/>
        </div>
    </div>
</svelte:element>
<style lang="stylus">
@import "variables"

.data
    display flex
    flex-direction column
    gap 8px
    color white
    .tag
        font-size 14px
        font-weight 700
        opacity 0.5
        text-transform uppercase
    .content
        display flex
        align-items center
        font-size 18px
        gap 8px

a:hover
    .content
        color $brand
</style>
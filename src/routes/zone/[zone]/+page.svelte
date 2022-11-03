<script lang="ts">
import SvelteMarkdown from "svelte-markdown"
import Icon from "$lib/display/Icon.svelte"
import Flag from "svelte-material-icons/FlagOutline.svelte"
import type { PageData } from "./$types"
import SidebarItem from "./SidebarItem.svelte"
import MapMarker from "svelte-material-icons/MapMarker.svelte"
import Web from "svelte-material-icons/Web.svelte"
import Cash from "svelte-material-icons/Cash.svelte"
import Text from "svelte-material-icons/Text.svelte"
import Translate from "svelte-material-icons/Translate.svelte"
import AccountGroup from "svelte-material-icons/AccountGroup.svelte"
import Tag from "$lib/display/Tag.svelte"

export let data: PageData

$: zone = data.zone

</script>
<div class="hero dark">
    <div class="inner padding gap">
        <div class="tags">
            {#each zone.tags as tag}
                <Tag>{ tag }</Tag>
            {/each}
        </div>
        <h1>
            <div class="icon"><Icon icon={Flag}/></div>
            <div class="text">
                { zone.name }
            </div>
        </h1>
        <div class="description">
            { zone.description }
        </div>
    </div>
</div>
<div class="hero">
    <div class="main-area">
        <div class="content">
            <SvelteMarkdown source={zone.content}/>
        </div>
        <div class="sidebar">
            <SidebarItem title="Location" icon={MapMarker}>
                { zone.location }
            </SidebarItem>
            <SidebarItem title="Currency" icon={Cash}>
                { zone.currency }
            </SidebarItem>
            <SidebarItem title="Official Website" icon={Web} href={zone.website}>
                { zone.website }
            </SidebarItem>
            <SidebarItem title="Demonym" icon={Text}>
                { zone.demonym }
            </SidebarItem>
            <SidebarItem title="Language" icon={Translate}>
                { zone.language }
            </SidebarItem>
            <SidebarItem title="Population" icon={AccountGroup}>
                { zone.population.toLocaleString() }
            </SidebarItem>
        </div>
    </div>
</div>
<style lang="stylus">
@import "variables"
.tags
    display flex
    gap 8px

.main-area
    display grid
    grid-template-columns 1fr 300px
    max-width 1000px
    width 100%
    margin 0 auto
    > *
        padding 40px 16px
    .sidebar
        border-left 1px solid transparify(white, 8%)
        display flex
        flex-direction column
        gap 24px

h1
    font-size 44px
    display flex
    align-items center
    gap 8px
    font-weight 700
    .icon
        color $brand
        display inline-flex

.description
    opacity 0.7
    font-size 18px
    font-weight 400

.hero
    display flex
    flex-direction column
    border-bottom 1px solid transparify(white, 8%)
    .inner
        display flex
        flex-direction column
        &.gap
            gap 16px
        &.padding
            padding 40px 16px
        max-width 1000px
        width 100%
        margin 0 auto
    &.dark
        background transparify(black, 20%)

.content
    display flex
    flex-direction column
    gap 1em
    font-weight 400
    :global
        p
            opacity 0.7
</style>
<svelte:head>
    <title>{ zone.name } - Autonomous Zones</title>
    <meta name="description" content={zone.description} />
</svelte:head>
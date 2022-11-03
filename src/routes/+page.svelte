<script lang="ts">
    import PageInfo from "$lib/components/PageInfo.svelte"
import Zone from "$lib/components/Zone.svelte"
import Icon from "$lib/display/Icon.svelte"
import type { Prop } from "$lib/utils/typed_props"
import Flag from "svelte-material-icons/FlagOutline.svelte"

let zones: Prop<Zone, "zone">[] = [
        {
            slug: "lumina",
            name: "Lumina",
            type: ["Proposed City", "Proposed Country", "Autonomy Movement"],
        },
        {
            slug: "city-of-telosa",
            name: "City of Telosa",
            type: ["Proposed City"],
        }
]

</script>

<div class="hero dark">
    <div class="inner padding gap">
        <h1>
            <div class="icon"><Icon icon={Flag}/></div>
            <div class="text">
                Autonomous Zones
            </div>
        </h1>
        <div class="description">
            A global index of autonomous zones, new city projects, proposed countries and more.
        </div>
    </div>
</div>
<div class="hero">
    <div class="inner padding gap">
        <h2>List of Autonomous Zones</h2>
        <div class="zones">
            {#each zones as zone}
                <Zone zone={zone}/>
            {/each}
        </div>
    </div>
</div>
<style lang="stylus">
@import "variables"

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

.zones
    display flex
    flex-direction column
    gap 16px

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
</style>
<svelte:head>
    <PageInfo
        title="Autonomous Zones"
        include_suffix={false}
        type="website"
        description="A global index of autonomous zones, new city projects, proposed countries and more."/>
</svelte:head>
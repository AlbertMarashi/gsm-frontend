<script lang="ts">
import type { Field } from "$lib/utils/validator"

type Image = {
    value: string
    url: string
}

export let images: Image[] = []
export let value: string | null = null
export let v: Field | null = null

function updateValue(val: string) {
    value = val
    v && v.touch()
}

</script>

<div class="images">
    {#each images as image}
        <div
            class="image"
            class:selected={value === image.value}
            on:click={() => updateValue(image.value)}>
            <img src={image.url} alt={image.value}>
        </div>
    {/each}
</div>
<style lang="stylus">
@import 'variables'

$size = 100px
$mobileSize = 85px
.images
    display grid
    grid-gap 10px
    grid-template-columns repeat(auto-fit, $size)
    @media (max-width: 500px)
        grid-template-columns repeat(auto-fit, $mobileSize)


.image
    border 2px solid rgba(0,0,0,0.05)
    cursor pointer
    border-radius 8px
    width $size
    height $size
    padding 2px
    display flex
    justify-content center
    align-items center
    @media (max-width: 500px)
        width $mobileSize
        height $mobileSize
    &:hover
        border 2px solid rgba(0,0,0,0.2)
    &.selected
        border 2px solid $main
    img
        width 100%
        height 100%
        object-fit contain
</style>
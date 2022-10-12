<script lang="ts">
import Flag from "svelte-material-icons/FlagOutline.svelte"

</script>
<a href="/" class="logo">
    <div class="icon">
        <Flag/>
    </div>
    <div class="text">
        AUTONOMOUS ZONES
    </div>
</a>
<style lang="stylus">
@import "variables"

.logo
    display inline-flex
    align-items center
    color white
    text-decoration none
    font-weight 600
    letter-spacing 2px
    font-size 16px
    padding 8px
    gap 8px
    .icon
        display inline-flex
        color $brand
        font-size 24px

</style>
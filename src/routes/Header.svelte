<script lang="ts">
import Logo from "$lib/display/Logo.svelte"

</script>
<header>
    <Logo/>
    <div class="right">
        <a href="/">About</a>
        <a href="/">All Zones</a>
    </div>
</header>
<style lang="stylus">
@import "variables"

header
    display flex
    align-items center
    justify-content space-between
    padding 8px
    background $dark_app
    border-bottom 1px solid transparify(white, 8%)
    position sticky
    top 0
    color white
    .right
        display flex
        gap 8px

        a
            color white
            font-weight 600
            padding 10px
            display inline-flex
            letter-spacing 2px
            align-items center
            border-radius 4px
            &:hover
                background transparify(white, 8%)
</style>
<div class="overlay-spinner">
    <Loading/>
</div>
<script>
import Loading from "$lib/controls/Loading.svelte"
</script>
<style lang="stylus">

.overlay-spinner
    display flex
    background rgba(0,0,0,0.2)
    justify-content center
    align-items center
    position absolute
    top 0
    bottom 0
    right 0
    left 0
    z-index 20

</style>

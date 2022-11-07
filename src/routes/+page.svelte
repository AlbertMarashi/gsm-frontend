<script lang="ts">
import PageInfo from "$lib/components/PageInfo.svelte"

</script>
<div class="page">
    <div class="form">
        <iframe title="Warranty Form" src="/form"/>
    </div>
</div>
<svelte:head>
    <PageInfo
        title="GSM Warranty Form"
        type="website"/>
</svelte:head>
<style lang="stylus">
@import 'variables'

.form
    max-width 600px
    max-height 750px
    height 100%
    width 100%
    background white
    display flex
    border-radius 5px
    box-shadow 0 4px 10px 0 rgba(0,0,0,0.1)
iframe
    border 0
    flex 1
    display flex;

.page
    display flex
    flex 1
    flex-direction column
    align-items center
    justify-content center
    padding 20px
    background $titanium

</style>
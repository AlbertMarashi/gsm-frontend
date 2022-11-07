<script>
import CheckboxMarked from "svelte-material-icons/CheckboxMarked.svelte"
import CheckboxOutline from "svelte-material-icons/CheckboxBlankOutline.svelte"
export let checked = true
export let text = ""

$: component = checked ? CheckboxMarked : CheckboxOutline

</script>
<div class="checkbox-component" on:click={() => checked = !checked}>
    <span class="checkbox-container">
        <svelte:component this={component}/>
    </span>
    <span class="text">
        { text }
    </span>
</div>
<style lang="stylus">
@import 'variables'

.checkbox-component
    padding 4px 0
    cursor pointer
    display flex
    align-items center

.text
    padding-left 5px
    font-weight 500
    font-size 15px

.checkbox-container
    color $main
    display inline-flex
    font-size 22px
    width 1em
    height 1em
</style>
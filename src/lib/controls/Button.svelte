<script>
import { createEventDispatcher } from "svelte"
const dispatch = createEventDispatcher()
export let disabled = false
</script>
<span
    class="button"
    class:disabled={disabled}
    on:click={e => disabled ? null : dispatch("click", e)}>
    <slot/>
</span>
<style lang="stylus">
@import 'variables'

.button
    cursor pointer
    background $main
    display inline-flex
    color white
    padding 12px 16px
    border-radius 4px
    font-size 14px
    font-weight 500
    &.disabled
        background mix($dark, transparent, 20%)

</style>
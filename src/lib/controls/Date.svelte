<div>
    <div
        on:click={()=>toggleFocus(true)}
        class="input"
        class:focus={focus}
        class:hasContent={hasContent}
        class:error={v && v.hasError}>
        <input
            on:blur={()=>toggleFocus(false)}
            on:focus={()=>toggleFocus(true)}
            bind:value={value}
            name={autocomplete}
            id={name}
            type="date"
            autocomplete={autocomplete}>
    </div>
    {#if helper}
        <div
            class="helper">
            { helper }
        </div>
    {/if}
</div>


<script lang="ts">
import type { Field } from "$lib/utils/validator"

export let name: string
export let value: string | null = null
export let error: string | null = null
export let v: Field | null = null
export let helper: string | null = null
export let autocomplete: string | null = null

let focus = false

$: hasContent = !["", undefined, null].includes(value)

function toggleFocus(val: boolean){
    if(val === false && v){
        v.touch()
    }
    focus = val !== undefined ? val : !focus
}

</script>
<style lang="stylus">
@import 'variables'

.helper
    font-size 14px
    left 5px
    bottom -10px
    padding-top: 4px
    padding-left 4px
    border-radius 3px
    color rgba(0,0,0,0.75)
    &.error
        color #ff3b3b
.input
    caret-color $main
    position relative
    width 100%
    input
        outline 0
        color $dark
        box-shadow 0 2px 4px 0 inset rgba(0,0,0,0.08)
        border 0
        margin 0
        width 100%
        font-size 16px
        background mix($dark, transparent, 5%)
        border-radius 4px
        padding-left 12px
        padding-right 12px
        padding-top 12px
        padding-bottom 12px
        --webkit-appearance none
        appearance none
        &:-webkit-autofill ~ label
            font-size 13px
            top 6px
    &.error
        caret-color #dd3b3b
        input
            color #dd3b3b

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active
    background-color transparent
    -webkit-transition-delay: 99999s
</style>
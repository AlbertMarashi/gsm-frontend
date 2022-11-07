<div
    class="input-wrapper"
    class:error={v && v.hasError}
    on:click={()=>toggleFocus(true)}
    class:focus={focus}
    class:hasContent={hasContent}>
    <div class="label" >{ name }</div>
    <div class="input-prepend">
        <div class="prepend" >
            { prepend }
        </div>
        <div
            class="input"
            on:blur={()=>toggleFocus(false)}
            on:focus={()=>toggleFocus(true)}
            bind:textContent={value}
            contenteditable="true"
            bind:this={input}
            id={name}
            />
        {#if !value}
            <div class="placeholder">
                {placeholder}
            </div>
        {/if}
    </div>
    {#if helper}
        <div
            class:error={v && v.hasError}
            class="helper">
            { helper }
        </div>
    {/if}
</div>


<script lang="ts">
import type { Field } from "$lib/utils/validator"


export let name
export let value
export let prepend
export let placeholder
export let v: Field = null
export let helper = null

let input

let focus = false

$: hasContent = !["", undefined, null].includes(value)

function toggleFocus(val){
    if(val === false && v){
        v.touch()
    }
    focus = val !== undefined ? val : !focus
    if(focus === true){
        input.focus()
    }
}

</script>
<style lang="stylus">
@import 'variables'

.label
    font-size 14px
    font-weight 500
    opacity: 0.6
    color $dark
    cursor text

.input-wrapper
    .helper
        font-size 14px
        left 5px
        padding-top: 4px
        padding-left 4px
        border-radius 3px
        color rgba(0,0,0,0.75)
        &.error
            color #ff3b3b
    .input
        caret-color $main
        outline 0
        color $dark
        border 0
        margin 0
        display inline-flex
        width auto
        --webkit-appearance none
        appearance none
    &.focus
        .label
            color $dark
    &.error
        caret-color #dd3b3b
        .label
            color #dd3b3b
            opacity 1
    &.focus, &.hasContent
        .input-prepend
            color $dark

.input-prepend
    color mix($dark, transparent, 20%)
    display inline-flex
    padding-top 8px
    padding-bottom 5px
    border-bottom 3px solid mix($dark, transparent, 10%)
    font-size 36px
    font-weight 600
    .input
        display inline-flex
        align-items center;

.placeholder
    color mix($dark, transparent, 20%)


input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active
    background-color transparent
    -webkit-transition-delay: 99999s
</style>
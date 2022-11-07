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
        <div class="input">
            <div class="placeholder">
                { formattedPlaceholder(value) }
            </div>
            <span>{ formattedAmount(value) }</span>
            {#if focus}<div class="cursor"/>{/if}
        </div>
        <input
            class="hidden-input"
            value={value}
            on:input={formatInput}
            on:blur={()=>toggleFocus(false)}
            on:focus={()=>toggleFocus(true)}
            bind:this={input}>
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
export let v: Field = null
export let helper = null

let input

let focus = false

$: hasContent = ![0, undefined, null, ""].includes(value)

function formatInput (){
    value = Number(input.value.replace(/\D/g, ""))
}

$: strValue = value.toString()

function formattedPlaceholder(){
    if(strValue.length < 3){
        let str = "0."

        str += `${strValue.length == 1 ? "0" : ""}`
        str += `${strValue === "0" ? "0" : ""}`
        return str
    }
    return ""
}

function formattedAmount(value) {
    if(value !== 0){
        let valStr = value.toString()
        let str = ""
        if(valStr.length > 2){
            str += `${valStr.slice(0, valStr.length - 2)}.`
        }
        str += valStr.slice(-2)
        return str
    }
    return ""
}

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
    .hidden-input
        caret-color $main
        outline 0
        color $dark
        border 0
        margin 0
        width 0
        display inline-flex
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

.cursor
    background $main
    height 80%
    width 2px
    animation blink 1s steps(5, start) infinite

.placeholder
    color mix($dark, transparent, 20%)

@keyframes blink
    to
        visibility hidden

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active
    background-color transparent
    -webkit-transition-delay: 99999s
</style>
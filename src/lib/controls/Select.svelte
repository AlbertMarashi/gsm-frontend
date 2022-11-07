
<div
    on:click={()=>toggleFocus(true)}
    class="input"
    class:focus={focus}
    class:hasContent={hasContent}
    class:error={v && v.hasError}>
    <select
        on:blur={()=>toggleFocus(false)}
        on:focus={()=>toggleFocus(true)}
        on:input={()=>toggleFocus(false)}
        bind:value={value}
        name={autocomplete}
        id={name}
        autocomplete={autocomplete}>
        <option value="" disabled selected>{placeholder}</option>
        {#each options as option}
            <option value={option}>{option}</option>
        {/each}
        {#if other}
            <option value="other">{other}</option>
        {/if}
    </select>
    <label class="label" for={name}>{ name }</label>
</div>

<script lang="ts">
import type { Field } from "$lib/utils/validator"

export let name: string
export let value: string | null = null
export let options: string[] = []
export let other = false
export let v: Field | null = null
export let placeholder: string | null = null
export let autocomplete: string | null = null

let focus = false

$: hasContent = !["", undefined, null].includes(value)

$: {
    if(value) toggleFocus(false)
}

function toggleFocus(val: boolean){
    if(val === false && v){
        v.touch()
    }
    focus = val !== undefined ? val : !focus
}

</script>
<style lang="stylus">
@import 'variables'

.input
    caret-color $main
    position relative
    width 100%
    select
        &:invalid
            color rgba(0,0,0,0.3)
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
        padding-top 22px
        padding-bottom 6px
        --webkit-appearance none
        appearance none
        &:-webkit-autofill ~ label
            font-size 13px
            top 6px
    .label
        font-size 16px
        position absolute
        font-weight 500
        opacity: 0.75
        font-size 13px
        top: 6px
        left 0
        color $dark
        padding-left 12px
        transition top 0.1s ease, font-size 0.1s linear
        cursor text
    &.focus
        .label
            color $dark
            font-size 13px
            top 6px
            padding-bottom 4px

    &.error
        caret-color #dd3b3b
        select
            color #dd3b3b
            option
                color $dark
        .label
            color #dd3b3b
            opacity 1

select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus,
select:-webkit-autofill:active
    background-color transparent
    -webkit-transition-delay: 99999s
</style>
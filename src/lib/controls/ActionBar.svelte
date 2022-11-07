<div class="action-container-wrapper">
    {#each messages as message}
        <div
            bind:this={elements[message.id]}
            class={'action-bar ' + message.type}
            on:click={() => remove(message.id)}>
            <div class="icon">
                <svelte:component this={icons[message.type]} size="22px"/>
            </div>
            <div class="text">
                { message.text }
            </div>
            <Close size="22px"/>
        </div>
    {/each}
</div>
<script>
import Alert from 'icons/Alert'
import Info from 'icons/AlertCircle'
import Close from 'icons/Close'
import Check from 'icons/CheckCircle'
import { onMount, tick } from 'svelte';
import { state } from '@/state'

let elements = []

let icons = {
    info: Info,
    warning: Alert,
    error: Alert,
    success: Check
}

$: messages = $state.messages

function remove(id){
    state.messages = messages = state.messages.filter(val => val.id !== id)
}

let interval = null

function intervalFn () {
    $state.messages.shift()
    setBottomHeights()
}

$: {
    if($state.messages.length === 0 && interval){
        clearInterval(interval)
        interval = null
    } else if($state.messages.length !== 0) {
        setBottomHeights()
        if(interval == null) interval = setInterval(intervalFn, 3000)
    }
}

// $: {
//     if($state.messages.length === 0){
//         clearInterval(interval)
//         interval = null
//     }
//     if($state.messages.length !== 0) {
//         if(!isServer) tick(setBottomHeights)
//         if(interval == null) interval = setInterval(intervalFn, 3000)
//     }
// }

// $: messages = $state.messages.slice(0, 4).reverse()

onMount(setBottomHeights)

async function setBottomHeights () {
    await tick()
    let elms = messages.map(message => elements[message.id])
    let heights = 0
    let margin = 10

    for(let i in elms) {
        let el = elms[i]
        let elHeight = el.offsetHeight
        heights += margin
        el.style.bottom = heights + 'px'
        heights += elHeight
    }
}

</script>
<style lang="stylus">

@import 'variables'

.action-container-wrapper
    position fixed
    bottom 10px
    left 0
    right 0
    height 0
    display flex
    align-items flex-end
    justify-content center
    .action-bar
        cursor pointer
        background #47a
        position fixed
        width 100%
        max-width 500px
        padding 8px
        font-weight 500
        box-shadow 0 0 5px rgba(0,0,0,0.1)
        border-radius 5px
        z-index 60
        color white
        transition 0.2s ease-in-out
        display grid
        grid-template-columns min-content 1fr min-content
        align-items center
        &.warning
            background #b8992a
        &.error
            background #b44
        &.success
            background #4a6
        .icon
            padding-right 8px
            display inline-block

</style>
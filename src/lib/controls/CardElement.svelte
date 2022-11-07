<script lang="ts">
import { onMount } from "svelte"
import type { Stripe, StripeCardElement } from "@stripe/stripe-js"
export let stripe: Stripe
export let cardElement: StripeCardElement

let cardEl: HTMLElement

onMount(async () => {
    var elements = stripe.elements()
    cardElement = elements.create("card")
    cardElement.mount(cardEl)
})

</script>
<div bind:this={cardEl} class="card-input"/>
<style lang="stylus">

@import 'variables'

.card-input
    outline 0
    color $dark
    box-shadow 0 2px 4px 0 inset rgba(0,0,0,0.08)
    border 0
    margin 0
    width 100%
    height 46px
    font-size 16px
    background mix($dark, transparent, 5%)
    border-radius 4px
    padding 14px 12px
</style>
<script lang="ts">
import Input from "$lib/controls/Input.svelte"
import Button from "$lib/controls/Button.svelte"
import Check from "svelte-material-icons/CheckCircle.svelte"
import { Validator, required, min } from "$lib/utils/validator"
import FlatInput from "$lib/controls/FlatInput.svelte"
import FlatAmount from "$lib/controls/FlatAmount.svelte"
import CardElement from "$lib/controls/CardElement.svelte"
import OverlayLoading from "$lib/controls/OverlayLoading.svelte"
import { loadStripe, type Stripe, type StripeCardElement } from "@stripe/stripe-js"
import { onMount } from "svelte"
import future from "$lib/utils/future"
import type { PageData } from "./$types"
import { MessageType } from "$lib/types/message"

export let data: PageData

let stripe: Stripe

onMount(async () => {
    let load_stripe = await loadStripe(data.stripe_publishable_key)
    if (!load_stripe) {
        return data.alerts.create_alert(MessageType.Error, "Stripe failed to load")
    } else {
        stripe = load_stripe
    }
})

let invoice = {
    reference: "",
    amount: 0,
    name: "",
    email: ""
}

const v = new Validator(() => invoice, {
    reference: [required],
    amount: [required, min(100)]
})

const v2 = new Validator(() => invoice, {
    email: [required],
    name: [required]
})

let page = "invoice"
let cardElement: StripeCardElement
let loading = false

async function submitPayment(){
    v2.touch()

    if(!v2.hasError){
        let { errors, data: { createPaymentIntent: clientSecret }} = await data.graph.req<{ createPaymentIntent: string }>`message createPaymentIntent(${{
            amount: invoice.amount,
            invoiceNumber: String(invoice.reference)
        }})`

        if(errors) {
            errors.map(e => data.alerts.create_alert(MessageType.Error, e))
        }

        let result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: invoice.name,
                    email: invoice.email
                }
            },
            receipt_email: invoice.email
        })

        if(result.error){
            data.alerts.create_alert(MessageType.Error, "Payment failed")
            if(typeof result.error == "string") data.alerts.create_alert(MessageType.Error, result.error)
            return
        }

        {
            let { errors } = await data.graph.req`message finalisePayment(${{paymentMethodID: result.paymentIntent.id}})`
            if(errors) {
                errors.map(e => data.alerts.create_alert(MessageType.Error, e))
            }
        }


        page = "done"

        data.alerts.create_alert(MessageType.Success, "Payment successful")
        return

    }else{
        data.alerts.create_alert(MessageType.Error, "Please fill in all fields")
    }
}

async function toPayment () {
    v.touch()
    if(!v.hasError){
        page = "payment"
    }else{
        data.alerts.create_alert(MessageType.Error, "Please fill in all fields")
    }
}

function formattedAmount(value: number) {
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

</script>
<div class="page">
    <div class="form">
        {#if loading}
            <OverlayLoading/>
        {/if}
        {#if page === "done"}
            <form class="success">
                <span class="icon">
                    <Check size="60px"/>
                </span>
                <div class="success-title">Thank you for your payment!</div>
                <p class="description">
                    You will receive a receipt via email shortly.
                </p>
            </form>
        {:else if page === "invoice"}
            <form>
                <div class="logo">
                    <img src="/images/gsm.png" alt="Gerard Sourcing & Manufacturing"/>
                </div>
                <p class="description">
                    To complete your payment, enter the correct invoice information sent by our team in the fields below.
                </p>
                <div class="inputs-group">
                    <FlatInput
                        name='Invoice Number'
                        prepend='INV-'
                        placeholder='000000'
                        bind:value={invoice.reference}
                        v={$v.fields.reference}/>
                </div>
                <div class="inputs-group">
                    <FlatAmount
                        name='Payment Amount'
                        prepend='$'
                        bind:value={invoice.amount}
                        v={$v.fields.amount}/>
                </div>
                <div class="inputs-group">
                    <Button on:click={() => future(toPayment(), status => loading = status)}>
                        Continue
                    </Button>
                </div>
            </form>
        {:else if page === "payment"}
            <form>
                <div class="logo">
                    <img src="/images/gsm.png" alt="Gerard Sourcing & Manufacturing"/>
                </div>
                <div class="inputs-group">
                    <Input
                        name='Email'
                        autocomplete='email'
                        bind:value={invoice.email}
                        v={$v2.fields.email}/>
                </div>
                <div class="inputs-group">
                    <Input
                        name='Name on Card'
                        autocomplete='name'
                        bind:value={invoice.name}
                        v={$v2.fields.name}/>
                </div>
                <div class="inputs-group">
                    {#if stripe}
                        <CardElement bind:cardElement bind:stripe/>
                    {/if}
                </div>
                <div class="inputs-group">
                    <Button on:click={() => future(submitPayment(), status => loading = status)}>
                        Pay ${formattedAmount(invoice.amount)}
                    </Button>
                </div>
            </form>
        {/if}
    </div>
</div>
<style lang="stylus">
@import 'variables'

.success
    display flex
    align-items center
    justify-content center
    flex-direction column
    text-align center
    .icon
        color #4a6
    .success-title
        font-size 24px
        font-weight 500
        padding-top 5px

.page
    display flex
    flex 1
    align-items center
    justify-content center
    background $titanium

.form
    max-width 600px
    max-height 750px
    height 100%
    width 100%
    background white
    position relative
    display flex
    overflow hidden
    border-radius 5px
    box-shadow 0 4px 10px 0 rgba(0,0,0,0.1)

form
    padding 40px 20px
    max-width 450px
    margin auto
    width 100%

    color $dark


.inputs-group
    padding 10px 0


.logo
    display flex
    justify-content center
    padding-bottom 40px
    img
        max-height 60px

.description
    margin 0
    font-size 18px
    padding 20px 0
    text-align center
</style>
<script lang="ts">
import Input from "$lib/controls/Input.svelte"
import Date from "$lib/controls/Date.svelte"
import ImageSelector from "$lib/controls/ImageSelector.svelte"
import Select from "$lib/controls/Select.svelte"
import Button from "$lib/controls/Button.svelte"
import Checkbox from "$lib/controls/Checkbox.svelte"
import Check from "svelte-material-icons/CheckCircle.svelte"
import { Validator, required } from "$lib/utils/validator"
import type { PageData } from "./$types"
import { MessageType } from "$lib/types/message"

export let data: PageData

let customer = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    brandPurchased: "Mistral",
    // productCategory: null,
    datePurchased: null,
    state: null,
    postCode: "",
    agreeToMarketing: true,
    wherePurchased: ""
}

const v = new Validator(()=>customer, {
    firstName: [required],
    lastName: [required],
    email: [required],
    phoneNumber: [required],
    datePurchased: [required],
    state: [required],
    postCode: [required],
    wherePurchased: [required],
})

let done = false

async function submitRegistration(){
    v.touch()

    if(!v.hasError){
        let { errors } = await data.graph.req`message createWarrantyRegistration(${customer})`
        if(errors) {
            errors.map(e => data.alerts.create_alert(MessageType.Error, e))
        }

        done = true
        data.alerts.create_alert(MessageType.Success, "Thank you for your warranty registration")
    }else{
        data.alerts.create_alert(MessageType.Error, "Please fill out all of the form fields")
    }
}

let states = [
    "New South Wales",
    "Queensland",
    "South Australia",
    "Tasmania",
    "Victoria",
    "Western Australia",
    "Australian Capital Territory",
    "Jervis Bay Territory",
    "Northern Territory"
]

let wherePurchased = [
    {
        value: "Mistral Online",
        url: "/images/mistral.png"
    },
    {
        value: "The Reject Shop",
        url: "/images/brands/the-reject-shop.png"
    },
    {
        value: "Stratco",
        url: "/images/brands/stratco.png"
    },
    {
        value: "Target",
        url: "/images/brands/target.png"
    },
    {
        value: "Harris Scarfe",
        url: "/images/brands/harris-scarfe.png"
    },
    {
        value: "Aldi",
        url: "/images/brands/aldi.png"
    },
    {
        value: "Australia Post",
        url: "/images/brands/australia-post.png"
    },
    {
        value: "Spotlight",
        url: "/images/brands/spotlight.png"
    },
    {
        value: "Woolworths",
        url: "/images/brands/woolworths.png"
    },
    {
        value: "Bunnings",
        url: "/images/brands/bunnings.png"
    }
]

</script>
{#if done}
        <div class="page">
            <form class="success">
                <span class="icon">
                    <Check size="60px"/>
                </span>
                <div class="success-title">Your warranty registration has been submitted</div>
            </form>
        </div>
    {:else}
    <div class="page">
        <form>
            <div class="logo">
                <img src="/images/mistral.png" alt="Mistral"/>
            </div>
            <h2>Warranty Registration</h2>
            <h1>Register Your Product</h1>
            <div class="inputs-group">
                <h3>Personal Information</h3>
                <div class="inputs">
                    <div class="input-group">
                        <Input
                            name='First Name'
                            autocomplete='given_name'
                            bind:value={customer.firstName}
                            v={$v.fields.firstName}/>
                        <Input
                            name='Last Name'
                            autocomplete='family_name'
                            bind:value={customer.lastName}
                            v={$v.fields.lastName}/>
                    </div>
                    <div class="input-group">
                        <Select
                            name='State'
                            autocomplete='state'
                            placeholder="Select state"
                            options={states}
                            bind:value={customer.state}
                            v={$v.fields.state}/>
                        <Input
                            name='Post Code'
                            autocomplete='postal_code'
                            bind:value={customer.postCode}
                            v={$v.fields.postCode}/>
                    </div>
                </div>
            </div>
            <div class="inputs-group">
                <h3>Contact Information</h3>
                <div class="inputs">
                    <div class="input-group">
                        <Input
                            name='Email'
                            autocomplete='email'
                            bind:value={customer.email}
                            v={$v.fields.email}/>
                    </div>
                    <div class="input-group">
                        <Input
                            name='Phone Number'
                            autocomplete='phone'
                            bind:value={customer.phoneNumber}
                            v={$v.fields.phoneNumber}/>
                    </div>
                </div>
            </div>
            <div class="inputs-group">
                <h3>Where did you purchase your product?</h3>
                {#if $v.fields.wherePurchased.hasError}
                    <p class="error">Please select or enter where you purchased your product</p>
                {/if}
                <div class="inputs">
                    <div class="brand-select">
                        <ImageSelector
                            v={$v.fields.wherePurchased}
                            images={wherePurchased}
                            bind:value={customer.wherePurchased}/>
                    </div>
                    <div class="input-group">
                        <Input
                            name='Purchased From'
                            bind:value={customer.wherePurchased}
                            v={$v.fields.wherePurchased}
                            helper="Select a purchase location, or enter a custom location"/>
                    </div>
                </div>
            </div>
            <div class="inputs-group">
                <h3>Date purchased</h3>
                <div class="inputs">
                    <div class="input-group">
                        <Date
                            name="Date Purchased"
                            bind:value={customer.datePurchased}
                            v={$v.fields.datePurchased}/>
                    </div>
                </div>
            </div>
            <div class="inputs-group">
                <Checkbox bind:checked={customer.agreeToMarketing} text="Do you wish to receive offers & deals about new products?"/>
            </div>
            <div class="inputs-group">
                <Button on:click={submitRegistration}>
                    Register for warranty
                </Button>
            </div>
        </form>
    </div>
{/if}
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

.input-group
    display grid
    grid-auto-flow column
    grid-gap 10px
    width 100%
    @media (max-width: 500px)
        grid-auto-flow row

.page
    display flex
    flex 1
    align-items center
    justify-content center
    background white

form
    padding 40px 20px
    max-width 500px
    width 100%

    color $dark
    h2
        font-weight 400
        font-size 20px
        opacity 0.5
        margin 0
    h1
        font-size 28px
        font-weight 500
        margin 0
        padding-top 10px
        padding-bottom 10px
        border-bottom 1px solid rgba(0,0,0,0.1)
    h3
        font-size 18px
        padding-top 10px
        font-weight 600
        margin 0


.inputs-group
    padding 10px 0

.inputs
    display grid
    grid-gap 10px
    padding-top 10px

.logo
    padding 40px 0
    img
        max-height 40px

p.error
    font-weight 500
    margin-top 5px
    margin-bottom 10px
    color #dd3b3b
</style>
<script lang="ts">
import { goto } from "$app/navigation"
import Button from "$lib/controls/Button.svelte"
import Input from "$lib/controls/Input.svelte"
import { MessageType } from "$lib/types/message"
import { set_cookie } from "$lib/utils/cookie"
import type { PageData } from "./$types"

export let data: PageData

let code = ""

async function submitRegistration(){
    let { errors, data: { loginUser } } = await data.graph.req<{ loginUser: string }>`message loginUser(${{
        token: code
    }})`

    if(errors){
        errors.map(error => data.alerts.create_alert(MessageType.Error, error))
    }

    data.graph.auth_token = loginUser

    set_cookie("token", loginUser)

    await goto("/export")

    data.alerts.create_alert(MessageType.Success, "You have succesfully authenticated")
}
</script>
<div class="page">
    <div class="form">
        <div class="logo">
            <img src="/images/gsm.png" alt="GSM Logo"/>
        </div>
        <h1>Warranty Login</h1>
        <div class="inputs">
            <Input bind:value={code} name="Login Code"/>
            <div>
                <Button on:click={submitRegistration}>Log In</Button>
            </div>
        </div>
    </div>
</div>
<style lang="stylus">
@import 'variables'

.form
    padding 100px 20px
    max-width 600px
    width 100%
    background white
    border-radius 5px
    box-shadow 0 4px 10px 0 rgba(0,0,0,0.1)

.logo
    display flex
    justify-content center
    padding 20px 0
    img
        max-height 60px

h1
    font-size 24px
    text-align center
    font-weight 600

.page
    display flex
    flex 1
    flex-direction column
    align-items center
    justify-content center
    padding 20px
    background $titanium

.inputs
    display grid
    max-width 400px
    margin auto
    padding 10px 0
    grid-gap 10px
</style>
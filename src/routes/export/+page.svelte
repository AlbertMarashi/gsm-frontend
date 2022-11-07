<script lang="ts">
import Button from "$lib/controls/Button.svelte"
import type { PageData } from "./$types"

export let data: PageData

function exportCSV(){
    (window as Window).location = `${data.api_domain}/api/csv`
}

</script>
<div class="page" >
    <div class="form">
        <div class="logo">
            <img src="/images/gsm.png" alt="GSM Logo"/>
        </div>
        <h1>Export Warranty Registration Data</h1>
        <p>Export warranty data into a .csv file.</p>
        <Button on:click={exportCSV}>Export to .CSV</Button>
    </div>
</div>
<style lang="stylus">
@import 'variables'

.form
    padding 40px 40px
    max-width 600px
    width 100%
    background white
    border-radius 5px
    box-shadow 0 4px 10px 0 rgba(0,0,0,0.1)
    display flex
    gap 16px
    flex-direction column
    align-items flex-start

.logo
    display flex
    justify-content center
    padding 20px 0
    img
        max-height 60px

h1
    font-size 24px
    font-weight 600

p
    font-size 16px
    opacity 0.7

.page
    display flex
    flex 1
    align-items center
    padding 20px
    flex-direction column
    background $titanium

</style>
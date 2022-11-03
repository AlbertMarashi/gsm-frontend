<script lang="ts">
import { goto } from "$app/navigation"
import Button from "$lib/controls/Button.svelte"
import Input from "$lib/controls/Input.svelte"
import { zones, criteria, CriteriaType } from "$lib/stores/capacity_index"

let new_zone = {
    name: "",
    code: "",
}

async function add_zone() {
    $zones[new_zone.code] = new_zone

    await goto(`/index/zone/${new_zone.code}`)

    new_zone = {
        name: "",
        code: "",
    }
}

let new_criterion = {
    name: "",
    weight: "",
}

async function add_criterion() {
    let weight = parseFloat(new_criterion.weight)
    if (isNaN(weight)) {
        alert("Weight must be a number")
    }

    let id = crypto.getRandomValues(new Uint32Array(1))[0].toString(16)

    $criteria[id] = {
        name: new_criterion.name,
        type: CriteriaType.Additive,
        weight,
        id,
        multiplier_criteria: [],
    }

    new_criterion = {
        name: "",
        weight: "",
    }

    await goto(`/index/criterion/${id}`)
}

</script>

<div class="wrapper">
    <div class="inner">
        <h2>Zones</h2>
        <div class="zones">
            {#each Object.values($zones) as zone}
                <a class="box" href={`/index/zone/${zone.code}`}>
                    <h3>{zone.name}</h3>
                    <div class="code">{zone.code}</div>
                </a>
            {/each}
        </div>
        <div class="controls">
            <Input
                name="Zone Name"
                placeholder="eg: Autonomous Province of Kosovo"
                bind:value={new_zone.name}>
            </Input>
            <Input
                name="Zone Code"
                placeholder="eg: LUM"
                bind:value={new_zone.code}>
            </Input>
            <Button on:click={add_zone}>
                Add Zone
            </Button>
        </div>
    </div>
</div>
<div class="wrapper">
    <div class="inner">
        <h2>Criteria</h2>
        <div class="criteria">
            {#each Object.values($criteria) as criterion}
                <a class="box" href={`/index/criterion/${criterion.id}`}>
                    <h3>{criterion.name}</h3>
                    <div class="code">{criterion.id}</div>
                </a>
            {/each}
        </div>
        <div class="controls">
            <Input
                name="Criterion Name"
                placeholder="eg: Ability to enforce tax laws"
                bind:value={new_criterion.name}>
            </Input>
            <Input
                name="Criterion Weight"
                placeholder="eg: 10"
                bind:value={new_criterion.weight}>
            </Input>
            <Button on:click={add_criterion}>
                Add Criterion
            </Button>
        </div>
    </div>
</div>

<style lang="stylus">
@import "variables"

.inner
    max-width 1000px
    padding 32px 16px
    gap 16px
    display flex
    flex-direction column
    width 100%
    margin 0 auto
.wrapper
    border-bottom 1px solid transparify(white, 10%)

.controls
    display flex
    flex-direction column
    gap 16px
    max-width 400px

.box
    border 1px solid transparify(white, 10%)
    border-radius 8px
    padding 16px
    margin-bottom 16px
    color white
    gap 8px
    display flex
    flex-direction column
    .code
        font-weight bold
        opacity 0.5

</style>
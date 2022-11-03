<script lang="ts">
import Input from "$lib/controls/Input.svelte"
import { criteria } from "$lib/stores/capacity_index"
import type { PageData } from "./$types"

export let data: PageData

$: criterion = $criteria[data.criterion]

</script>

{#if criterion}
    <h1>{ criterion.name }</h1>
    <Input
        name="Weight"
        value={criterion.weight}
        on:input={e => {
            criterion.weight = parseFloat(e.detail)
            $criteria = $criteria
        }}
        type="number"
        />

{:else}
    <h2>Criterion not found</h2>
    <p>Sorry, we couldn't find a zone with the code {data.criterion}</p>
{/if}
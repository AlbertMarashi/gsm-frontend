<script lang="ts">
import { calculate_score, calculate_max_score, criteria, zones, criteria_ratings } from "$lib/stores/capacity_index"
import type { PageData } from "./$types"

export let data: PageData

$: zone = $zones[data.zone]

$: total_score = calculate_score($criteria, $criteria_ratings, data.zone)
$: max_score = calculate_max_score($criteria)
$: rating = total_score.score / max_score
$: uncertainty = total_score.uncertainty / max_score
</script>

{#if zone}
    <h1>{ zone.name }</h1>
    <h2>Rating: {rating.toFixed(4)} ±{uncertainty.toFixed(4)}</h2>
    <h2>Score: {total_score.score}/{max_score}</h2>
{:else}
    <h2>Zone not found</h2>
    <p>Sorry, we couldn't find a zone with the code {data.zone}</p>
{/if}
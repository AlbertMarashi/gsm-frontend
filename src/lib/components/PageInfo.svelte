<script lang="ts">
import { page } from "$app/stores"

export let title: string
export let image: string | undefined = undefined
export let description: string | undefined = undefined
export let type: "website" | "article"
export let site_name = "GSM Warranty"

$: url = `https://${$page.url.host}${$page.url.pathname}${$page.url.search}`
</script>
<title>{ title }</title>
{#if description}
    <meta name="description" content={description}>
    <meta property="og:description" content={description}>
{/if}
<meta property="og:title" content={title}>
<meta property="og:url" content={url}>
{#if image}
    <meta property="og:image" content={image}>
{/if}
<meta property="og:site_name" content={site_name}>
<meta property="og:type" content={type}>
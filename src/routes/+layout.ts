import { alerts_init } from "$lib/stores/alerts"
import { graph_init } from "$lib/stores/graph"
import type { LayoutLoad } from "./$types"

export const load: LayoutLoad = async load_event => {
    const auth_token = load_event.data?.auth_token || null
    const domain = load_event.data?.api_domain || null
    const alerts = alerts_init([])
    const graph = graph_init(auth_token, domain)

    return {
        stripe_publishable_key: load_event.data?.stripe_publishable_key,
        alerts,
        graph,
        api_domain: domain,
    }
}
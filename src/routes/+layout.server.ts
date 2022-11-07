import { env } from "$env/dynamic/private"
import { get_cookies_from_string } from "$lib/utils/cookie"
import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async load_event => {
    const cookies = load_event.request.headers.get("cookie")
    const auth_token = cookies ? get_cookies_from_string("token", cookies) : null
    const stripe_publishable_key = env.STRIPE_PUBLISHABLE_KEY as string
    return {
        auth_token,
        // the DOMAIN variable should be passed into the frontend container
        api_domain: env.API_SERVER || null,
        stripe_publishable_key,
    }
}
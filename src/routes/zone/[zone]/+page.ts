
import type { Zone } from "$lib/types/Zone"
import zone_imports from "$lib/zones"
import { error } from "@sveltejs/kit"
import type { PageLoad } from "./$types"

type ZoneImport = () => Promise<{ default: Zone }>

const zones: { [key: string]: ZoneImport } = {}

for (const [path, import_fn] of Object.entries(zone_imports)) {
    // zone looks like "./lumina/data.ts" or "./lumina/content.md"
    const zone_name = path.split("/")[1]


    zones[zone_name] = import_fn
}

export const load: PageLoad = async ({ params }) => {
    console.log(zones)
    const zone_slug = params.zone

    const zone = zones[zone_slug]
    if (!zone) {
        throw error(404, `Zone ${zone_slug} not found`)
    }

    return {
        zone: (await zone()).default,
    }
}
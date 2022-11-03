import type { Zone } from "$lib/types/Zone"

export default import.meta.glob("./**/*.ts") as {
    [key: string]: () => Promise<{ default: Zone}>
}
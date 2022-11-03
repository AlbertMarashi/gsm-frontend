import type { Zone } from "$lib/types/Zone"
import content from "./content.md?raw"

const zone: Zone = {
    name: "Lumina",
    tags: ["Proposed Autonomous City", "Proposed Country"],
    description: "A proposed autonomous sovereign city in Northern Australia.",
    location: "Northern Australia",
    content,
    currency: "Aura",
    demonym: "Luminar",
    language: "Luminar English",
    population: 2120,
    website: "https://lumina.earth",
}

export default zone


import { writable } from "svelte-local-storage-store"
import type { Writable } from "svelte/store"

export type Zone = {
    name: string
    code: string
}

export enum CriteriaType {
    Multiplier, // behaves like a multiplier, does not add to score
    Additive, // can be used as a multiplier, but also adds to score
}

export type Criteria =  {
    id: string
    type: CriteriaType,
    name: string
    weight: number
    multiplier_criteria: string[]
}

export type ZoneMap = { [key: string]: Zone }
export type CriteriaMap = { [key: string]: Criteria }
export type CriteriaRatingMap = { [key: string]: CriteriaRating }

export const zones: Writable<ZoneMap> = writable("zones", {})
export const criteria: Writable<CriteriaMap> = writable("criteria", {})
export const criteria_ratings: Writable<CriteriaRatingMap> = writable("criteria_ratings", {})

enum CriteriaRatingValue {
    Unknown
}

export type RatingResult = CriteriaRatingValue | number

export type CriteriaRating = {
    id: string,
    criteria_id: string
    rating: number | CriteriaRatingValue // between 0 and 1
    zone: string // zone code this rating applies to
    date: Date
}

export function calculate_max_score(criteria_map: CriteriaMap): number {
    return Object.values(criteria_map).reduce((acc, cur) => {
        if (cur.type === CriteriaType.Additive) {
            return calculate_max_value(cur, criteria_map)
        } // multiplier criteria do not add to score
        return acc
    }, 0)
}

function calculate_max_value(criteria: Criteria, criteria_map: CriteriaMap): number {
    return criteria.weight * criteria.multiplier_criteria.map(id => calculate_max_value(criteria_map[id], criteria_map)).reduce((acc, cur) => acc + cur, 1)
}

export type RatingOutput = { score: number, uncertainty: number }

export function calculate_score(criteria_map: CriteriaMap, criteria_rating_map: CriteriaRatingMap, zone: string): RatingOutput {
    const rating_output: RatingOutput = { score: 0, uncertainty: 0 }
    const criteria_ratings_for_this_zone = Object.values(criteria_rating_map).filter(rating => rating.zone === zone)

    function calculate_criteria_output(criteria: Criteria): RatingOutput {
        function get_rating_for_this_zone(criteria_id: string): CriteriaRating | undefined {
            return criteria_ratings_for_this_zone.find(rating => rating.criteria_id === criteria_id)
        }

        function calculate_criteria_value(criteria: Criteria): number | CriteriaRatingValue {
            const rating = get_rating_for_this_zone(criteria.id)
            if (rating) {
                return rating.rating * criteria.weight * criteria.multiplier_criteria.map(id => calculate_criteria_value(criteria_map[id])).reduce((acc, cur) => acc + cur, 1)
            }
            return CriteriaRatingValue.Unknown
        }

        const max_rating = calculate_max_value(criteria, criteria_map)
        const rating = calculate_criteria_value(criteria)

        if (rating == CriteriaRatingValue.Unknown) {
            return { score: max_rating / 2, uncertainty: max_rating }
        }

        return { score: rating, uncertainty: 0 }
    }

    for (const criteria_id in criteria_map) {
        const criteria = criteria_map[criteria_id]

        if (criteria.type === CriteriaType.Additive) {
            // here we calculate the score for additive criteria
            const rating = calculate_criteria_output(criteria)
            rating_output.score += rating.score
            rating_output.uncertainty += rating.uncertainty
        }
    }

    return rating_output
}


export function evaluate_rating_value(zone: string, criteria_id: string, criteria_ratings: CriteriaRatingMap, criteria_map: CriteriaMap): RatingResult {
    const rating = Object.values(criteria_ratings).find(rating => rating.criteria_id === criteria_id && rating.zone === zone)
    const criteria = criteria_map[criteria_id]

    if (rating && criteria.type === CriteriaType.Additive) {
        if (rating.rating === CriteriaRatingValue.Unknown) {
            return CriteriaRatingValue.Unknown
        }
    }
}
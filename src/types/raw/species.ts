import type { RawNamedResource } from "#/types/generic"

export type RawFlavorTextEntry = {
	flavor_text: string
	language: RawNamedResource
}

export type RawVariety = {
	is_default: boolean
	pokemon: RawNamedResource
}

export interface RawSpecies {
	id: number
	capture_rate: number
	color: RawNamedResource
	egg_groups: RawNamedResource[]
	evolution_chain: {
		url: string
	}
	flavor_text_entries: RawFlavorTextEntry[]
	gender_rate: number
	generation: RawNamedResource
	growth_rate: RawNamedResource
	habitat: RawNamedResource | null
	hatch_counter: number
	is_baby: boolean
	is_legendary: boolean
	is_mythical: boolean
	name: string
	shape: RawNamedResource
	varieties: RawVariety[]
}

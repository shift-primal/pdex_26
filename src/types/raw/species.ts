import type { RawName, RawNamedResource } from "#/types/generic"

export type RawFlavorText = {
	flavor_text: string
	language: RawNamedResource
}

export type RawPokemonSpeciesVariety = {
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
	flavor_text_entries: RawFlavorText[]
	gender_rate: number
	generation: RawNamedResource
	growth_rate: RawNamedResource
	habitat: RawNamedResource | null
	hatch_counter: number
	is_baby: boolean
	is_legendary: boolean
	is_mythical: boolean
	name: string
	names: RawName[]
	shape: RawNamedResource
	varieties: RawPokemonSpeciesVariety[]
}

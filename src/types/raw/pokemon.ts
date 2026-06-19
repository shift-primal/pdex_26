import type { RawNamedResource } from "#/types/generic"

export type RawPokemonType = {
	slot: number
	type: RawNamedResource
}

export interface RawSpriteSet {
	front_default: string | null
	front_shiny: string | null

	front_female: string | null
	front_shiny_female: string | null

	back_default: string | null
	back_female: string | null

	back_shiny: string | null
	back_shiny_female: string | null
}

export interface RawPokemonSprites extends RawSpriteSet {
	"other": {
		"home": RawSpriteSet
		"official-artwork": RawSpriteSet
	}
}

export type RawPokemonStat = {
	base_stat: number
	stat: RawNamedResource
}

export type RawPokemonCries = {
	latest: string | null
	legacy: string | null
}

export interface RawPokemon {
	id: number
	name: string
	height: number
	weight: number
	types: RawPokemonType[]
	stats: RawPokemonStat[]
	sprites: RawPokemonSprites
	cries: RawPokemonCries
	species: RawNamedResource
	is_default: boolean
	forms: RawNamedResource[]
}

import type { RawNamedResource } from "#/types/generic"

export type RawElementalType = {
	slot: number
	type: RawNamedResource
}

export interface RawSpriteSetBasic {
	front_default: string | null
	front_shiny: string | null
}

export interface RawSpriteSetFull extends RawSpriteSetBasic {
	back_default: string | null
	back_female: string | null
	back_shiny: string | null
	back_shiny_female: string | null
	front_female: string | null
	front_shiny_female: string | null
}

export type RawSprites = {
	other: {
		showdown: RawSpriteSetFull
		"official-artwork": RawSpriteSetBasic
	}
	versions: {
		"generation-v": {
			"black-white": {
				animated: RawSpriteSetFull
			}
		}
	}
}

export type RawStat = {
	base_stat: number
	stat: RawNamedResource
}

export type RawCries = {
	latest: string | null
	legacy: string | null
}

export interface RawPokemon {
	id: number
	name: string
	height: number
	weight: number
	types: RawElementalType[]
	stats: RawStat[]
	sprites: RawSprites
	cries: RawCries
	species: RawNamedResource
	is_default: boolean
	forms: RawNamedResource[]
}

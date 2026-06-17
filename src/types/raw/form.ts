import type { RawNamedResource } from "#/types/generic"
import type { RawElementalType, RawSpriteSetFull } from "#/types/raw/pokemon"

export type RawFormName = {
	name: string
	language: RawNamedResource
}

export interface RawPokemonForm {
	id: number
	name: string
	form_name: string
	form_names: RawFormName[]
	names: RawFormName[]
	is_default: boolean
	is_battle_only: boolean
	is_mega: boolean
	sprites: RawSpriteSetFull
	types: RawElementalType[]
	version_group: RawNamedResource
}

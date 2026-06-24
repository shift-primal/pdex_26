import type { RawName, RawNamedResource } from "#/types/generic"
import type { RawPokemonType, RawSpriteSet } from "#/types/raw/pokemon"

export interface RawPokemonForm {
	id: number
	name: string
	form_name: string
	form_names: RawName[]
	names: RawName[]
	is_default: boolean
	is_battle_only: boolean
	is_mega: boolean
	sprites: RawSpriteSet
	types: RawPokemonType[]
	version_group: RawNamedResource
}

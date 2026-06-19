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
	// The docs' PokemonFormSprites table lists only 4 fields, but the live API returns the full flat
	// set (female/back variants included, often null) — and we derive HOME urls from these.
	sprites: RawSpriteSet
	types: RawPokemonType[]
	version_group: RawNamedResource
}

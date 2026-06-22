import type { RawName, RawNamedResource } from "#/types/generic"

type VerboseEffect = {
	effect: string
	short_effect: string
	language: RawNamedResource
}

export interface RawAbility {
	id: number
	name: string
	names: RawName[]
	effect_entries: VerboseEffect[]
}

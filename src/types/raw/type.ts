import type { RawNamedResource } from "#/types/generic"

type RawDamageRelations = {
	no_damage_to: RawNamedResource[]
	half_damage_to: RawNamedResource[]
	double_damage_to: RawNamedResource[]

	no_damage_from: RawNamedResource[]
	half_damage_from: RawNamedResource[]
	double_damage_from: RawNamedResource[]
}

/** Detail from `/type/{n}` — parallels RawAbility from `/ability/{n}`. */
export interface RawType {
	id: number
	name: string
	damage_relations: RawDamageRelations
	pokemon: { slot: number; pokemon: RawNamedResource }[]
}

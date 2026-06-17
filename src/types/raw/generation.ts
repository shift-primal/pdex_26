import type { RawNamedResource } from "#/types/generic"

export interface RawGeneration {
	id: number
	main_region: RawNamedResource
	name: string
	pokemon_species: RawNamedResource[]
}

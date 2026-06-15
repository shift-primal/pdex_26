import type { ELEMENTAL_TYPES } from "#/config/elemental-types"
import type { STATS } from "#/config/stats"
import type { Icon } from "@phosphor-icons/react"

export type ElementalTypeName = keyof typeof ELEMENTAL_TYPES
export type StatName = keyof typeof STATS

export type PokemonElementalType = {
	name: ElementalTypeName
	color: string
	icon: string
}

export type PokemonStat = {
	color: string
	name: StatName
	value: number
	icon: Icon
}

type PokemonSpriteSet = {
	default: string | null
	female: string | null
	shiny: string | null
}

export type PokemonSprites = {
	front: PokemonSpriteSet
	back: PokemonSpriteSet
}

export type PokemonCries = {
	latest: string | null
	legacy: string | null
}

export type PokemonForm = {
	isDefault: boolean
	name: string
}

export type PokemonClassification = {
	isBaby: boolean
	isLegendary: boolean
	isMythical: boolean
}

export type PokemonEvolutionNode = {
	name: string
	isBaby: boolean
	evolvesTo: PokemonEvolutionNode[]
}

export type PokemonGeneration = {
	id: number
	name: string
	region: string
	pokemon: string[]
}

export interface Pokemon {
	id: number
	name: string
	sprites: PokemonSprites
	types: PokemonElementalType[]
	captureRate: number
	classification: PokemonClassification
	color: string
	eggGroups: string[]
	cries: PokemonCries
	evolution: PokemonEvolutionNode
	flavorText: string
	forms: PokemonForm[]
	genderRate: number
	generation: PokemonGeneration
	growthRate: number
	habitat: string
	hatchCounter: number
	height: number
	isDefault: boolean
	shape: string
	stats: PokemonStat[]
	weight: number
}

export type PokemonBasic = Pick<
	Pokemon,
	"id" | "name" | "sprites" | "types" | "isDefault" | "stats" | "height" | "weight"
>

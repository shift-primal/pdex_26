import type { TypeName } from "#/theme/pokemon-types.theme"
import type { StatName } from "#/theme/stats.theme"

export type { TypeName, StatName }

export const GENDERS = ["male", "female"] as const
export type Gender = (typeof GENDERS)[number]

/** Reference to an ability as listed on a variety (/pokemon) — no effect text, just where to fetch it. */
export type AbilityRef = {
	name: string
	url: string
	isHidden: boolean
}

/** Resolved ability detail fetched from /ability/{n}. */
export type Ability = {
	name: string
	displayName: string
	effect: string
}

/** Reference to a type as listed on a variety (/pokemon) — no damage relations, just where to fetch it. */
export type TypeRef = {
	slot: number
	name: TypeName
	url: string
}

export type Damage = {
	noDamage: TypeName[]
	halfDamage: TypeName[]
	doubleDamage: TypeName[]
}

type TypeRelations = {
	incoming: Damage
	outgoing: Damage
}

/** Resolved type details fetched from /type/{n}. */
export type PokemonType = {
	name: TypeName
	relations: TypeRelations
}

export type PokemonStat = {
	name: StatName
	value: number
}

type SpriteVariants = { normal: string | null; shiny: string | null } // shiny or not

type GenderedSprites = { default: SpriteVariants; female: SpriteVariants } // "default" = canonical / male / genderless

export type PokemonSprites = { front: GenderedSprites; back: GenderedSprites }

export type PokemonCries = {
	latest: string | null
	legacy: string | null
}

export type PokemonClassification = {
	isBaby: boolean
	isLegendary: boolean
	isMythical: boolean
}

export type PokemonEvolutionChainLink = {
	name: string
	isBaby: boolean
	evolvesTo: PokemonEvolutionChainLink[]
}

export type PokemonGeneration = {
	id: number
	name: string
	region: string
	pokemon: string[]
}

/** A reference to one of a species' varieties (the API's `varieties` list). */
export type VarietyRef = {
	name: string
	isDefault: boolean
}

export type Variety = {
	id: number
	name: string
	abilities: AbilityRef[]
	sprites: PokemonSprites
	types: TypeRef[]
	stats: PokemonStat[]
	height: number
	weight: number
	isDefault: boolean
	forms: string[]
}

/**
 * A `/pokemon-form` — a sub-variation of a single Variety, usually cosmetic
 * (e.g. Unown letters, Vivillon patterns). Most varieties have only the default.
 */
export type Form = {
	name: string
	/** Raw form slug, e.g. "mega", "attack", or "" for the default. */
	formName: string
	/** Short form label (English `form_names`), e.g. "Mega X", "Fire Type", "A". */
	label: string
	/** Full display name (English `names`), e.g. "Mega Charizard X", "Fire Arceus", "Unown A". */
	displayName: string
	isDefault: boolean
	isMega: boolean
	isBattleOnly: boolean
	sprites: PokemonSprites
	types: TypeRef[]
}

export interface Species {
	id: number
	name: string
	captureRate: number
	classification: PokemonClassification
	color: string
	cries: PokemonCries
	eggGroups: string[]
	evolution: PokemonEvolutionChainLink
	flavorText: string
	varieties: VarietyRef[]
	genderRate: number
	generation: PokemonGeneration
	growthRate: number
	habitat: string
	hatchCounter: number
	shape: string
}

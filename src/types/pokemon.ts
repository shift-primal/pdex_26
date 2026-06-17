import type { ElementalTypeName } from "#/theme/elemental-types.theme"
import type { StatName } from "#/theme/stats.theme"

export type { ElementalTypeName, StatName }

export type PokemonElementalType = {
	name: ElementalTypeName
}

export type PokemonStat = {
	name: StatName
	value: number
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

/** A reference to one of a species' varieties (the API's `varieties` list). */
export type VarietyRef = {
	name: string
	isDefault: boolean
}

/** A concrete `/pokemon` — varies between the varieties of a single species. */
export type Variety = {
	id: number
	name: string
	sprites: PokemonSprites
	types: PokemonElementalType[]
	stats: PokemonStat[]
	height: number
	weight: number
	isDefault: boolean
	/** Names of this variety's `/pokemon-form` entries (usually just the default). */
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
	types: PokemonElementalType[]
}

/** Variety-invariant data — shared across every variety of a species. */
export interface Species {
	id: number
	name: string
	captureRate: number
	classification: PokemonClassification
	color: string
	cries: PokemonCries
	eggGroups: string[]
	evolution: PokemonEvolutionNode
	flavorText: string
	varieties: VarietyRef[]
	genderRate: number
	generation: PokemonGeneration
	growthRate: number
	habitat: string
	hatchCounter: number
	shape: string
}

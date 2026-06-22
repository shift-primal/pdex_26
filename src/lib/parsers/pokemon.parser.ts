import { withFallback } from "#/lib/utils"
import { TYPE_THEME } from "#/theme/elemental-types.theme"
import { STAT_THEME } from "#/theme/stats.theme"
import type { RawName } from "#/types/generic"
import type {
	Ability,
	ElementalTypeName,
	Form,
	PokemonEvolutionChainLink,
	PokemonSprites,
	PokemonStat,
	PokemonType,
	Species,
	StatName,
	Variety
} from "#/types/pokemon"
import type { RawAbility } from "#/types/raw/ability"
import type { RawEvolutionChain, RawEvolutionChainLink } from "#/types/raw/evolution"
import type { RawPokemonForm } from "#/types/raw/form"
import type { RawGeneration } from "#/types/raw/generation"
import type { RawPokemon, RawPokemonStat, RawPokemonType, RawSpriteSet } from "#/types/raw/pokemon"
import type { RawFlavorText, RawSpecies } from "#/types/raw/species"

const SPRITE_DIR = "/sprites/pokemon/"
const SHOWDOWN_DIR = "/sprites/pokemon/other/showdown/"

const toShowdownUrl = (url: string | null): string | null =>
	url ? url.replace(SPRITE_DIR, SHOWDOWN_DIR).replace(/\.png$/, ".gif") : null

function parseSprites(sprites: RawSpriteSet): PokemonSprites {
	return {
		front: {
			default: toShowdownUrl(sprites.front_default),
			shiny: toShowdownUrl(sprites.front_shiny),
			female: toShowdownUrl(sprites.front_female)
		},
		back: {
			default: sprites.back_default,
			shiny: sprites.back_shiny,
			female: sprites.back_female
		}
	}
}

function parseElementalTypes(types: RawPokemonType[]): PokemonType[] {
	return types
		.map((t) => t.type.name)
		.filter((name): name is ElementalTypeName => name in TYPE_THEME)
		.map((name) => ({ name }))
}

function parseStats(stats: RawPokemonStat[]): PokemonStat[] {
	return stats
		.filter((s): s is RawPokemonStat & { stat: { name: StatName } } => s.stat.name in STAT_THEME)
		.map((s) => ({ value: s.base_stat, name: s.stat.name }))
}

function parseEvolutions(node: RawEvolutionChainLink): PokemonEvolutionChainLink {
	return {
		name: node.species.name,
		isBaby: node.is_baby,
		evolvesTo: node.evolves_to.map(parseEvolutions)
	}
}

function parseFlavorText(flavorTextEntries: RawFlavorText[]): string {
	const englishFlavorText = flavorTextEntries.find((ft) => ft.language.name === "en")?.flavor_text

	return englishFlavorText
		? englishFlavorText
				.replace(/\n/g, " ")
				.replace(/\bPOK[ÉE]MON\b/gi, "Pokémon")
				.replace(/\b[A-Z]{3,}\b/g, (word) => word.charAt(0) + word.slice(1).toLowerCase())
				.replace(/\s+/g, " ")
				.trim()
		: "unknown"
}

export function selectAbility(ability: RawAbility): Ability {
	const en = (entries: RawName[]) => entries.find((n) => n.language.name === "en")?.name
	const enEffect = ability.effect_entries.find((e) => e.language.name === "en")

	return {
		name: ability.name,
		displayName: en(ability.names) ?? ability.name,
		effect: enEffect?.short_effect ?? enEffect?.effect ?? "unknown"
	}
}

export function selectVariety(pokemon: RawPokemon): Variety {
	return {
		id: pokemon.id,
		name: pokemon.name,
		abilities: pokemon.abilities.map((a) => ({
			name: a.ability.name,
			url: a.ability.url,
			isHidden: a.is_hidden
		})),
		sprites: parseSprites(pokemon.sprites),
		types: parseElementalTypes(pokemon.types),
		stats: parseStats(pokemon.stats),
		height: pokemon.height,
		weight: pokemon.weight,
		isDefault: pokemon.is_default,
		forms: pokemon.forms.map((f) => f.name)
	}
}

export function selectForm(form: RawPokemonForm): Form {
	const en = (entries: RawName[]) => entries.find((n) => n.language.name === "en")?.name

	return {
		name: form.name,
		formName: form.form_name,
		label: en(form.form_names) ?? form.form_name,
		displayName: en(form.names) ?? form.name,
		isDefault: form.is_default,
		isMega: form.is_mega,
		isBattleOnly: form.is_battle_only,
		sprites: parseSprites(form.sprites),
		types: parseElementalTypes(form.types)
	}
}

export function selectSpecies([pokemon, species, evolution, generation]: [
	RawPokemon,
	RawSpecies,
	RawEvolutionChain,
	RawGeneration
]): Species {
	return {
		id: species.id,
		name: species.name,
		captureRate: species.capture_rate,
		classification: {
			isBaby: species.is_baby,
			isLegendary: species.is_legendary,
			isMythical: species.is_mythical
		},
		color: withFallback(species.color.name, "unknown"),
		cries: {
			latest: pokemon.cries.latest,
			legacy: pokemon.cries.legacy
		},
		eggGroups: species.egg_groups.map((e) => e.name),
		evolution: parseEvolutions(evolution.chain),
		flavorText: parseFlavorText(species.flavor_text_entries),
		varieties: species.varieties.map((v) => ({
			isDefault: v.is_default,
			name: v.pokemon.name
		})),
		genderRate: species.gender_rate,
		generation: {
			id: generation.id,
			name: generation.name,
			region: generation.main_region.name,
			pokemon: generation.pokemon_species.map((p) => p.name)
		},
		growthRate: Number(species.growth_rate.url.split("/").filter(Boolean).at(-1)),
		habitat: withFallback(species.habitat?.name, "unknown"),
		hatchCounter: species.hatch_counter,
		shape: withFallback(species.shape.name, "unknown")
	}
}

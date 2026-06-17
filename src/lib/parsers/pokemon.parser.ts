import { withFallback } from "#/lib/utils"
import { TYPE_THEME } from "#/theme/elemental-types.theme"
import { STAT_THEME } from "#/theme/stats.theme"
import type {
	ElementalTypeName,
	Form,
	PokemonElementalType,
	PokemonEvolutionNode,
	PokemonSprites,
	PokemonStat,
	Species,
	StatName,
	Variety
} from "#/types/pokemon"
import type { RawEvolutionChain, RawEvolutionNode } from "#/types/raw/evolution"
import type { RawFormName, RawPokemonForm } from "#/types/raw/form"
import type { RawGeneration } from "#/types/raw/generation"
import type { RawElementalType, RawPokemon, RawSpriteSetFull, RawSprites, RawStat } from "#/types/raw/pokemon"
import type { RawFlavorTextEntry, RawSpecies } from "#/types/raw/species"

function parseSprites(sprites: RawSprites): PokemonSprites {
	const official = sprites.other["official-artwork"]
	const showdown = sprites.other.showdown
	const genV = sprites.versions["generation-v"]["black-white"].animated

	const fullSource = showdown.front_default ? showdown : genV

	return {
		front: {
			default: official.front_default ?? fullSource.front_default,
			shiny: official.front_shiny ?? fullSource.front_shiny,
			female: fullSource.front_female
		},
		back: {
			default: fullSource.back_default,
			shiny: fullSource.back_shiny,
			female: fullSource.back_female
		}
	}
}

function parseFormSprites(sprites: RawSpriteSetFull): PokemonSprites {
	return {
		front: {
			default: sprites.front_default,
			shiny: sprites.front_shiny,
			female: sprites.front_female
		},
		back: {
			default: sprites.back_default,
			shiny: sprites.back_shiny,
			female: sprites.back_female
		}
	}
}

// PokeAPI exposes types/stats outside our unions (unknown, shadow, stellar, …).
// Validate at this trust boundary against the exhaustive theme tables, dropping unknowns
// so an invalid name can never reach TYPE_THEME[name] / STAT_THEME[name] and crash.
function parseElementalTypes(types: RawElementalType[]): PokemonElementalType[] {
	return types
		.map((t) => t.type.name)
		.filter((name): name is ElementalTypeName => name in TYPE_THEME)
		.map((name) => ({ name }))
}

function parseStats(stats: RawStat[]): PokemonStat[] {
	return stats
		.filter((s): s is RawStat & { stat: { name: StatName } } => s.stat.name in STAT_THEME)
		.map((s) => ({ value: s.base_stat, name: s.stat.name }))
}

function parseEvolutions(node: RawEvolutionNode): PokemonEvolutionNode {
	return {
		name: node.species.name,
		isBaby: node.is_baby,
		evolvesTo: node.evolves_to.map(parseEvolutions)
	}
}

function parseFlavorText(flavorTextEntries: RawFlavorTextEntry[]): string {
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

export function selectVariety(pokemon: RawPokemon): Variety {
	return {
		id: pokemon.id,
		name: pokemon.name,
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
	const en = (entries: RawFormName[]) => entries.find((n) => n.language.name === "en")?.name

	return {
		name: form.name,
		formName: form.form_name,
		label: en(form.form_names) ?? form.form_name,
		displayName: en(form.names) ?? form.name,
		isDefault: form.is_default,
		isMega: form.is_mega,
		isBattleOnly: form.is_battle_only,
		sprites: parseFormSprites(form.sprites),
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

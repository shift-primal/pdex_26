import { ELEMENTAL_TYPES, STATS } from '#/constants/constants';

import type {
    ElementalTypeName,
    Pokemon,
    PokemonBasic,
    PokemonElementalType,
    PokemonSprites,
    PokemonStat,
    PokemonEvolutionNode,
    StatName
} from '#/types/pokemon';

import type {
    RawElementalType,
    RawPokemon,
    RawSprite,
    RawSprites,
    RawStat
} from '#/types/raw/pokemon';
import type { RawFlavorTextEntry, RawSpecies } from '#/types/raw/species';
import type { RawEvolutionNode, RawEvolutionChain } from '#/types/raw/evolution';
import type { RawGeneration } from '#/types/raw/generation';
import { withFallback } from '#/lib/utils';

function parseSprites(sprites: RawSprites): PokemonSprites {
    const findSpriteSide = (
        side: 'front' | 'back',
        source: RawSprite
    ): PokemonSprites['front'] => ({
        default: source[`${side}_default`],
        female: source[`${side}_female`],
        shiny: source[`${side}_shiny`]
    });

    const genV = sprites.versions['generation-v']['black-white'].animated;
    const showdown = sprites.other.showdown;

    const source = [genV, showdown].find((s) => s.front_default && s.back_default) ?? showdown;

    return {
        front: findSpriteSide('front', source),
        back: findSpriteSide('back', source)
    };
}

function parseElementalTypes(types: RawElementalType[]): PokemonElementalType[] {
    return types.map((t) => {
        const name = t.type.name as ElementalTypeName;
        return {
            name,
            color: ELEMENTAL_TYPES[name].color,
            icon: ELEMENTAL_TYPES[name].icon
        };
    });
}

function parseStats(stats: RawStat[]): PokemonStat[] {
    const baseStats = stats.map((s) => {
        const statName = s.stat.name as StatName;

        return {
            value: s.base_stat,
            name: statName,
            icon: STATS[statName].icon,
            color: STATS[statName].color
        };
    });

    const total = baseStats.reduce((acc, curr) => acc + curr.value, 0);

    return [
        ...baseStats,
        {
            value: total,
            name: 'total',
            icon: STATS['total'].icon,
            color: STATS['total'].color
        }
    ];
}

function parseEvolutions(node: RawEvolutionNode): PokemonEvolutionNode {
    return {
        name: node.species.name,
        isBaby: node.is_baby,
        evolvesTo: node.evolves_to.map(parseEvolutions)
    };
}

function parseFlavorText(flavorTextEntries: RawFlavorTextEntry[]): string {
    const englishFlavorText = flavorTextEntries.find(
        (ft) => ft.language.name === 'en'
    )?.flavor_text;

    return englishFlavorText
        ? englishFlavorText
              .replace(/\n/g, ' ')
              .replace(/\bPOK[ÉE]MON\b/gi, 'Pokémon')
              .replace(/\b[A-Z]{3,}\b/g, (word) => word.charAt(0) + word.slice(1).toLowerCase())
              .replace(/\s+/g, ' ')
              .trim()
        : 'Unknown flavor text';
}

export function selectPokemonBasic(pokemon: RawPokemon): PokemonBasic {
    return {
        id: pokemon.id,
        name: pokemon.name,
        sprites: parseSprites(pokemon.sprites),
        types: parseElementalTypes(pokemon.types)
    };
}

export function selectPokemon([pokemon, species, evolution, generation]: [
    RawPokemon,
    RawSpecies,
    RawEvolutionChain,
    RawGeneration
]): Pokemon {
    const fullPokemon = {
        id: pokemon.id,
        name: pokemon.name,
        sprites: parseSprites(pokemon.sprites),
        types: parseElementalTypes(pokemon.types),
        classification: {
            isBaby: species.is_baby,
            isLegendary: species.is_legendary,
            isMythical: species.is_mythical
        },
        color: withFallback(species.color.name, 'unknown'),
        cries: {
            latest: pokemon.cries.latest,
            legacy: pokemon.cries.legacy
        },
        eggGroups: species.egg_groups.map((e) => e.name),
        evolution: parseEvolutions(evolution.chain),
        flavorText: parseFlavorText(species.flavor_text_entries),
        forms: species.varieties.map((f) => ({
            isDefault: f.is_default,
            name: f.pokemon.name
        })),
        gender: {
            hasGenderDifferences: species.has_gender_differences,
            genderRate: species.gender_rate
        },
        generation: {
            id: generation.id,
            name: generation.name,
            region: generation.main_region.name,
            pokemon: generation.pokemon_species.map((p) => p.name)
        },
        habitat: withFallback(species.habitat?.name, 'unknown'),
        height: pokemon.height,
        isDefault: pokemon.is_default,
        shape: withFallback(species.shape.name, 'unknown'),
        stats: parseStats(pokemon.stats),
        weight: pokemon.weight
    };

    return fullPokemon;
}

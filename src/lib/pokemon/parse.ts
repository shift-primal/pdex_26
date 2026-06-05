import { ELEMENTAL_TYPES, FORM_TYPES, GENERATIONS, STATS } from '#/constants';
import {
    parseEvolutionChain,
    findStage,
    findPrevEvolution,
    findNextEvolution
} from '#/lib/pokemon/chain';
import type {
    ElementalTypeName,
    Pokemon,
    PokemonElementalType,
    PokemonEvolutionInfo,
    PokemonGender,
    PokemonGeneration,
    PokemonSprites,
    PokemonStat,
    StatName
} from '#/types/pokemon';
import type { RawEvolutionChain } from '#/types/raw/evolutionchain';
import type { RawElementalType, RawPokemon, RawSprites, RawStat } from '#/types/raw/pokemon';
import type { RawFlavorTextEntry, RawForm, RawSpecies } from '#/types/raw/species';

export const parseTypes = (types: RawElementalType[]): PokemonElementalType[] =>
    types.map((t) => ({
        slot: t.slot,
        name: t.type.name as ElementalTypeName,
        color: ELEMENTAL_TYPES[t.type.name as ElementalTypeName].color,
        icons: ELEMENTAL_TYPES[t.type.name as ElementalTypeName].icons
    }));

const parseStats = (stats: RawStat[]): PokemonStat[] => {
    const baseStats = stats.map((s) => ({
        value: s.base_stat,
        name: s.stat.name as StatName,
        icon: STATS[s.stat.name as StatName].icon,
        color: STATS[s.stat.name as StatName].color
    }));

    const total = baseStats.reduce((acc, curr) => acc + curr.value, 0);

    return [
        ...baseStats,
        {
            value: total,
            name: 'total' as StatName,
            icon: STATS['total'].icon,
            color: STATS['total'].color
        }
    ];
};

const parseSprites = (sprites: RawSprites): PokemonSprites => ({
    default: sprites.other['official-artwork'].front_default,
    shiny: sprites.other['official-artwork'].front_shiny
});

const parseGeneration = (genText: string): PokemonGeneration => {
    const genRoman = genText.split('-').at(-1) ?? '';
    return GENERATIONS[genRoman as keyof typeof GENERATIONS];
};

const parseFlavorText = (entries: RawFlavorTextEntry[]) =>
    (entries[0].flavor_text ?? '')
        .replace(/\n/g, ' ')
        .replace(/\bPOK[ÉE]MON\b/gi, 'Pokémon')
        .replace(/\b[A-Z]{3,}\b/g, (word) => word.charAt(0) + word.slice(1).toLowerCase())
        .replace(/\s+/g, ' ')
        .trim();

const parseForms = (forms: RawForm[]) =>
    forms.map((v) => ({
        isDefault: v.is_default,
        name: v.pokemon.name,
        formType:
            FORM_TYPES.find((ft) => v.pokemon.name.includes(ft.suffix))?.category.label ?? null
    }));

const parseEvolution = (evolution: RawEvolutionChain, name: string): PokemonEvolutionInfo => {
    const chain = parseEvolutionChain(evolution.chain);
    return {
        chain,
        stage: findStage(chain, name),
        evolvesFrom: findPrevEvolution(chain, name),
        evolvesTo: findNextEvolution(chain, name)
    };
};

const parseGender = (hasGenderDifferences: boolean, genderRate: number): PokemonGender => ({
    hasGenderDifferences,
    genderRate
});

export function toPokemon([pokemon, species, evolution]: [
    RawPokemon,
    RawSpecies | null,
    RawEvolutionChain | null
]): Pokemon {
    return {
        id: pokemon.id,
        name: pokemon.name,
        height: pokemon.height / 10,
        weight: pokemon.weight / 10,
        types: parseTypes(pokemon.types),
        stats: parseStats(pokemon.stats),
        sprites: parseSprites(pokemon.sprites),
        cries: pokemon.cries,
        generation: species ? parseGeneration(species.generation.name) : null,
        status: {
            baby: species?.is_baby ?? false,
            legendary: species?.is_legendary ?? false,
            mythical: species?.is_mythical ?? false
        },
        flavorText: species ? parseFlavorText(species.flavor_text_entries) : '',
        evolution: evolution ? parseEvolution(evolution, pokemon.name) : null,
        habitat: species?.habitat?.name ?? '',
        forms: parseForms(species?.varieties ?? []),
        isDefault: pokemon.is_default,
        gender: species ? parseGender(species.has_gender_differences, species.gender_rate) : null,
        shape: species?.shape.name ?? ''
    };
}

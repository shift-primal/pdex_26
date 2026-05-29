import { ELEMENTAL_TYPES, ROMAN_DICT, STATS } from '#/constants';
import type {
    ElementalTypeName,
    Pokemon,
    PokemonElementalType,
    PokemonEvolutionChain,
    PokemonEvolutionInfo,
    PokemonSprites,
    PokemonStat,
    StatName
} from '#/types/pokemon';
import type { RawEvolution, RawEvolutionChain } from '#/types/raw/evolutionchain';
import type { RawElementalType, RawPokemon, RawSprites, RawStat } from '#/types/raw/pokemon';
import type { RawFlavorTextEntry, RawSpecies } from '#/types/raw/species';

const parseTypes = (types: RawElementalType[]): PokemonElementalType[] =>
    types.map((t) => ({
        slot: t.slot,
        name: t.type.name as ElementalTypeName,
        color: ELEMENTAL_TYPES[t.type.name as ElementalTypeName].color,
        icons: ELEMENTAL_TYPES[t.type.name as ElementalTypeName].icons
    }));

const parseStats = (stats: RawStat[]): PokemonStat[] =>
    stats.map((s) => ({
        value: s.base_stat,
        name: s.stat.name as StatName,
        icon: STATS[s.stat.name as StatName]
    }));

const parseSprites = (sprites: RawSprites): PokemonSprites => ({
    front: sprites.other['official-artwork'].front_default ?? sprites.front_default ?? '',
    back: sprites.back_default ?? '',
    frontShiny: sprites.other['official-artwork'].front_shiny ?? sprites.front_shiny ?? '',
    backShiny: sprites.back_shiny ?? ''
});

export const parseId = (id: number) => '#' + id.toString().padStart(4, '0');

const parseGeneration = (genText: string) => ROMAN_DICT[genText.split('-').at(-1) ?? ''];

const findStage = (chain: PokemonEvolutionChain, name: string): number => {
    if (chain.name === name) return chain.stage;

    for (const child of chain.evolvesTo) {
        const stage = findStage(child, name);
        if (stage !== -1) return stage;
    }
    return -1;
};

const parseEvolutionChain = (chain: RawEvolution, stage = 0): PokemonEvolutionChain => ({
    name: chain.species.name,
    isBaby: chain.is_baby,
    stage,
    evolvesTo: chain.evolves_to.map((e) => parseEvolutionChain(e, stage + 1))
});

const parseEvolution = (evolution: RawEvolutionChain, name: string): PokemonEvolutionInfo => {
    const chain = parseEvolutionChain(evolution.chain);
    return { chain, stage: findStage(chain, name) };
};

const parseFlavorText = (flavorTextEntries: RawFlavorTextEntry[]) => {
    const flavorText = flavorTextEntries[0].flavor_text;

    return flavorText
        .replace(/\n/g, ' ')
        .replace(/\bPOK[ÉE]MON\b/gi, 'Pokémon')
        .replace(/\b[A-Z]{3,}\b/g, (word) => word.charAt(0) + word.slice(1).toLowerCase())
        .replace(/\s+/g, ' ')
        .trim();
};

export function toPokemon([pokemon, species, evolution]: [
    RawPokemon,
    RawSpecies,
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
        generation: parseGeneration(species.generation.name),
        status: {
            baby: species.is_baby,
            legendary: species.is_legendary,
            mythical: species.is_mythical
        },
        flavorText: parseFlavorText(species.flavor_text_entries),
        evolution: evolution ? parseEvolution(evolution, pokemon.name) : null
    };
}

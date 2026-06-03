import { ELEMENTAL_TYPES, FORM_TYPES, GENERATIONS, STATS } from '#/constants';
import { capFirstLetter } from '#/lib/utils';
import type {
    ElementalTypeName,
    Pokemon,
    PokemonElementalType,
    PokemonEvolutionChain,
    PokemonEvolutionInfo,
    PokemonGeneration,
    PokemonSprites,
    PokemonStat,
    StatName
} from '#/types/pokemon';
import type { RawEvolution, RawEvolutionChain } from '#/types/raw/evolutionchain';
import type { RawElementalType, RawPokemon, RawSprites, RawStat } from '#/types/raw/pokemon';
import type { RawFlavorTextEntry, RawForm, RawSpecies } from '#/types/raw/species';

export const getSpeciesName = (name: string) => {
    const form = FORM_TYPES.find((ft) => name.includes(ft.suffix));
    return form ? name.split('-')[0] : name;
};

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
        icon: STATS[s.stat.name as StatName].icon
    }));

const parseSprites = (sprites: RawSprites): PokemonSprites => ({
    front: sprites.other['official-artwork'].front_default ?? sprites.front_default ?? '',
    back: sprites.back_default ?? '',
    frontShiny: sprites.other['official-artwork'].front_shiny ?? sprites.front_shiny ?? '',
    backShiny: sprites.back_shiny ?? ''
});

export const parseId = (id: number) => '#' + id.toString().padStart(4, '0');

const parseGeneration = (genText: string): PokemonGeneration => {
    const genRoman = genText.split('-').at(-1) ?? '';
    return GENERATIONS[genRoman as keyof typeof GENERATIONS];
};

const findStage = (chain: PokemonEvolutionChain, name: string): number => {
    if (chain.name === name) return chain.stage;

    for (const child of chain.evolvesTo) {
        const stage = findStage(child, name);
        if (stage !== -1) return stage;
    }
    return -1;
};

const findPrevEvolution = (chain: PokemonEvolutionChain, name: string): string | null => {
    for (const child of chain.evolvesTo) {
        if (child.name === name) return chain.name;
        const result = findPrevEvolution(child, name);
        if (result) return result;
    }
    return null;
};

const findNextEvolution = (chain: PokemonEvolutionChain, name: string): string[] => {
    if (chain.name === name) return chain.evolvesTo.map((e) => e.name);

    for (const child of chain.evolvesTo) {
        if (child.name === name) return child.evolvesTo.map((e) => e.name);
        const result = findNextEvolution(child, name);
        if (result.length) return result;
    }
    return [];
};

const parseEvolutionChain = (chain: RawEvolution, stage = 0): PokemonEvolutionChain => ({
    name: chain.species.name,
    isBaby: chain.is_baby,
    stage,
    evolvesTo: chain.evolves_to.map((e) => parseEvolutionChain(e, stage + 1))
});

const parseEvolution = (evolution: RawEvolutionChain, name: string): PokemonEvolutionInfo => {
    const chain = parseEvolutionChain(evolution.chain);
    return {
        chain,
        stage: findStage(chain, name),
        evolvesFrom: findPrevEvolution(chain, name),
        evolvesTo: findNextEvolution(chain, name)
    };
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

const parseForms = (forms: RawForm[]) =>
    forms.map((v) => ({
        isDefault: v.is_default,
        name: v.pokemon.name,
        formType:
            FORM_TYPES.find((ft) => v.pokemon.name.includes(ft.suffix))?.category.label ?? null
    }));

export const formatName = (name: string) => {
    const form = FORM_TYPES.find((ft) => name.includes(ft.suffix));
    if (!form) return `${capFirstLetter(name)}`;

    const base = name.replace(form.suffix, '');
    return `${capFirstLetter(base)} ${capFirstLetter(form.label)}`;
};

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
        isDefault: pokemon.is_default
    };
}

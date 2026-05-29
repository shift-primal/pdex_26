import { ELEMENTAL_TYPES, STATS } from '#/constants';
import type {
    ElementalTypeName,
    Pokemon,
    PokemonElementalType,
    PokemonSprites,
    PokemonStat,
    StatName
} from '#/types/pokemon';
import type { RawElementalTypes, RawPokemon, RawSprites, RawStats } from '#/types/raw';

const parseTypes = (types: RawElementalTypes[]): PokemonElementalType[] =>
    types.map((t) => ({
        slot: t.slot,
        name: t.type.name as ElementalTypeName,
        color: ELEMENTAL_TYPES[t.type.name as ElementalTypeName].color,
        icons: ELEMENTAL_TYPES[t.type.name as ElementalTypeName].icons
    }));

const parseStats = (stats: RawStats[]): PokemonStat[] =>
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

export function toPokemon(rp: RawPokemon): Pokemon {
    return {
        id: rp.id,
        name: rp.name,
        height: rp.height / 10,
        weight: rp.weight / 10,
        types: parseTypes(rp.types),
        stats: parseStats(rp.stats),
        sprites: parseSprites(rp.sprites)
    };
}

export const parseId = (id: number) => '#' + id.toString().padStart(4, '0');

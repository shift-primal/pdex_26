import { API_BASE_URL } from '#/constants';
import type { RawNamedResource } from '#/types/generic';
import type { ElementalTypeName } from '#/types/pokemon';
import type { RawEvolutionChain } from '#/types/raw/evolutionchain';
import type { RawListResponse, RawListTypeResponse, RawPokemon } from '#/types/raw/pokemon';
import type { RawSpecies } from '#/types/raw/species';

export async function fetchPokemon(nameOrId: string): Promise<RawPokemon> {
    const res = await fetch(`${API_BASE_URL}/pokemon/${nameOrId}`);

    if (!res.ok) throw new Error(`Pokemon not found: ${nameOrId}`);

    return res.json();
}

export async function fetchPokemonList(
    typeFilter?: ElementalTypeName
): Promise<RawNamedResource[]> {
    const url = typeFilter
        ? `${API_BASE_URL}/type/${typeFilter}`
        : `${API_BASE_URL}/pokemon?limit=1302`;

    const res = await fetch(url);

    if (!res.ok) throw new Error('Error');

    if (typeFilter) {
        const data = (await res.json()) as RawListTypeResponse;
        return data.pokemon.map((p) => p.pokemon);
    }

    const data = (await res.json()) as RawListResponse;
    return data.results;
}

export async function fetchSpecies(nameOrId: string): Promise<RawSpecies> {
    const res = await fetch(`${API_BASE_URL}/pokemon-species/${nameOrId}`);

    if (!res.ok) throw new Error(`Pokemon not found: ${nameOrId}`);

    return res.json();
}

export async function fetchEvolutionChain(evolutionChainUrl: string): Promise<RawEvolutionChain> {
    const res = await fetch(evolutionChainUrl);

    if (!res.ok) throw new Error(`Evolution chain not found: ${evolutionChainUrl}`);

    return res.json();
}

import { API_BASE_URL } from '#/constants';
import type { ElementalTypeName } from '#/types/pokemon';
import type {
    RawListResponse,
    RawListTypeResponse,
    RawNamedResource,
    RawPokemon
} from '#/types/raw';

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

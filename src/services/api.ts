import { API_BASE_URL } from '#/constants/constants';
import type { RawGeneration } from '#/types/raw/generation';
import type { RawPokemon } from '#/types/raw/pokemon';
import type { RawEvolutionChain, RawSpecies } from '#/types/raw/species';

async function fetchJson<T>(url: string, entity: string): Promise<T> {
    const res = await fetch(url);

    if (res.status === 404) throw new Error(`${entity} not found`);
    if (!res.ok) throw new Error(`Failed to fetch ${entity.toLowerCase()} (${res.status})`);

    return res.json();
}

export function fetchPokemon(name: string) {
    return fetchJson<RawPokemon>(`${API_BASE_URL}/pokemon/${name}`, `Pokemon "${name}"`);
}

export function fetchSpecies(nameOrId: string) {
    return fetchJson<RawSpecies>(
        `${API_BASE_URL}/pokemon-species/${nameOrId}`,
        `Species "${nameOrId}"`
    );
}

export function fetchEvolutionChain(url: string) {
    return fetchJson<RawEvolutionChain>(url, 'Evolution chain');
}

export function fetchGeneration(url: string) {
    return fetchJson<RawGeneration>(url, 'Generation');
}

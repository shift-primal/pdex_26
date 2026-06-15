import { API_BASE_URL } from "#/config/general";
import type { RawNamedResource } from "#/types/generic";
import type { RawEvolutionChain } from "#/types/raw/evolution";
import type { RawGeneration } from "#/types/raw/generation";
import type { RawListResponse } from "#/types/raw/list";
import type { RawPokemon } from "#/types/raw/pokemon";
import type { RawSpecies } from "#/types/raw/species";

async function fetchJson<T>(url: string, entity: string): Promise<T> {
	const res = await fetch(url);

	if (res.status === 404) throw new Error(`${entity} not found`);
	if (!res.ok)
		throw new Error(
			`Failed to fetch ${entity.toLowerCase()} (${res.status})`
		);

	return res.json();
}

export async function fetchPokemon(name: string) {
	try {
		return await fetchJson<RawPokemon>(
			`${API_BASE_URL}/pokemon/${name}`,
			`Pokemon "${name}"`
		);
	} catch (err) {
		const species = await fetchSpecies(
			`${API_BASE_URL}/pokemon-species/${name}`
		);
		const defaultVariety = species.varieties.find((v) => v.is_default);

		if (!defaultVariety) throw err;

		return fetchJson<RawPokemon>(
			`${API_BASE_URL}/pokemon/${defaultVariety.pokemon.name}`,
			`Pokemon "${defaultVariety.pokemon.name}"`
		);
	}
}

export function fetchSpecies(url: string) {
	return fetchJson<RawSpecies>(url, `Species`);
}

export function fetchEvolutionChain(url: string) {
	return fetchJson<RawEvolutionChain>(url, "Evolution chain");
}

export function fetchGeneration(url: string) {
	return fetchJson<RawGeneration>(url, "Generation");
}

export async function fetchPokemonList(): Promise<RawNamedResource[]> {
	const data = await fetchJson<RawListResponse>(
		`${API_BASE_URL}/pokemon?limit=1302`,
		"Pokemon list"
	);
	return data.results;
}

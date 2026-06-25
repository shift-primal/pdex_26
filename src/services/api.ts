import { API_BASE_URL, MAX_DEX_LIMIT } from "#/config/general.config"
import type { RawNamedResource } from "#/types/generic"
import type { RawAbility } from "#/types/raw/ability"
import type { RawEvolutionChain } from "#/types/raw/evolution"
import type { RawForm } from "#/types/raw/form"
import type { RawGeneration } from "#/types/raw/generation"
import type { RawListResponse } from "#/types/raw/list"
import type { RawPokemon } from "#/types/raw/pokemon"
import type { RawSpecies } from "#/types/raw/species"
import type { RawType } from "#/types/raw/type"

async function fetchJson<T>(url: string, entity: string): Promise<T> {
	const res = await fetch(url)

	if (res.status === 404) throw new Error(`${entity} not found`)
	if (!res.ok) throw new Error(`Failed to fetch ${entity.toLowerCase()} (${res.status})`)

	return res.json()
}

export async function fetchPokemon(name: string) {
	try {
		return await fetchJson<RawPokemon>(`${API_BASE_URL}/pokemon/${name}`, `Pokemon "${name}"`)
	} catch (err) {
		const species = await fetchSpecies(`${API_BASE_URL}/pokemon-species/${name}`)
		const defaultVariety = species.varieties.find((v) => v.is_default)

		if (!defaultVariety) throw err

		return fetchJson<RawPokemon>(
			`${API_BASE_URL}/pokemon/${defaultVariety.pokemon.name}`,
			`Pokemon "${defaultVariety.pokemon.name}"`
		)
	}
}

export function fetchSpecies(url: string) {
	return fetchJson<RawSpecies>(url, "Species")
}

export function fetchPokemonForm(nameOrId: string) {
	return fetchJson<RawForm>(`${API_BASE_URL}/pokemon-form/${nameOrId}`, "Pokemon form")
}

export function fetchEvolutionChain(url: string) {
	return fetchJson<RawEvolutionChain>(url, "Evolution chain")
}

export function fetchGeneration(url: string) {
	return fetchJson<RawGeneration>(url, "Generation")
}

export function fetchAbility(url: string) {
	return fetchJson<RawAbility>(url, "Ability")
}

export function fetchType(url: string) {
	return fetchJson<RawType>(url, "Type")
}

export async function fetchPokemonList(): Promise<RawNamedResource[]> {
	const data = await fetchJson<RawListResponse>(`${API_BASE_URL}/pokemon?limit=${MAX_DEX_LIMIT}`, "Pokemon list")
	return data.results
}

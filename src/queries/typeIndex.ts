import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import { API_BASE_URL } from "#/config/general.config"
import { fetchType } from "#/services/api"
import { TYPE_NAMES } from "#/theme/pokemon-types.theme"
import type { TypeName } from "#/types/pokemon"

export type TypeIndex = Map<string, TypeName[]>

async function fetchTypeIndex(): Promise<TypeIndex> {
	const types = await Promise.all(TYPE_NAMES.map((name) => fetchType(`${API_BASE_URL}/type/${name}`)))

	const slots = new Map<string, { type: TypeName; slot: number }[]>()
	for (const type of types) {
		const typeName = type.name as TypeName
		for (const { slot, pokemon } of type.pokemon) {
			const entry = slots.get(pokemon.name) ?? []
			entry.push({ type: typeName, slot })
			slots.set(pokemon.name, entry)
		}
	}

	const index: TypeIndex = new Map()
	for (const [name, entries] of slots) {
		index.set(
			name,
			entries.sort((a, b) => a.slot - b.slot).map((e) => e.type)
		)
	}
	return index
}

export function typeIndexQueryOptions() {
	return queryOptions({ queryKey: ["type-index"], queryFn: fetchTypeIndex, staleTime: Number.POSITIVE_INFINITY })
}

export const useTypeIndex = (): TypeIndex => useSuspenseQuery(typeIndexQueryOptions()).data

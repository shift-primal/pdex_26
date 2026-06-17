import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import { selectForm } from "#/lib/parsers/pokemon.parser"
import { fetchPokemonForm } from "#/services/api"
import type { Form } from "#/types/pokemon"
import type { RawPokemonForm } from "#/types/raw/form"

export function formQueryOptions(nameOrId: string) {
	return queryOptions<RawPokemonForm, Error, Form>({
		queryKey: ["pokemon", "form", nameOrId],
		queryFn: () => fetchPokemonForm(nameOrId),
		select: selectForm,
		staleTime: Infinity
	})
}

export const useForm = (nameOrId: string) => useSuspenseQuery(formQueryOptions(nameOrId))

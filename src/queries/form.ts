import { queryOptions } from "@tanstack/react-query"
import { selectForm } from "#/lib/parsers/pokemon.parser"
import { fetchPokemonForm } from "#/services/api"
import type { Form } from "#/types/pokemon"
import type { RawForm } from "#/types/raw/form"

export function formQueryOptions(nameOrId: string) {
	return queryOptions<RawForm, Error, Form>({
		queryKey: ["pokemon", "form", nameOrId],
		queryFn: () => fetchPokemonForm(nameOrId),
		select: selectForm,
		staleTime: Infinity
	})
}

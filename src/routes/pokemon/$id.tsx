import { createFileRoute, redirect } from "@tanstack/react-router"
import z from "zod"
import { PokemonDetails } from "#/components/details/PokemonDetails"
import { ErrorState } from "#/components/feedback/ErrorState"
import { LoadingState } from "#/components/feedback/LoadingState"
import { TABS } from "#/config/general.config"
import { varietyQueryOptions } from "#/queries/variety"
import { GENDERS } from "#/types/pokemon"

const searchSchema = z.object({
	tab: z.enum(TABS).default(TABS[0]).catch(TABS[0]),
	variety: z.string().optional(),
	form: z.string().optional(),
	gender: z.enum(GENDERS).optional()
})

const PokemonDetailsPage = () => {
	const { id } = Route.useParams()
	const { tab, variety, form, gender } = Route.useSearch()

	return <PokemonDetails id={id} tab={tab} variety={variety} form={form} gender={gender} />
}

export const Route = createFileRoute("/pokemon/$id")({
	beforeLoad: async ({ params, search, context }) => {
		if (/^\d+$/.test(params.id)) {
			const pokemon = await context.queryClient.fetchQuery(varietyQueryOptions(params.id))
			throw redirect({
				to: "/pokemon/$id",
				params: { id: pokemon.name },
				search: { ...search, variety: pokemon.is_default ? search.variety : pokemon.name }
			})
		}
	},
	component: PokemonDetailsPage,
	validateSearch: searchSchema,
	pendingComponent: LoadingState,
	errorComponent: ({ error, reset }) => (
		<ErrorState error={error} reset={reset} eyebrow="Not found" title="No such Pokémon" />
	)
})

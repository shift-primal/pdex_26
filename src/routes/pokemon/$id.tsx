import { createFileRoute, redirect } from "@tanstack/react-router"
import z from "zod"
import { fetchPokemon } from "#/services/api"
import { PokemonDetails } from "#/components/details/PokemonDetails"

const searchSchema = z.object({
	tab: z.string().default("about"),
	variety: z.string().optional(),
	form: z.string().optional(),
	gender: z.enum(["male", "female"]).optional()
})

const PokemonDetailsPage = () => {
	const { id } = Route.useParams()
	const { variety, form, gender } = Route.useSearch()

	return <PokemonDetails id={id} variety={variety} form={form} gender={gender} />
}

export const Route = createFileRoute("/pokemon/$id")({
	beforeLoad: async ({ params }) => {
		if (/^\d+$/.test(params.id)) {
			const pokemon = await fetchPokemon(params.id)
			throw redirect({ to: "/pokemon/$id", params: { id: pokemon.name } })
		}
	},
	component: PokemonDetailsPage,
	validateSearch: searchSchema
})

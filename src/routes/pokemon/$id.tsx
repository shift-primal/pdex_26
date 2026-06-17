import { createFileRoute, redirect } from "@tanstack/react-router"
import z from "zod"
import { flattenEvolutions } from "#/lib/domain/evolution.utils"
import { capFirstLetter, formatId } from "#/lib/format"
import { usePokemonDetail } from "#/queries/detail"
import { varietyQueryOptions } from "#/queries/variety"

const searchSchema = z.object({
	tab: z.string().default("about"),
	variety: z.string().optional(),
	form: z.string().optional()
})

const PokemonDetails = () => {
	const { id } = Route.useParams()
	const { variety, form } = Route.useSearch()

	const { species, activeVariety, activeForm } = usePokemonDetail(id, variety, form)

	const evolutionNames = flattenEvolutions(species.evolution).map((e) => capFirstLetter(e.name))

	const sprite = activeForm.sprites.front.default ?? activeVariety.sprites.front.default
	const title = capFirstLetter(activeForm.displayName)

	return (
		<div className="mx-auto flex max-w-md flex-col items-center gap-4 p-8">
			<span className="text-sm text-gray-500">{formatId(species.id)}</span>
			<h1 className="text-3xl font-bold">{title}</h1>

			{sprite && <img src={sprite} alt={title} width={220} height={220} />}

			<div className="flex gap-2">
				{activeVariety.types.map((t) => (
					<span key={t.name} className="rounded bg-gray-200 px-2 py-1 text-sm">
						{t.name}
					</span>
				))}
			</div>

			<p className="text-center text-sm text-gray-600">{species.flavorText}</p>

			<ul className="w-full">
				{activeVariety.stats.map((s) => (
					<li key={s.name} className="flex justify-between border-b py-1 text-sm">
						<span>{s.name}</span>
						<span className="font-medium">{s.value}</span>
					</li>
				))}
			</ul>

			<div className="text-sm text-gray-600">Evolutions: {evolutionNames.join(" → ")}</div>
		</div>
	)
}

export const Route = createFileRoute("/pokemon/$id")({
	beforeLoad: async ({ params, context }) => {
		if (/^\d+$/.test(params.id)) {
			const data = await context.queryClient.fetchQuery(varietyQueryOptions(params.id))
			throw redirect({ to: "/pokemon/$id", params: { id: data.name } })
		}
	},
	component: PokemonDetails,
	validateSearch: searchSchema
})

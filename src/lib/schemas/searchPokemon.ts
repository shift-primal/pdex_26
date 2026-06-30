import { z } from "zod"
import { TYPE_NAMES } from "#/theme/pokemon-types.theme"

export const SORT_FIELDS = ["id", "name"] as const

export const searchPokemonSchema = z.object({
	search: z.string().optional().catch(undefined),
	types: z.array(z.enum(TYPE_NAMES)).default([]).catch([]),
	sort: z.enum(SORT_FIELDS).default("id").catch("id"),
	dir: z.enum(["asc", "desc"]).default("asc").catch("asc")
})

export type SearchPokemonInput = z.infer<typeof searchPokemonSchema>

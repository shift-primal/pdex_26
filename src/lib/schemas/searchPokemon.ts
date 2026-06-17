import { z } from "zod"

export const searchPokemonSchema = z.object({
	search: z.string().optional(),
	page: z.int().positive().default(1),
	pageSize: z.int().positive().default(25)
})

export type SearchPokemonInput = z.infer<typeof searchPokemonSchema>

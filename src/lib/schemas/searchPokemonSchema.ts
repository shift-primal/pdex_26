import { ELEMENTAL_TYPES } from '#/constants';
import type { ElementalTypeName } from '#/types/pokemon';
import z from 'zod';

export const searchPokemonSchema = z.object({
    search: z.string().optional(),
    type: z
        .enum(Object.keys(ELEMENTAL_TYPES) as [ElementalTypeName, ...ElementalTypeName[]])
        .optional(),
    page: z.int().default(1),
    pageSize: z.int().default(25)
});

export type SearchPokemonInput = z.infer<typeof searchPokemonSchema>;

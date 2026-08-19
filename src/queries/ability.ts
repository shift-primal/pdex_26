import { selectAbility } from "#/lib/parsers/pokemon.parser"
import { makeQueryOptions } from "#/queries/factory"
import { fetchAbility } from "#/services/api"

export const abilityQueryOptions = makeQueryOptions(["ability"], (url) => fetchAbility(url), selectAbility)

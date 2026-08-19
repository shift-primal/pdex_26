import { selectType } from "#/lib/parsers/pokemon.parser"
import { makeQueryOptions } from "#/queries/factory"
import { fetchType } from "#/services/api"

export const typeQueryOptions = makeQueryOptions(["type"], (url) => fetchType(url), selectType)

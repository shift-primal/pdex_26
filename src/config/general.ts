import type { PokemonClassification } from "#/types/pokemon"
import { BabyIcon, CrownIcon, SparkleIcon, type Icon } from "@phosphor-icons/react"

export const API_BASE_URL = "https://pokeapi.co/api/v2"
export const MAX_DEX_ID = 1025

export const GROWTH_RATES = ["Unknown", "Slow", "Medium", "Fast", "Medium Slow", "Erratic", "Fluctuating"]

export const CLASSIFICATION_ICONS: Record<keyof PokemonClassification, Icon> = {
	isBaby: BabyIcon,
	isLegendary: CrownIcon,
	isMythical: SparkleIcon
}

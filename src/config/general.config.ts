export const API_BASE_URL = "https://pokeapi.co/api/v2"

// 1350 to get the entire list, including different forms (e.g Mega, Gmax) - 1025 for all base pokemon
export const MAX_DEX_LIMIT = 1350
export const MAX_DEX_ID = 1025

export const TABS = ["about", "stats", "evolutions", "varieties", "abilities", "relations"] as const
export type Tab = (typeof TABS)[number]

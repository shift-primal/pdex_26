import { MAX_DEX_ID } from "#/config/general.config"
import type { RawNamedResource } from "#/types/generic"
import type { Form, Species, Variety, VarietyRef } from "#/types/pokemon"

export const findAdjacentPokemon = (currId: number, list: RawNamedResource[]) => {
	const index = currId - 1
	return {
		prev: list[(index - 1 + MAX_DEX_ID) % MAX_DEX_ID],
		next: list[(index + 1) % MAX_DEX_ID]
	}
}

const isGenderName = (name: string) => name.endsWith("-male") || name.endsWith("-female")

export const alternateVarieties = (varieties: VarietyRef[]) =>
	varieties.filter((v) => !v.isDefault && !isGenderName(v.name))

export type VariantOption = { kind: "variety"; name: string } | { kind: "form"; name: string }

export function getVariants(species: Species, variety: Variety): VariantOption[] {
	return [
		...alternateVarieties(species.varieties).map((v): VariantOption => ({ kind: "variety", name: v.name })),
		...variety.forms
			.filter((f) => f !== variety.name && !isGenderName(f))
			.map((f): VariantOption => ({ kind: "form", name: f }))
	]
}

export type GenderPresentation =
	| { kind: "none" }
	| { kind: "sprite" }
	| { kind: "varieties"; male: string; female: string }
	| { kind: "forms"; male: string; female: string }

const findGenderPair = (names: string[]) => {
	const male = names.find((n) => n.endsWith("-male"))
	const female = names.find((n) => n.endsWith("-female"))
	return male && female ? { male, female } : null
}

export function resolveGenderPresentation(species: Species, variety: Variety): GenderPresentation {
	const varietyPair = findGenderPair(species.varieties.map((v) => v.name))
	if (varietyPair) return { kind: "varieties", ...varietyPair }

	const formPair = findGenderPair(variety.forms)
	if (formPair) return { kind: "forms", ...formPair }

	if (variety.sprites.front.female) return { kind: "sprite" }

	return { kind: "none" }
}

// Form classification — uses the /pokemon-form flags rather than name-suffix guessing.
export const megaForms = (forms: Form[]) => forms.filter((f) => f.isMega)

export const battleOnlyForms = (forms: Form[]) => forms.filter((f) => f.isBattleOnly)

export const cosmeticForms = (forms: Form[]) => forms.filter((f) => !f.isDefault && !f.isMega && !f.isBattleOnly)

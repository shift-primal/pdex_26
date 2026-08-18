import { MAX_DEX_ID } from "#/config/general.config"
import type { RawNamedResource } from "#/types/generic"
import type { Damage, Form, Gender, Species, TypeName, Variety, VarietyRef } from "#/types/pokemon"

/** name of a species default variety, e.g. "charizard" for the Charizard species */
export const defaultVarietyName = (species: Species): string | undefined =>
	species.varieties.find((v) => v.isDefault)?.name

export const findAdjacentPokemon = (currId: number, list: RawNamedResource[]) => {
	const index = currId - 1
	return {
		prev: list[(index - 1 + MAX_DEX_ID) % MAX_DEX_ID],
		next: list[(index + 1) % MAX_DEX_ID]
	}
}

const isGenderName = (name: string) => name.endsWith("-male") || name.endsWith("-female")

export const alternateVarieties = (varieties: VarietyRef[], activeName: string) =>
	varieties.filter((v) => v.name !== activeName && !isGenderName(v.name))

export type VariantOption = { kind: "variety"; name: string } | { kind: "form"; name: string }

export function getVariants(species: Species, activeVariety: Variety): VariantOption[] {
	const varieties = alternateVarieties(species.varieties, activeVariety.name).map(
		(v): VariantOption => ({ kind: "variety", name: v.name })
	)

	const forms = activeVariety.forms
		.filter((f) => f !== activeVariety.name && !isGenderName(f))
		.map((f): VariantOption => ({ kind: "form", name: f }))

	return [...varieties, ...forms]
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
	// genderRate -1 = genderless: never a gender toggle.
	if (species.genderRate === -1) return { kind: "none" }

	const varietyPair = findGenderPair(species.varieties.map((v) => v.name))
	if (varietyPair) return { kind: "varieties", ...varietyPair }

	const formPair = findGenderPair(variety.forms)
	if (formPair) return { kind: "forms", ...formPair }

	if (variety.sprites.front.female.normal) return { kind: "sprite" }

	return { kind: "none" }
}

/** defaults to male */
export const genderOf = (name: string): Gender => (name.endsWith("-female") ? "female" : "male")

// A form's own displayName falls back to its raw slug (e.g. "squirtle") when PokeAPI has no
// localized name for it — true for every default/base form, only real alt forms (Mega, regional
// variants, ...) have one. When that happens, fall back to the species' own localized name instead.
export const resolveDisplayName = (form: Form, species: Species): string =>
	form.displayName !== form.name ? form.displayName : species.displayName

export const resolveFrontSprite = (variety: Variety, form: Form, gender?: Gender): string | null => {
	const front = form.sprites.front.default.normal ? form.sprites.front : variety.sprites.front
	return gender === "female" ? (front.female.normal ?? front.default.normal) : front.default.normal
}

// Form classification — uses the /pokemon-form flags rather than name-suffix guessing.
export const megaForms = (forms: Form[]) => forms.filter((f) => f.isMega)
export const battleOnlyForms = (forms: Form[]) => forms.filter((f) => f.isBattleOnly)
export const cosmeticForms = (forms: Form[]) => forms.filter((f) => !f.isDefault && !f.isMega && !f.isBattleOnly)

// Extract type name from api named resource
const extractNames = (arr: RawNamedResource[]): TypeName[] => arr.map((t) => t.name as TypeName)

// convert to damage type
export const toDamage = (no: RawNamedResource[], half: RawNamedResource[], double: RawNamedResource[]): Damage => ({
	noDamage: extractNames(no),
	halfDamage: extractNames(half),
	doubleDamage: extractNames(double)
})

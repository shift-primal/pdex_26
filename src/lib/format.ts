export const formatId = (id: number): string => `#${id.toString().padStart(4, "0")}`

// Pokémon whose canonical display name can't be derived from their API slug by the generic
// hyphen/space Title Case rule below — a real hyphen ("-" is otherwise just a word separator
// in these slugs), or punctuation (., ', :) the slug drops entirely. Verified against PokeAPI's
// own `names` (English) for each.
const SPECIAL_CASE_NAMES: Record<string, string> = {
	"ho-oh": "Ho-Oh",
	"porygon-z": "Porygon-Z",
	"jangmo-o": "Jangmo-o",
	"hakamo-o": "Hakamo-o",
	"kommo-o": "Kommo-o",
	"wo-chien": "Wo-Chien",
	"chien-pao": "Chien-Pao",
	"ting-lu": "Ting-Lu",
	"chi-yu": "Chi-Yu",
	"mr-mime": "Mr. Mime",
	"mime-jr": "Mime Jr.",
	"mr-rime": "Mr. Rime",
	farfetchd: "Farfetch'd",
	sirfetchd: "Sirfetch'd",
	"type-null": "Type: Null",
	"nidoran-f": "Nidoran♀",
	"nidoran-m": "Nidoran♂",
	flabebe: "Flabébé"
}

export function formatText(text: string) {
	const special = SPECIAL_CASE_NAMES[text]
	if (special) return special

	return text
		.replaceAll(" ", "-")
		.split("-")
		.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
		.join(" ")
}

export function getFormName(formName: string, baseName: string) {
	return formName.replaceAll(`${baseName}-`, "").replaceAll("-", " ")
}

export const getPokemonHeight = (height: number) => {
	const heightToImperial = (height: number) => {
		const totalInches = Math.round(height * 39.37)
		return `${Math.floor(totalInches / 12)}'${totalInches % 12}"`
	}

	return `${height / 10} m (${heightToImperial(height / 10)})`
}

export const getPokemonWeight = (weight: number) => {
	const weightToImperial = (weight: number) => `${Math.round(weight * 2.2)}lbs`

	return `${weight / 10} kg (${weightToImperial(weight / 10)})`
}

export const getPokemonEggCycles = (hatchCounter: number) => {
	// Hatch counter > 40 means that the pokemon does not have eggs
	if (hatchCounter > 40) return "N/A"
	return `${(hatchCounter * 255).toLocaleString("nb-NO")} steps`
}

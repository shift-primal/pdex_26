export const formatId = (id: number): string => `#${id.toString().padStart(4, "0")}`

export function capFirstLetter(text: string) {
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
		const inches = height * 39.37
		return `${Math.floor(inches / 12)}'${Math.round(inches % 12)}"`
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

/** Turn gender suffixes into symbols: `nidoran-f` → "nidoran ♀", `pyroar-male` → "pyroar ♂". */
export function formatGenderSuffix(name: string): string {
	return name
		.replace(/-female$/, " ♀")
		.replace(/-male$/, " ♂")
		.replace(/-f$/, " ♀")
		.replace(/-m$/, " ♂")
}

import { MAX_DEX_ID } from "#/config/general"
import type { RawNamedResource } from "#/types/generic"
import type { PokemonEvolutionNode, PokemonForm } from "#/types/pokemon"

export const findAdjacentPokemon = (currId: number, list: RawNamedResource[]) => {
	const index = currId - 1
	return {
		prev: list[(index - 1 + MAX_DEX_ID) % MAX_DEX_ID],
		next: list[(index + 1) % MAX_DEX_ID]
	}
}

export const flattenEvolutions = (node: PokemonEvolutionNode): PokemonEvolutionNode[] => [
	node,
	...node.evolvesTo.flatMap(flattenEvolutions)
]

export const formatId = (id: number): string => `#${id.toString().padStart(4, "0")}`

export const genderVariants = (forms: PokemonForm[]) =>
	forms.filter((f) => f.name.endsWith("-male") || f.name.endsWith("-female"))

export const formVariants = (forms: PokemonForm[]) =>
	forms.filter((f) => !f.isDefault && !f.name.endsWith("-male") && !f.name.endsWith("-female"))

export function getSpriteSize(size: "sm" | "md" | "lg" | "xl") {
	const sizes = {
		sm: "w-24 h-24",
		md: "w-64 h-64",
		lg: "w-72 h-72",
		xl: "w-120 h-120"
	}
	return sizes[size]
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
	if (hatchCounter > 40) return "N/A"
	return `${(hatchCounter * 255).toLocaleString("nb-NO")} steps`
}

export function findEvolutionNode(node: PokemonEvolutionNode, name: string): PokemonEvolutionNode | null {
	if (node.name === name) return node
	for (const child of node.evolvesTo) {
		const found = findEvolutionNode(child, name)
		if (found) return found
	}
	return null
}

export function findEvolutionParent(node: PokemonEvolutionNode, name: string): PokemonEvolutionNode | null {
	if (node.evolvesTo.some((c) => c.name === name)) return node
	for (const child of node.evolvesTo) {
		const found = findEvolutionParent(child, name)
		if (found) return found
	}
	return null
}

export function buildEvolutionChain(root: PokemonEvolutionNode): string[] {
	const result = [root.name]
	let node = root
	while (node.evolvesTo.length === 1) {
		node = node.evolvesTo[0]
		result.push(node.name)
	}
	return result
}

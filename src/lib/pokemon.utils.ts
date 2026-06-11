import type { RawNamedResource } from "#/types/generic";
import type { PokemonEvolutionNode, PokemonForm } from "#/types/pokemon";
import type { AdjacentPokemon } from "#/types/raw/list";

export const findAdjacentPokemon = (
	currId: number,
	list: RawNamedResource[],
): AdjacentPokemon => {
	const MAX_DEX_ID = 1025;
	const index = currId - 1;
	return {
		prev: list[(index - 1 + MAX_DEX_ID) % MAX_DEX_ID],
		next: list[(index + 1) % MAX_DEX_ID],
	};
};

export const flattenEvolutions = (
	node: PokemonEvolutionNode,
): PokemonEvolutionNode[] => [
	node,
	...node.evolvesTo.flatMap(flattenEvolutions),
];

export const formatId = (id: number): string =>
	`#${id.toString().padStart(4, "0")}`;

export const genderVariants = (forms: PokemonForm[]) =>
	forms.filter((f) => f.name.endsWith("-male") || f.name.endsWith("-female"));

export const formVariants = (forms: PokemonForm[]) =>
	forms.filter(
		(f) =>
			!f.isDefault &&
			!f.name.endsWith("-male") &&
			!f.name.endsWith("-female"),
	);

export function getSpriteSize(size: "sm" | "md" | "lg" | "xl") {
	const sizes = {
		sm: "w-24 h-24",
		md: "w-32 h-32",
		lg: "w-48 h-48",
		xl: "w-72 h-72",
	};
	return sizes[size];
}

export function getFormName(formName: string, baseName: string) {
	console.log("formName:", formName);
	console.log("baseName:", baseName);
	return formName.replaceAll(`${baseName}-`, "").replaceAll("-", " ");
}

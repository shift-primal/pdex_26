import type { PokemonEvolutionNode } from "#/types/pokemon"

export const flattenEvolutions = (node: PokemonEvolutionNode): PokemonEvolutionNode[] => [
	node,
	...node.evolvesTo.flatMap(flattenEvolutions)
]

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

export type EvolutionLayout =
	| { kind: "single"; node: PokemonEvolutionNode } // no evolutions (e.g. Tauros)
	| { kind: "linear"; line: PokemonEvolutionNode[] } // a → b → c
	| { kind: "branch"; base: PokemonEvolutionNode; branches: PokemonEvolutionNode[] } // Eevee / Tyrogue
	| { kind: "tree"; root: PokemonEvolutionNode } // nested branches (e.g. Wurmple)

function linearLine(root: PokemonEvolutionNode): PokemonEvolutionNode[] {
	const line = [root]
	let node = root
	while (node.evolvesTo.length === 1) {
		node = node.evolvesTo[0]
		line.push(node)
	}
	return line
}

export function getEvolutionLayout(root: PokemonEvolutionNode): EvolutionLayout {
	const branchPoints = flattenEvolutions(root).filter((n) => n.evolvesTo.length > 1)

	if (branchPoints.length === 0)
		return root.evolvesTo.length === 0 ? { kind: "single", node: root } : { kind: "linear", line: linearLine(root) }

	// one branch point, at the root, whose children are all leaves → Eevee / Tyrogue
	const isRootFan =
		branchPoints.length === 1 && branchPoints[0] === root && root.evolvesTo.every((c) => c.evolvesTo.length === 0)

	if (isRootFan) return { kind: "branch", base: root, branches: root.evolvesTo }

	return { kind: "tree", root }
}

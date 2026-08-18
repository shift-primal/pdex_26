import { useHotkey } from "@tanstack/react-hotkeys"
import { useNavigate } from "@tanstack/react-router"
import type { Neighbors } from "#/queries/adjacent"

export const useAdjacentHotkeys = (neighbors: Neighbors) => {
	const navigate = useNavigate({ from: "/pokemon/$id" })

	useHotkey("ArrowLeft", () =>
		navigate({ to: "/pokemon/$id", params: { id: neighbors.prev.name }, search: (s) => ({ tab: s.tab }) })
	)
	useHotkey("ArrowRight", () =>
		navigate({ to: "/pokemon/$id", params: { id: neighbors.next.name }, search: (s) => ({ tab: s.tab }) })
	)
}

import type { Neighbors } from "#/queries/adjacent"
import { useHotkey } from "@tanstack/react-hotkeys"
import { useNavigate } from "@tanstack/react-router"

export const useAdjacentHotkeys = (neighbors: Neighbors) => {
	const navigate = useNavigate()
	useHotkey("ArrowLeft", () => navigate({ to: "/pokemon/$id", params: { id: neighbors.prev.name } }))
	useHotkey("ArrowRight", () => navigate({ to: "/pokemon/$id", params: { id: neighbors.next.name } }))
}

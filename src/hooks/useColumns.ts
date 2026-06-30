import { useSyncExternalStore } from "react"

// mirrors the GRID breakpoints in Pokedex.tsx (2 → 3 → 4 → 5 → 6)
const BREAKPOINTS = [
	["(min-width: 1536px)", 6],
	["(min-width: 1280px)", 5],
	["(min-width: 1024px)", 4],
	["(min-width: 640px)", 3]
] as const

/** Cards-per-row at the current viewport, matching the responsive grid.
 *  Subscribes to `matchMedia` via `useSyncExternalStore` (no effect). */
export const useColumns = () =>
	useSyncExternalStore(
		(onChange) => {
			const mqls = BREAKPOINTS.map(([q]) => window.matchMedia(q))
			for (const m of mqls) m.addEventListener("change", onChange)
			return () => {
				for (const m of mqls) m.removeEventListener("change", onChange)
			}
		},
		() => BREAKPOINTS.find(([q]) => window.matchMedia(q).matches)?.[1] ?? 2,
		() => 2 // SSR / base breakpoint
	)

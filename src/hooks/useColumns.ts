import { useSyncExternalStore } from "react"

export const BASE_COLUMNS = 2

export const COLUMN_BREAKPOINTS = [
	["(min-width: 1536px)", 6],
	["(min-width: 1280px)", 5],
	["(min-width: 1024px)", 4],
	["(min-width: 640px)", 3]
] as const

export const useColumns = () =>
	useSyncExternalStore(
		(onChange) => {
			const mqls = COLUMN_BREAKPOINTS.map(([q]) => window.matchMedia(q))
			for (const m of mqls) m.addEventListener("change", onChange)
			return () => {
				for (const m of mqls) m.removeEventListener("change", onChange)
			}
		},
		() => COLUMN_BREAKPOINTS.find(([q]) => window.matchMedia(q).matches)?.[1] ?? BASE_COLUMNS,
		() => BASE_COLUMNS
	)

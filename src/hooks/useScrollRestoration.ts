import { useLayoutEffect } from "react"

const PREFIX = "dex-scroll:"

export const useScrollRestoration = (key: string) => {
	useLayoutEffect(() => {
		const saved = sessionStorage.getItem(PREFIX + key)
		window.scrollTo(0, saved ? Number(saved) : 0)

		let frame = 0
		const persist = () => sessionStorage.setItem(PREFIX + key, String(window.scrollY))
		const onScroll = () => {
			cancelAnimationFrame(frame)
			frame = requestAnimationFrame(persist)
		}
		window.addEventListener("scroll", onScroll, { passive: true })
		return () => {
			cancelAnimationFrame(frame)
			window.removeEventListener("scroll", onScroll)
			persist() // capture final position before unmount / key change
		}
	}, [key])
}

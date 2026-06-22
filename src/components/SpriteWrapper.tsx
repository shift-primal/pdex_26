import { cn } from "#/lib/utils"
import { useState } from "react"

const SHOWDOWN_DIR = "/other/showdown/"
const HOME_DIR = "/other/home/"
const OFFICIAL_DIR = "/other/official-artwork/"

// Sprites come in as derived showdown URLs (animated gifs). Showdown lacks gen-9 coverage and some
// forms, so degrade at render time: showdown → home → official-artwork → nothing. Each tier is a
// string-swap off the showdown URL; the art tiers also need .gif → .png.
const toHome = (url: string) => url.replace(SHOWDOWN_DIR, HOME_DIR).replace(/\.gif$/, ".png")
const toOfficial = (url: string) => url.replace(SHOWDOWN_DIR, OFFICIAL_DIR).replace(/\.gif$/, ".png")

const buildTiers = (url: string | null | undefined): string[] => (url ? [url, toHome(url), toOfficial(url)] : [])

export const SpriteWrapper = ({
	spriteUrl,
	fallbackUrl,
	size = 64,
	scale = 1,
	alt = "Image"
}: {
	spriteUrl: string | null | undefined
	fallbackUrl?: string | null
	size?: number
	scale?: number
	alt?: string
}) => {
	// Try the requested sprite's cascade (showdown → home → official-artwork), then fall through to the
	// fallback sprite's cascade — so a missing gender sprite lands on the male/default rather than
	// "not found". Dedupe in case the requested and fallback URLs already coincide.
	const candidates = [...new Set([...buildTiers(spriteUrl), ...buildTiers(fallbackUrl)])]

	const [tier, setTier] = useState(0)
	const key = candidates.join("|")
	const [prevKey, setPrevKey] = useState(key)
	if (key !== prevKey) {
		setPrevKey(key)
		setTier(0)
	}

	const src = candidates[tier] ?? null
	const isShowdown = !!src?.includes(SHOWDOWN_DIR)

	return (
		<div
			style={{ width: size, height: size }}
			className={cn("relative flex items-end justify-center overflow-hidden", isShowdown ? "pixel-art" : "")}
		>
			{!src && <p>Sprite not found!</p>}
			{src && (
				<img
					src={src}
					alt={alt}
					// items-end + justify-center plants it bottom-centered; origin-bottom + a uniform scale
					// enlarges every sprite by the same factor, filling the box while keeping relative sizes.
					className={cn("max-h-full max-w-full origin-bottom", `scale-[${scale}]`)}
					onError={() => setTier((t) => t + 1)}
				/>
			)}
		</div>
	)
}

import { useEffect, useRef, useState } from "react"
import { cn } from "#/lib/utils"

const SHOWDOWN_DIR = "/other/showdown/"
const HOME_DIR = "/other/home/"
const OFFICIAL_DIR = "/other/official-artwork/"

const toHome = (url: string) => url.replace(SHOWDOWN_DIR, HOME_DIR).replace(/\.gif$/, ".png")
const toOfficial = (url: string) => url.replace(SHOWDOWN_DIR, OFFICIAL_DIR).replace(/\.gif$/, ".png")

const buildTiers = (url: string | null | undefined): string[] => (url ? [url, toHome(url), toOfficial(url)] : [])

export const SpriteWrapper = ({
	spriteUrl,
	fallbackUrl,
	size = 64,
	alt = "Image",
	scale = 1
}: {
	spriteUrl: string | null | undefined
	fallbackUrl?: string | null
	size?: number
	alt?: string
	scale?: number
}) => {
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

	const [loadedSrc, setLoadedSrc] = useState<string | null>(null)
	const isLoaded = loadedSrc === src
	const spinnerSize = Math.min(40, Math.max(14, Math.round(size * 0.32)))

	const imgRef = useRef<HTMLImageElement>(null)
	// catch ssr img load before hydration
	useEffect(() => {
		const img = imgRef.current
		if (!img?.complete) return
		if (img.naturalWidth > 0) setLoadedSrc(src)
		else setTier((t) => t + 1)
	}, [src])

	return (
		<div
			style={{ width: size, height: size }}
			className={cn("relative flex items-end justify-center", isShowdown ? "pixel-art" : "")}
		>
			{src && (
				<>
					{!isLoaded && (
						<div className="pointer-events-none absolute inset-0 grid place-items-center">
							<div
								className="animate-spin rounded-full border-2 border-line border-t-type"
								style={{ width: spinnerSize, height: spinnerSize }}
							/>
						</div>
					)}
					<img
						ref={imgRef}
						src={src}
						alt={alt}
						draggable={false}
						style={{ maxHeight: size, maxWidth: size, transform: `scale(${scale})` }}
						className={cn("select-none origin-bottom", !isLoaded && "invisible")}
						onLoad={() => setLoadedSrc(src)}
						onError={() => setTier((t) => t + 1)}
					/>
				</>
			)}
		</div>
	)
}

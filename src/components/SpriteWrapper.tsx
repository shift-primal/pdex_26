import { useState } from "react"

const HOME_DIR = "/other/home/"
const OFFICIAL_DIR = "/other/official-artwork/"

export const SpriteWrapper = ({
	spriteUrl,
	size = 64,
	alt = "Image"
}: {
	spriteUrl: string | null | undefined
	size?: number
	alt?: string
}) => {
	// HOME urls are sometimes derived (for /pokemon-form, which the API doesn't link), so they can
	// 404. Degrade gracefully: home → official-artwork → nothing. Reset when the sprite prop changes.
	const [tier, setTier] = useState(0)
	const [prevUrl, setPrevUrl] = useState(spriteUrl)
	if (spriteUrl !== prevUrl) {
		setPrevUrl(spriteUrl)
		setTier(0)
	}

	const src =
		tier === 0
			? spriteUrl
			: tier === 1 && spriteUrl?.includes(HOME_DIR)
				? spriteUrl.replace(HOME_DIR, OFFICIAL_DIR)
				: null

	return (
		<div style={{ width: size, height: size }}>
			{!src && <p>Sprite not found!</p>}
			{src && <img src={src} alt={alt} className="w-full h-full" onError={() => setTier((t) => t + 1)} />}
		</div>
	)
}

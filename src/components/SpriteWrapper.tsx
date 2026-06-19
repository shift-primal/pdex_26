export const SpriteWrapper = ({
	spriteUrl,
	size = 64,
	alt = "Image"
}: {
	spriteUrl: string | null | undefined
	size?: number
	alt?: string
}) => {
	return (
		<div style={{ width: size, height: size }}>
			{!spriteUrl && <p>Sprite not found!</p>}
			{spriteUrl && <img src={spriteUrl} alt={alt} className="w-full h-full" />}
		</div>
	)
}

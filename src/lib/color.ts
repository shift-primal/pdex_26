function luminance(hex: string): number {
	const v = hex.replace("#", "")
	const channel = (h: string) => {
		const c = Number.parseInt(h, 16) / 255
		return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
	}
	const r = channel(v.slice(0, 2))
	const g = channel(v.slice(2, 4))
	const b = channel(v.slice(4, 6))
	return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

const INK_DARK = "#1b1b1f"
const INK_LIGHT = "#fffdf7"

const contrast = (a: number, b: number) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)

export const readableInk = (hex: string): string => {
	const l = luminance(hex)
	return contrast(l, luminance(INK_DARK)) >= contrast(l, luminance(INK_LIGHT)) ? INK_DARK : INK_LIGHT
}

export const typeVars = (primary: string, secondary?: string) =>
	({
		"--type": primary,
		"--type-2": secondary ?? primary,
		"--on-type": readableInk(primary)
	}) as React.CSSProperties

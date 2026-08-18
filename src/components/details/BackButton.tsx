import { CaretLeftIcon } from "@phosphor-icons/react"
import { Link } from "@tanstack/react-router"

const VARIANT_CLASSES = {
	pill: "rounded-full bg-(--on-type)/10 px-3 py-1.5 text-[0.66rem] text-(--on-type) hover:bg-(--on-type)/20",
	plain: "rounded-full px-2 py-1.5 text-[0.68rem] text-ink-soft hover:text-ink"
} as const

export const BackButton = ({ variant = "pill" }: { variant?: keyof typeof VARIANT_CLASSES }) => (
	<Link
		to="/pokemon"
		search={{ search: undefined, types: [], sort: "id", dir: "asc" }}
		className={`inline-flex items-center gap-1.5 font-mono font-bold uppercase tracking-widest transition ${VARIANT_CLASSES[variant]}`}
	>
		<CaretLeftIcon className="size-3.5" weight="bold" />
		Pokédex
	</Link>
)

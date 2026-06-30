import { CaretLeftIcon } from "@phosphor-icons/react"
import { Link } from "@tanstack/react-router"

export const BackButton = () => (
	<Link
		to="/pokemon"
		search={{ search: undefined, types: [], sort: "id", dir: "asc" }}
		className="inline-flex items-center gap-1.5 rounded-full bg-(--on-type)/10 px-3 py-1.5 font-mono text-[0.66rem] font-bold uppercase tracking-widest text-(--on-type) transition hover:bg-(--on-type)/20"
	>
		<CaretLeftIcon className="size-3.5" weight="bold" />
		Pokédex
	</Link>
)

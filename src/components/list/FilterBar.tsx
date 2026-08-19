import { CaretDownIcon, FunnelIcon, SortAscendingIcon, SortDescendingIcon, XIcon } from "@phosphor-icons/react"
import { useState } from "react"
import { formatText } from "#/lib/format"
import { SORT_FIELDS } from "#/lib/schemas/searchPokemon"
import { cn } from "#/lib/utils"
import { TYPE_NAMES, typeVisual } from "#/theme/pokemon-types.theme"
import type { TypeName } from "#/types/pokemon"

type Sort = (typeof SORT_FIELDS)[number]
type Dir = "asc" | "desc"

const SORT_LABEL: Record<Sort, string> = { id: "Dex №", name: "A–Z" }

const TypeChip = ({ type, active, onClick }: { type: TypeName; active: boolean; onClick: () => void }) => {
	const { color, Icon, ink } = typeVisual(type)
	return (
		<button
			type="button"
			onClick={onClick}
			aria-pressed={active}
			title={formatText(type)}
			style={
				active
					? { backgroundColor: color, color: ink, boxShadow: `0 6px 16px -9px ${color}` }
					: { borderColor: `color-mix(in oklab, ${color} 40%, white)` }
			}
			className={cn(
				"inline-flex items-center gap-1.5 rounded-full py-1.5 font-mono text-[0.62rem] font-bold uppercase tracking-widest transition",
				active ? "px-3" : "border bg-sheet pl-1.5 pr-3 text-ink-soft hover:text-ink"
			)}
		>
			{active ? (
				<Icon className="size-3.5 [&_path]:fill-current" style={{ color: ink }} />
			) : (
				<span className="grid size-4 place-items-center rounded-full" style={{ backgroundColor: color }}>
					<Icon className="size-2.5 [&_path]:fill-current" style={{ color: ink }} />
				</span>
			)}
			{type}
		</button>
	)
}

export const FilterBar = ({
	types,
	sort,
	dir,
	onTypesChange,
	onSortChange,
	onDirChange
}: {
	types: TypeName[]
	sort: Sort
	dir: Dir
	onTypesChange: (types: TypeName[]) => void
	onSortChange: (sort: Sort) => void
	onDirChange: (dir: Dir) => void
}) => {
	const [open, setOpen] = useState(false)
	// drop oldest selection on selecting a third type
	const toggle = (t: TypeName) =>
		onTypesChange(types.includes(t) ? types.filter((x) => x !== t) : [...types, t].slice(-2))

	return (
		<div className="mb-8 flex flex-col gap-4 border-t border-line pt-6">
			{/* control row */}
			<div className="flex items-center gap-3">
				{/* mobile: accordion toggle */}
				<button
					type="button"
					onClick={() => setOpen((o) => !o)}
					aria-expanded={open}
					className="inline-flex items-center gap-2 rounded-full border border-line bg-sheet px-3.5 py-2 font-mono text-[0.62rem] font-bold uppercase tracking-widest text-ink-soft transition hover:text-ink lg:hidden"
				>
					<FunnelIcon className="size-3.5" weight="bold" />
					Type
					{types.length > 0 && (
						<span className="grid size-4 place-items-center rounded-full bg-ink font-sans text-[0.6rem] text-paper">
							{types.length}
						</span>
					)}
					<CaretDownIcon className={cn("size-3 transition", open && "rotate-180")} weight="bold" />
				</button>

				{/* sort (always visible) */}
				<div className="ml-auto flex items-center gap-2">
					<div className="flex gap-1 rounded-full border border-line bg-sheet p-1">
						{SORT_FIELDS.map((f) => (
							<button
								key={f}
								type="button"
								onClick={() => onSortChange(f)}
								aria-pressed={sort === f}
								className={cn(
									"rounded-full px-3 py-1 font-mono text-[0.62rem] font-bold uppercase tracking-widest transition",
									sort === f ? "bg-ink text-paper" : "text-ink-soft hover:text-ink"
								)}
							>
								{SORT_LABEL[f]}
							</button>
						))}
					</div>
					<button
						type="button"
						onClick={() => onDirChange(dir === "asc" ? "desc" : "asc")}
						aria-label={dir === "asc" ? "Ascending" : "Descending"}
						title={dir === "asc" ? "Ascending" : "Descending"}
						className="grid size-9 place-items-center rounded-full border border-line bg-sheet text-ink-soft transition hover:border-ink/30 hover:text-ink"
					>
						{dir === "asc" ? (
							<SortAscendingIcon className="size-4" weight="bold" />
						) : (
							<SortDescendingIcon className="size-4" weight="bold" />
						)}
					</button>
				</div>
			</div>

			{/* type chips — collapsible on mobile, always shown on lg */}
			<div
				className={cn(
					"flex-wrap items-center justify-center gap-y-2 gap-x-4",
					open ? "flex" : "hidden lg:flex"
				)}
			>
				{TYPE_NAMES.map((t) => (
					<TypeChip key={t} type={t} active={types.includes(t)} onClick={() => toggle(t)} />
				))}
				{types.length > 0 && (
					<button
						type="button"
						onClick={() => onTypesChange([])}
						className="inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 font-mono text-[0.62rem] font-bold uppercase tracking-widest text-ink-faint transition hover:text-ink"
					>
						<XIcon className="size-3.5" weight="bold" />
						Clear
					</button>
				)}
			</div>
		</div>
	)
}

import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react"
import { useEffect, useRef, useState } from "react"

export const SearchBar = ({
	defaultValue = "",
	onSearch,
	placeholder = "Search by name…",
	delay = 250
}: {
	defaultValue?: string
	onSearch: (value: string) => void
	placeholder?: string
	delay?: number
}) => {
	const [value, setValue] = useState(defaultValue)
	const onSearchRef = useRef(onSearch)
	onSearchRef.current = onSearch

	useEffect(() => {
		const t = setTimeout(() => onSearchRef.current(value.trim()), delay)
		return () => clearTimeout(t)
	}, [value, delay])

	return (
		<div className="group relative w-full">
			<MagnifyingGlassIcon
				className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ink-faint transition group-focus-within:text-ink"
				weight="bold"
			/>
			<input
				type="search"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder={placeholder}
				className="w-full rounded-full border border-line bg-sheet py-3.5 pl-12 pr-11 font-sans text-base text-ink shadow-sm outline-none transition placeholder:text-ink-faint focus:border-ink/30 focus:shadow-md"
			/>
			{value && (
				<button
					type="button"
					onClick={() => setValue("")}
					aria-label="Clear search"
					className="absolute right-3 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-ink-faint transition hover:bg-line hover:text-ink"
				>
					<XIcon className="size-4" weight="bold" />
				</button>
			)}
		</div>
	)
}

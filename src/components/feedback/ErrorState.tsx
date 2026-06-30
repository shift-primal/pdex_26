import { ArrowClockwiseIcon, ArrowLeftIcon } from "@phosphor-icons/react"
import { Link } from "@tanstack/react-router"
import PokeballIcon from "#/assets/pokeball.svg?react"

export const ErrorState = ({
	error,
	reset,
	eyebrow = "Error",
	title = "Couldn’t catch that one"
}: {
	error?: Error
	reset?: () => void
	eyebrow?: string
	title?: string
}) => (
	<div className="grid min-h-dvh place-items-center bg-paper px-6">
		<div className="flex max-w-md flex-col items-center text-center">
			<PokeballIcon className="size-14 text-ink opacity-10 [&_path]:fill-current" />
			<p className="mt-6 font-mono text-[0.7rem] font-bold uppercase tracking-[0.3em] text-ink-faint">
				{eyebrow}
			</p>
			<h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-ink">{title}</h1>
			{error?.message && <p className="mt-3 text-sm text-ink-soft">{error.message}</p>}

			<div className="mt-7 flex flex-wrap items-center justify-center gap-3">
				{reset && (
					<button
						type="button"
						onClick={reset}
						className="inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 font-mono text-[0.7rem] font-bold uppercase tracking-widest text-paper transition hover:opacity-90"
					>
						<ArrowClockwiseIcon className="size-3.5" weight="bold" />
						Try again
					</button>
				)}
				<Link
					to="/pokemon"
					search={{ search: undefined }}
					className="inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 font-mono text-[0.7rem] font-bold uppercase tracking-widest text-ink-soft transition hover:border-ink/30 hover:text-ink"
				>
					<ArrowLeftIcon className="size-3.5" weight="bold" />
					Back to the dex
				</Link>
			</div>
		</div>
	</div>
)

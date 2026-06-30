import { GithubLogoIcon } from "@phosphor-icons/react"
import { cn } from "#/lib/utils"

const GITHUB_URL = "https://github.com/shift-primal"

export const Footer = ({ className }: { className?: string }) => (
	<footer className={cn("border-t border-line bg-paper", className)}>
		<div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-8 sm:flex-row sm:px-6 lg:px-10">
			<p className="font-mono text-[0.66rem] font-bold uppercase tracking-[0.2em] text-ink-faint">
				Pokédex · data from PokéAPI
			</p>
			<a
				href={GITHUB_URL}
				target="_blank"
				rel="noreferrer"
				className="inline-flex items-center gap-1.5 font-mono text-[0.66rem] font-bold uppercase tracking-[0.2em] text-ink-soft transition hover:text-ink"
			>
				<GithubLogoIcon className="size-4" weight="bold" />
				GitHub
			</a>
		</div>
	</footer>
)

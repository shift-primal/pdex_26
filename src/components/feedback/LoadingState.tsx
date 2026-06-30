import PokeballIcon from "#/assets/pokeball.svg?react"

export const LoadingState = ({ label = "Loading" }: { label?: string }) => (
	<div className="grid min-h-dvh place-items-center bg-paper">
		<div className="flex flex-col items-center gap-4">
			<PokeballIcon className="size-12 animate-spin text-ink opacity-30 [animation-duration:1.4s] [&_path]:fill-current" />
			<p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.2em] text-ink-faint">{label}…</p>
		</div>
	</div>
)

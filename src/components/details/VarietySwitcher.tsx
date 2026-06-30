import { useSuspenseQueries } from "@tanstack/react-query"
import { Chip } from "#/components/Chip"
import { defaultVarietyName, getVariants } from "#/lib/domain/pokemon.utils"
import { formatText } from "#/lib/format"
import { formQueryOptions } from "#/queries/form"
import { usePrefetchVariety } from "#/queries/prefetch"
import type { Species, Variety } from "#/types/pokemon"

export const VarietySwitcher = ({ species, activeVariety }: { species: Species; activeVariety: Variety }) => {
	const variants = getVariants(species, activeVariety)
	const forms = useSuspenseQueries({ queries: variants.map((v) => formQueryOptions(v.name)) })
	const options = variants.map((v, i) => ({ ...v, form: forms[i].data }))
	const defaultName = defaultVarietyName(species)
	const prefetchVariety = usePrefetchVariety()

	if (variants.length === 0) {
		return (
			<div className="reveal flex h-32 items-center justify-center rounded-2xl border border-dashed border-line">
				<p className="font-mono text-xs uppercase tracking-widest text-ink-faint">No alternate forms</p>
			</div>
		)
	}

	return (
		<div className="reveal grid grid-cols-2 gap-3 sm:grid-cols-3">
			{options.map((o) => (
				<Chip
					key={o.name}
					from="/pokemon/$id"
					search={(s) =>
						o.kind === "variety"
							? {
									...s,
									variety: o.name === defaultName ? undefined : o.name,
									form: undefined,
									gender: undefined
								}
							: { ...s, form: o.name, gender: undefined }
					}
					sprite={o.form.sprites.front.default.normal}
					label={formatText(o.form.displayName)}
					title={formatText(o.form.displayName)}
					prefetch={() => prefetchVariety(o.name)}
				/>
			))}
		</div>
	)
}

import { Chip } from "#/components/Chip"
import { TemporaryWrapper } from "#/components/TemporaryWrapper"
import { defaultVarietyName, getVariants } from "#/lib/domain/pokemon.utils"
import { formatText } from "#/lib/format"
import { formQueryOptions } from "#/queries/form"
import type { Species, Variety } from "#/types/pokemon"
import { useSuspenseQueries } from "@tanstack/react-query"

export const VarietySwitcher = ({ species, activeVariety }: { species: Species; activeVariety: Variety }) => {
	const variants = getVariants(species, activeVariety)
	const forms = useSuspenseQueries({ queries: variants.map((v) => formQueryOptions(v.name)) })
	const options = variants.map((v, i) => ({ ...v, form: forms[i].data }))
	const defaultName = defaultVarietyName(species)

	const hasVarieties = variants.length > 0

	return (
		<TemporaryWrapper title="Varieties">
			{hasVarieties && (
				<div className="flex flex-wrap gap-2">
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
							sprite={o.form.sprites.front.default}
							title={formatText(o.form.displayName)}
						/>
					))}
				</div>
			)}
			{!hasVarieties && <p>No varieties</p>}
		</TemporaryWrapper>
	)
}

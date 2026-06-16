import { formatId, getFormName } from "#/lib/pokemon.utils"
import type { Pokemon, PokemonBasic, PokemonElementalType } from "#/types/pokemon"
import { Pokeball } from "#/assets/Pokeball"
import { PokemonSprite } from "#/components/pokemon/PokemonSprite"
import PokemonCardContext from "#/context/PokemonCardContext"
import { CardTabs } from "#/components/pokemon/CardTabs"
import { useMobile } from "#/hooks/useMobile"

export interface PokemonCardProps {
	base: Pokemon
	active: PokemonBasic
	evolutions: PokemonBasic[]
	forms: PokemonBasic[]
	activeTab: string
	onTabChange: (tab: string) => void
}

const CardBg = ({ type }: { type: PokemonElementalType }) => {
	return (
		<div
			className="absolute -z-50 w-full h-full overflow-clip"
			style={{
				background: `linear-gradient(to bottom,
                      color-mix(in oklch, ${type.color} 85%, white),
                      ${type.color},
                      color-mix(in oklch, ${type.color} 85%, black))`
			}}
		>
			<Pokeball className="opacity-40 w-lg absolute left-3/4 top-1/8 -translate-x-50 -translate-y-50 drop-shadow-2xl" />
		</div>
	)
}

const CardTitle = ({ name, id, form }: { name: string; id: number; form?: string }) => {
	return (
		<div className="flex flex-col p-6 lg:p-8 z-10 text-shadow-md absolute">
			<div className="flex flex-col">
				<span className="text-4xl lg:text-8xl font-semibold capitalize text-background">{name}</span>
				{form && (
					<span className="text-xl capitalize font-medium text-background block">
						{getFormName(form, name)}
					</span>
				)}
			</div>

			<span className="text-3xl lg:text-5xl font-bold text-muted tracking-tight font-display mt-2">
				{formatId(id)}
			</span>
		</div>
	)
}

export const PokemonCard = ({ base, active, evolutions, forms, activeTab, onTabChange }: PokemonCardProps) => {
	const isMobile = useMobile()

	return (
		<PokemonCardContext.Provider value={{ base, active, evolutions, forms }}>
			<div className="relative flex flex-col h-screen transform-gpu gap-y-2 overflow-clip">
				<CardBg type={active.types[0]} />
				<CardTitle name={base.name} id={base.id} form={active.isDefault ? undefined : active.name} />
				<PokemonSprite
					name={active.name}
					sprites={active.sprites}
					className="mt-24"
					size={isMobile ? "lg" : "xl"}
				/>
				<CardTabs activeTab={activeTab} onTabChange={onTabChange} />
			</div>
		</PokemonCardContext.Provider>
	)
}

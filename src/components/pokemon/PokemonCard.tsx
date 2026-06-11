import { CardTabs } from "#/components/pokemon/card/CardTabs";
import { formatId, getFormName } from "#/lib/pokemon.utils";
import type { PokemonElementalType } from "#/types/pokemon";
import { Pokeball } from "#/assets/Pokeball";
import type { PokemonCardProps } from "#/types/props/card";
import { PokemonSprite } from "#/components/pokemon/PokemonSprite";

const CardBg = ({ type }: { type: PokemonElementalType }) => {
	return (
		<div
			className="absolute -z-50 w-full h-full"
			style={{
				background: `linear-gradient(to bottom,
                      color-mix(in oklch, ${type.color} 85%, white),
                      ${type.color},
                      color-mix(in oklch, ${type.color} 85%, black))`,
			}}
		>
			<Pokeball className="opacity-40 w-lg absolute left-3/4 top-1/8 -translate-x-50 -translate-y-50 drop-shadow-2xl" />
		</div>
	);
};

const CardTitle = ({
	name,
	id,
	form,
}: {
	name: string;
	id: number;
	form?: string;
}) => {
	return (
		<div className="flex flex-col p-6 z-10 text-shadow-md absolute">
			<div className="flex flex-col">
				<span className="text-4xl lg:text-7xl font-semibold capitalize text-background">
					{name}
				</span>
				{form && (
					<span className="text-lg capitalize font-medium text-background block">
						{getFormName(form, name)}
					</span>
				)}
			</div>

			<span className="text-3xl lg:text-3xl font-bold text-muted tracking-tight font-display">
				{formatId(id)}
			</span>
		</div>
	);
};

export const PokemonCard = ({
	pokemon,
	activePokemon,
	activeForm,
	evolutions,
	forms,
	activeTab,
	onTabChange,
}: PokemonCardProps) => {
	return (
		<div className="relative flex flex-col h-screen transform-gpu overflow-clip gap-y-2">
			<CardBg type={activePokemon.types[0]} />
			<CardTitle
				name={pokemon.name}
				id={pokemon.id}
				form={activePokemon.isDefault ? undefined : activeForm.name}
			/>
			<PokemonSprite
				name={activePokemon.name}
				sprites={activePokemon.sprites}
				className="mt-24"
			/>
			<CardTabs
				pokemon={activePokemon}
				activePokemon={activePokemon}
				activeForm={activeForm}
				evolutions={evolutions}
				forms={forms}
				activeTab={activeTab}
				onTabChange={onTabChange}
			/>
		</div>
	);
};

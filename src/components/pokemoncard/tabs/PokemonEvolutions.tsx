import { ArrowDownIcon, ArrowRightIcon } from '@phosphor-icons/react';
import { PokemonImage } from '#/components/pokemoncard/PokemonImage';
import { usePokemon } from '#/hooks/usePokemon';
import { Link } from '@tanstack/react-router';
import type { PokemonEvolutionChain, PokemonEvolutionInfo } from '#/types/pokemon';
import { formatName } from '#/lib/utils-pokemon';

const EvolutionEntry = ({ name, isCurrent = false }: { name: string; isCurrent?: boolean }) => {
    const { data: pokemon, isLoading, isError } = usePokemon(name);

    if (isLoading || isError || !pokemon) return null;

    return (
        <Link
            to="/pokedex/$id"
            params={{ id: pokemon.name }}
            className="flex flex-col items-center"
        >
            <div className="flex-1 flex items-center">
                <PokemonImage sprite={pokemon.sprites.front} size={isCurrent ? 'sm' : 'xs'} />
            </div>

            <span className={isCurrent ? 'font-semibold' : ''}>{formatName(name)}</span>
        </Link>
    );
};

type PokemonEvolutionsProps = {
    current: string;
    evInfo: PokemonEvolutionInfo;
};

const flattenChain = (chain: PokemonEvolutionChain): string[] => {
    if (chain.evolvesTo.length === 0) return [chain.name];
    return [chain.name, ...flattenChain(chain.evolvesTo[0])];
};

export const PokemonEvolutions = ({ current, evInfo }: PokemonEvolutionsProps) => {
    const fanLayout = evInfo.evolvesTo.length > 1;

    const chainNames = flattenChain(evInfo.chain);

    if (fanLayout) {
        return (
            <div className="flex flex-col items-center justify-center gap-4">
                <EvolutionEntry name={current} isCurrent={true} />
                <ArrowDownIcon />
                <div className="flex flex-wrap items-center gap-2 justify-center">
                    {evInfo.evolvesTo.map((pn) => (
                        <EvolutionEntry name={pn} key={pn} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-stretch justify-center gap-4 h-full relative">
            {chainNames.map((name, i) => (
                <div key={name} className="flex items-center gap-4">
                    {i > 0 && <ArrowRightIcon />}
                    <EvolutionEntry name={name} isCurrent={name === current} />
                </div>
            ))}
        </div>
    );
};

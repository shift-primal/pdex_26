import { CardBackground } from '#/components/pokemoncard/CardBackground';
import { Evolutions } from '#/components/pokemoncard/Evolutions';
import { PokemonImage } from '#/components/pokemoncard/PokemonImage';
import { PokemonTitle } from '#/components/pokemoncard/PokemonTitle';
import { TypeBadge } from '#/components/pokemoncard/TypeBadge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '#/components/ui/collapsible';
import type { Pokemon } from '#/types/pokemon';

export const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
    console.log(pokemon);
    return (
        <div className="relative overflow-hidden">
            <CardBackground type={pokemon.types[0]} />
            <PokemonImage sprite={pokemon.sprites.front} />
            <PokemonTitle name={pokemon.name} id={pokemon.id} />
            <div className="flex gap-x-2 px-2">
                {pokemon.types.map((t) => (
                    <TypeBadge key={t.name} type={t} />
                ))}
            </div>
            <Collapsible>
                <CollapsibleTrigger>Evolutions</CollapsibleTrigger>
                <CollapsibleContent>
                    <Evolutions
                        current={pokemon.name}
                        evolvesFrom={pokemon.evolution?.evolvesFrom ?? null}
                        evolvesTo={pokemon.evolution?.evolvesTo ?? []}
                    />
                </CollapsibleContent>
            </Collapsible>
        </div>
    );
};

import { PokemonInfo } from '#/components/pokemoncard/PokemonInfo';
import { Evolutions } from '#/components/pokemoncard/tabs/evolutions/Evolutions';
import { PokemonStats } from '#/components/pokemoncard/tabs/PokemonStats';
import { Varieties } from '#/components/pokemoncard/tabs/variations/Varieties';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '#/components/ui/tabs';
import type { Pokemon } from '#/types/pokemon';

type PokemonTabsProps = {
    pokemon: Pokemon;
    hasEvolutions: boolean;
    hasVarieties: boolean;
};

export const PokemonTabs = ({ pokemon, hasEvolutions, hasVarieties }: PokemonTabsProps) => {
    return (
        <Tabs defaultValue="info">
            <TabsList>
                <TabsTrigger value="info">Info</TabsTrigger>
                <TabsTrigger value="stats">Stats</TabsTrigger>
                <TabsTrigger value="evolutions" disabled={!hasEvolutions}>
                    Evolutions
                </TabsTrigger>
                <TabsTrigger value="varieties" disabled={!hasVarieties}>
                    Varieties
                </TabsTrigger>
            </TabsList>
            <TabsContent value="info">
                <PokemonInfo height={pokemon.height} weight={pokemon.weight} />
            </TabsContent>

            <TabsContent value="stats">
                <PokemonStats stats={pokemon.stats} />
            </TabsContent>

            <TabsContent value="evolutions">
                <Evolutions
                    current={pokemon.name}
                    evolvesFrom={pokemon.evolution?.evolvesFrom ?? null}
                    evolvesTo={pokemon.evolution?.evolvesTo ?? []}
                />
            </TabsContent>

            <TabsContent value="varieties">
                <Varieties current={pokemon.name} varieties={pokemon.varieties} />
            </TabsContent>
        </Tabs>
    );
};

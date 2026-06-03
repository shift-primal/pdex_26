import { PokemonEvolutions } from '#/components/pokemoncard/tabs/PokemonEvolutions';
import { PokemonForms } from '#/components/pokemoncard/tabs/PokemonForms';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '#/components/ui/tabs';
import type { Pokemon } from '#/types/pokemon';
import { PokemonTab } from '#/components/pokemoncard/tabs/PokemonTab';
import { PokemonAbout } from '#/components/pokemoncard/tabs/PokemonAbout';
import { PokemonBaseStats } from '#/components/pokemoncard/tabs/PokemonBaseStats';

type PokemonTabsProps = {
    pokemon: Pokemon;
    hasEvolutions: boolean;
    hasForms: boolean;
};

export const PokemonTabs = ({ pokemon, hasEvolutions, hasForms }: PokemonTabsProps) => {
    return (
        <Tabs
            defaultValue="info"
            className=" mt-6 px-2 py-4 h-full rounded-t-4xl bg-background border-2 drop"
        >
            <TabsList className="w-full" variant="line">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="base-stats">Base Stats</TabsTrigger>
                <TabsTrigger value="evolutions" disabled={!hasEvolutions}>
                    Evolutions
                </TabsTrigger>
                <TabsTrigger value="forms" disabled={!hasForms}>
                    Forms
                </TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="">
                <PokemonTab>
                    <PokemonAbout
                        generation={pokemon.generation ?? null}
                        height={pokemon.height}
                        weight={pokemon.weight}
                        habitat={pokemon.habitat ?? 'Unknown'}
                    />
                </PokemonTab>
            </TabsContent>

            <TabsContent value="base-stats">
                <PokemonTab>
                    <PokemonBaseStats stats={pokemon.stats} />
                </PokemonTab>
            </TabsContent>

            <TabsContent value="evolutions">
                <PokemonTab>
                    <PokemonEvolutions current={pokemon.name} evInfo={pokemon.evolution!} />
                </PokemonTab>
            </TabsContent>

            <TabsContent value="forms">
                <PokemonTab>
                    <PokemonForms current={pokemon.name} forms={pokemon.forms} />
                </PokemonTab>
            </TabsContent>
        </Tabs>
    );
};

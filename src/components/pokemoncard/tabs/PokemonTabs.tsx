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
    activeTab: string;
    onTabChange: (tab: string) => void;
};

export const PokemonTabs = ({
    pokemon,
    hasEvolutions,
    hasForms,
    activeTab,
    onTabChange
}: PokemonTabsProps) => {
    return (
        <Tabs
            value={activeTab}
            onValueChange={onTabChange}
            className=" mt-6 px-2 py-4 h-full rounded-t-4xl bg-muted/30 border-t border-t-accent"
        >
            <TabsList className="w-full" variant="line">
                <TabsTrigger value="about" color={pokemon.types[0].color}>
                    About
                </TabsTrigger>
                <TabsTrigger value="base-stats" color={pokemon.types[0].color}>
                    Base Stats
                </TabsTrigger>
                <TabsTrigger
                    value="evolutions"
                    disabled={!hasEvolutions}
                    color={pokemon.types[0].color}
                >
                    Evolutions
                </TabsTrigger>
                <TabsTrigger value="forms" disabled={!hasForms} color={pokemon.types[0].color}>
                    Forms
                </TabsTrigger>
            </TabsList>

            <TabsContent value="about">
                <PokemonTab>
                    <PokemonAbout pokemon={pokemon} />
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

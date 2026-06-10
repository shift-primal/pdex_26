import { TabContainer } from '#/components/pokemon/tabs/TabContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '#/components/shadcn/tabs';
import { tabsConfig } from '#/config/tabs';
import { TABS } from '#/constants/constants';
import type { PokemonCardProps } from '#/types/props/card';
import type { TabProps } from '#/types/props/tabs';

export const CardTabs = ({
    pokemon,
    evolutions,
    forms,
    activeTab,
    onTabChange
}: PokemonCardProps) => {
    const tabProps: TabProps = { pokemon, evolutions, forms };
    return (
        <Tabs
            value={activeTab}
            onValueChange={onTabChange}
            className="h-full bg-accent/95 shadow-lg border-t border-t-accent/25 mt-6 rounded-t-4xl p-4"
        >
            <TabsList className="w-full" variant="line">
                {TABS.map((t) => (
                    <TabsTrigger key={t} value={t} color={pokemon.types[0].color}>
                        <span className="capitalize text-base">{t.replaceAll('-', ' ')}</span>
                    </TabsTrigger>
                ))}
            </TabsList>
            {TABS.map((t) => {
                const Tab = tabsConfig[t].component;
                return (
                    <TabsContent key={t} value={t}>
                        <TabContainer>
                            <Tab {...tabProps} />
                        </TabContainer>
                    </TabsContent>
                );
            })}
        </Tabs>
    );
};

import { ArrowDownIcon, ArrowRightIcon } from '@phosphor-icons/react';
import { Fragment } from 'react';
import { useQueries } from '@tanstack/react-query';
import type { PokemonEvolutionInfo } from '#/types/pokemon';
import { fetchPokemon } from '#/services/api';
import { LoadingComponent } from '#/components/layout/LoadingComponent';
import { PokemonEntry, selectBasic } from '#/components/pokemoncard/tabs/PokemonEntry';
import { ErrorComponent } from '@tanstack/react-router';
import { buildLinearChain, findNode } from '#/lib/pokemon/chain';

type PokemonEvolutionsProps = {
    current: string;
    evInfo: PokemonEvolutionInfo;
};

type BasicPokemon = ReturnType<typeof selectBasic>;
type EntriesMap = Record<string, BasicPokemon>;

type FanLayoutProps = {
    entries: EntriesMap;
    fanTop: string;
    fanBottom: string[];
    current: string;
};

type NormalLayoutProps = {
    entries: EntriesMap;
    allNames: string[];
    current: string;
};

const FanLayout = ({ entries, fanTop, fanBottom, current }: FanLayoutProps) => (
    <div className="flex flex-col items-center justify-center gap-4">
        <PokemonEntry {...entries[fanTop]} isCurrent={fanTop === current} />
        <ArrowDownIcon />
        <div className="flex flex-wrap items-center gap-2 justify-center">
            {fanBottom.map((pn) => (
                <PokemonEntry key={pn} {...entries[pn]} isCurrent={pn === current} />
            ))}
        </div>
    </div>
);

const NormalLayout = ({ entries, allNames, current }: NormalLayoutProps) => (
    <div className="flex items-start justify-center gap-2 py-4">
        {allNames.map((name, i) => (
            <Fragment key={name}>
                {i > 0 && (
                    <div className="h-24 flex items-center shrink-0">
                        <ArrowRightIcon size={16} className="text-muted-foreground" />
                    </div>
                )}
                <PokemonEntry {...entries[name]} isCurrent={name === current} />
            </Fragment>
        ))}
    </div>
);

export const PokemonEvolutions = ({ current, evInfo }: PokemonEvolutionsProps) => {
    const isBrancher = evInfo.evolvesTo.length > 1;
    const parentNode = evInfo.evolvesFrom ? findNode(evInfo.chain, evInfo.evolvesFrom) : null;
    const isBranch = (parentNode?.evolvesTo.length ?? 0) > 1;
    const fanLayout = isBrancher || isBranch;

    const fanTop = isBrancher ? current : evInfo.evolvesFrom!;
    const fanBottom = isBrancher
        ? evInfo.evolvesTo
        : (parentNode?.evolvesTo.map((e) => e.name) ?? []);
    const allNames = fanLayout ? [fanTop, ...fanBottom] : buildLinearChain(evInfo.chain, current);

    const results = useQueries({
        queries: allNames.map((name) => ({
            queryKey: ['pokemon-basic', name],
            queryFn: () => fetchPokemon(name),
            staleTime: Infinity,
            select: selectBasic
        }))
    });

    if (results.some((r) => !r.data || r.isLoading)) return <LoadingComponent />;

    results.find((r) => r.isError) && <ErrorComponent error={results.find((r) => r.error)} />;

    const entries = Object.fromEntries(results.map((r) => [r.data!.name, r.data!]));

    return (
        <div className="flex items-center justify-center h-full">
            {fanLayout ? (
                <FanLayout
                    entries={entries}
                    fanTop={fanTop}
                    fanBottom={fanBottom}
                    current={current}
                />
            ) : (
                <NormalLayout entries={entries} allNames={allNames} current={current} />
            )}
        </div>
    );
};

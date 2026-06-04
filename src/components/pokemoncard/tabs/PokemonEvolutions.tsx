import { ArrowDownIcon, ArrowRightIcon } from '@phosphor-icons/react';
import { Fragment } from 'react';
import { useQueries } from '@tanstack/react-query';
import type { PokemonEvolutionChain, PokemonEvolutionInfo } from '#/types/pokemon';
import { fetchPokemon } from '#/services/api';
import { LoadingComponent } from '#/components/layout/LoadingComponent';
import { PokemonEntry, selectBasic } from '#/components/pokemoncard/tabs/PokemonEntry';
import { ErrorComponent } from '@tanstack/react-router';

const findNode = (chain: PokemonEvolutionChain, name: string): PokemonEvolutionChain | null => {
    if (chain.name === name) return chain;
    for (const child of chain.evolvesTo) {
        const result = findNode(child, name);
        if (result) return result;
    }
    return null;
};

const buildLinearChain = (chain: PokemonEvolutionChain, current: string): string[] => {
    if (chain.name === current) {
        const path = [chain.name];
        let node = chain.evolvesTo[0];
        while (node) {
            path.push(node.name);
            node = node.evolvesTo[0];
        }
        return path;
    }
    for (const child of chain.evolvesTo) {
        const path = buildLinearChain(child, current);
        if (path.length) return [chain.name, ...path];
    }
    return [];
};

type PokemonEvolutionsProps = {
    current: string;
    evInfo: PokemonEvolutionInfo;
};

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
    if (results.some((r) => r.isError)) return <ErrorComponent error={'Idk'} />;

    const entries = Object.fromEntries(results.map((r) => [r.data!.name, r.data!]));

    if (fanLayout) {
        return (
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
    }

    return (
        <div className="flex items-end justify-center gap-4 py-8">
            {allNames.map((name, i) => (
                <Fragment key={name}>
                    {i > 0 && <ArrowRightIcon className="mb-5 shrink-0 text-muted-foreground" />}
                    <PokemonEntry {...entries[name]} isCurrent={name === current} />
                </Fragment>
            ))}
        </div>
    );
};

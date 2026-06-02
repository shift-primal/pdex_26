import { EvolutionEntry } from '#/components/pokemoncard/tabs/evolutions/EvolutionEntry';
import { ArrowDownIcon, ArrowRightIcon } from '@phosphor-icons/react';

type EvolutionsProps = {
    current: string;
    evolvesFrom: string | null;
    evolvesTo: string[];
};

export const Evolutions = ({ current, evolvesFrom, evolvesTo }: EvolutionsProps) => {
    const fanLayout = evolvesTo.length > 1;
    const hasPrevEv = evolvesFrom !== null;
    const hasNextEv = evolvesTo.length > 0;

    if (fanLayout) {
        return (
            <div className="flex flex-col items-center justify-center gap-4">
                <EvolutionEntry name={current} isCurrent={true} />
                <ArrowDownIcon />
                <div className="flex flex-wrap items-center gap-2 justify-center">
                    {evolvesTo.map((pn) => (
                        <EvolutionEntry name={pn} key={pn} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-stretch justify-center gap-1">
            {hasPrevEv && (
                <div className="flex justify-center items-center">
                    <EvolutionEntry name={evolvesFrom} />
                    <ArrowRightIcon />
                </div>
            )}
            <EvolutionEntry name={current} isCurrent={true} />

            {hasNextEv && (
                <div className="flex justify-center items-center gap-1">
                    <ArrowRightIcon />
                    <EvolutionEntry name={evolvesTo[0]} />
                </div>
            )}
        </div>
    );
};

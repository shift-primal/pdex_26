import { Progress } from '#/components/ui/progress';
import { STATS } from '#/constants';
import type { PokemonStat } from '#/types/pokemon';

export const PokemonBaseStats = ({ stats }: { stats: PokemonStat[] }) => {
    return (
        <div className="flex flex-col gap-4 px-4 h-full justify-center">
            {stats.map((s) => {
                const statName = STATS[s.name].displayName;
                const StatIcon = STATS[s.name].icon;
                const statMax = statName === 'TOTAL' ? 1530 : 255;
                return (
                    <div
                        className="flex items-center justify-between text-sm gap-3 w-full"
                        key={s.name}
                    >
                        <div className="flex gap-x-1.5 items-center w-20 shrink-0">
                            <StatIcon size={16} style={{ color: s.color }} />
                            <span className="text-sm text-center text-muted-foreground">
                                {statName}
                            </span>
                        </div>
                        <span className="font-semibold text-right min-w-8">{s.value}</span>
                        <Progress
                            value={(s.value / statMax) * 100}
                            className="h-2 rounded-full mt-1"
                            colorFilled={s.color}
                            colorUnfilled="#e0e0e0"
                        />
                    </div>
                );
            })}
        </div>
    );
};

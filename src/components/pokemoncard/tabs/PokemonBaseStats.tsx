import { Progress } from '#/components/ui/progress';
import { STATS } from '#/constants';
import type { PokemonStat } from '#/types/pokemon';

export const PokemonBaseStats = ({ stats }: { stats: PokemonStat[] }) => {
    return (
        <div className="flex flex-col gap-4">
            {stats.map((s) => {
                const statName = STATS[s.name].displayName;
                const StatIcon = STATS[s.name].icon;
                return (
                    <div className="flex items-center justify-between px-4 text-sm gap-4">
                        <div className="flex gap-x-1.5 items-center w-20 shrink-0">
                            <StatIcon size={16} style={{ color: s.color }} />
                            <span className="text-sm text-center text-muted-foreground">
                                {statName}
                            </span>
                        </div>
                        <span className="font-semibold">{s.value}</span>
                        <Progress
                            value={(s.value / 255) * 100}
                            className="h-2 rounded-full mt-1"
                            color={s.color}
                        />
                    </div>
                );
            })}
        </div>
    );
};

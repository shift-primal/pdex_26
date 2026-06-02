import { STATS } from '#/constants';
import type { PokemonStat } from '#/types/pokemon';

export const PokemonStats = ({ stats }: { stats: PokemonStat[] }) => {
    return (
        <div className="grid grid-cols-2">
            {stats.map((s) => {
                const statName = STATS[s.name].displayName;
                const statValue = s.value;
                const StatIcon = STATS[s.name].icon;
                return (
                    <div className="flex justify-center">
                        <div className="flex items-center gap-x-1">
                            <StatIcon />
                            <span className="text-sm text-center text-muted">{statName}</span>
                        </div>
                        <span className="font-semibold">{statValue}</span>
                    </div>
                );
            })}
        </div>
    );
};

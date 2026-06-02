import { VarietyEntry } from '#/components/pokemoncard/tabs/variations/VarietyEntry';
import type { PokemonVariety } from '#/types/pokemon';

type VarietiesProps = {
    current: string;
    varieties: PokemonVariety[];
};

export const Varieties = ({ current, varieties }: VarietiesProps) => {
    return (
        <div className="flex flex-wrap items-center gap-2 justify-center">
            <VarietyEntry name={current} />

            {varieties.map((vn) => {
                if (vn.isDefault) return null;

                return (
                    <div key={vn.name}>
                        <VarietyEntry name={vn.name} />
                    </div>
                );
            })}
        </div>
    );
};

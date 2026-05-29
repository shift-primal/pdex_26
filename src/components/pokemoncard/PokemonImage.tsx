export const PokemonImage = ({ sprite }: { sprite: string }) => {
    return (
        <div className="pt-30">
            <div className="w-72 h-72 flex items-center justify-center mx-auto">
                <img src={sprite} className="w-full h-full object-contain" />
            </div>
        </div>
    );
};

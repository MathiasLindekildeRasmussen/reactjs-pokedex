const PokeCard = ({pokemon, cardClass}) => {
    return (
        <div className={`m-2 p-2 w-64 rounded-md border-2 border-gray-600 flex items-center justify-between ${cardClass}`}>
            <div className="flex-1">
                <p className="text-xs font-bold text-gray-600">#{pokemon.details.id}</p>
                <div className="text-2xl font-bold w-32 truncate">{pokemon.name}</div>
            </div>
            <img
                className="w-16 h-16 object-contain"
                src={pokemon.details.sprites.front_default}
                alt={`${pokemon.name} sprite`}
            />
        </div>
    )
}

export default PokeCard;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PokemonDetails = () => {
  const { pokemonName } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [pokemonName]); 

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!pokemon) {
    return <div>No data found</div>;
  }

  // Helper function to capitalize first letter
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  const maxStatValue = 255;

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg">
    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">{pokemon.name.toUpperCase()}</h1>
    <div className="flex flex-col items-center sm:flex-row sm:items-start">
        <img className="w-48 h-48 object-cover rounded-full border-4 border-gray-200 shadow-sm" src={pokemon.sprites.front_default} alt={pokemon.name} />
        <div className="sm:ml-6 mt-4 sm:mt-0 text-center sm:text-left">
            <p className="text-lg text-gray-700"><span className="font-semibold">Height:</span> {pokemon.height * 10} cm</p>
            <p className="text-lg text-gray-700"><span className="font-semibold">Weight:</span> {pokemon.weight / 10} kg</p>
            <div>
                <h3 className="text-xl font-semibold text-gray-800 mt-4">Types:</h3>
                <ul className="list-disc pl-5">
                    {pokemon.types.map(typeEntry => (
                        <li key={typeEntry.type.name} className="text-gray-600">{capitalize(typeEntry.type.name)}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-gray-800 mt-4">Abilities:</h3>
                <ul className="list-disc pl-5">
                    {pokemon.abilities.map(abilityEntry => (
                        <li key={abilityEntry.ability.name} className="text-gray-600">{capitalize(abilityEntry.ability.name)}</li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
    <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800">Stats:</h3>
        {pokemon.stats.map(stat => (
            <div key={stat.stat.name} className="mt-2">
                <div className="text-sm font-semibold text-gray-600">{capitalize(stat.stat.name)}:</div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div title={`${stat.base_stat}`} className={`${stat.stat.name.replace('-', '')} h-2.5 rounded-full`} style={{ width: `${(stat.base_stat / maxStatValue) * 100}%`}}>
                    </div>
                </div>
            </div>
        ))}
    </div>
</div>
  );
};

export default PokemonDetails;

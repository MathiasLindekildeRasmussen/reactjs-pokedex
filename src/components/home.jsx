import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PokeCard from './pokecard';

function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const limit = 20;

  useEffect(() => {
    const fetchPokemons = (pageUrl) => {
      setIsLoading(true);
      fetch(pageUrl)
        .then(response => response.json())
        .then(data => {
          setNextPageUrl(data.next);
          setPrevPageUrl(data.previous);
          return Promise.all(data.results.map(pokemon => 
            fetch(pokemon.url).then(res => res.json())
          ));
        })
        .then(pokemonDetails => {
          setPokemonList(pokemonDetails.map(pokemon => ({
            name: pokemon.name,
            details: pokemon,
          })));
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setIsLoading(false);
        });
    };

    fetchPokemons(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${(currentPage - 1) * limit}`);
  }, [currentPage]);

  const handleNext = () => {
    if (nextPageUrl) {
      setCurrentPage(current => current + 1);
    }
  };

  const handlePrevious = () => {
    if (prevPageUrl) {
      setCurrentPage(current => current - 1);
    }
  };

  const getCardClassName = (type) => {
    switch (type) {
      case 'grass':
        return 'bg-[#76ae7b]'; 
      case 'fire':
        return 'bg-[#f2bc79]'; 
      case 'water':
        return 'bg-[#76ABAE]'; 
      case 'bug':
        return 'bg-[#a2f5a9]';
      case 'poison':
        return 'bg-[#8f76ae]';
      case 'electric':
        return 'bg-[#f0df71]';
      case 'ground':
        return 'bg-[#b57b60]';
      case 'fairy':
        return 'bg-[#e8aeda]';
      case 'fighting':
        return 'bg-[#c44b4b]';
      case 'psychic':
        return 'bg-[#8e5c9c]';
      case 'rock':
        return 'bg-[#686c70]';
      case 'ghost':
        return 'bg-[#ccd8de]';
      case 'ice':
        return 'bg-[#caecfc]';
      case 'dragon':
        return 'bg-[#665656]';
      case 'dark':
        return 'bg-[#4a4a4a]';
      case 'steel':
        return 'bg-[#849491]';
      case 'normal':
        return 'bg-[#A8A77A]';
      case 'flying':
        return 'bg-[#A98FF3]';
    
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <>
        <div className='m-10 flex justify-center'>
        {isLoading ? (
            <p>Loading...</p>
        ) : (
            <div className='grid grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center w-[1200px]'>
            {pokemonList.map((pokemon) => {
                const cardClass = getCardClassName(pokemon.details.types[0].type.name);
                return (
                <Link to={`/pokemon/${pokemon.name}`} key={pokemon.name}>
                    <PokeCard
                    pokemon={pokemon}
                    cardClass={cardClass}
                    />
                </Link>
                )
            })}
            </div>
        )}
        </div>
        <div className="my-4 flex justify-center">
            <button className="bg-blue-500 text-white px-4 py-2 mr-2" onClick={handlePrevious} disabled={!prevPageUrl}>Previous</button>
            <button className="bg-blue-500 text-white px-4 py-2" onClick={handleNext} disabled={!nextPageUrl}>Next</button>
        </div>
    </>
  );
}

export default Home;

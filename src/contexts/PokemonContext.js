// src/contexts/PokemonContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';

const PokemonContext = createContext();

export const usePokemonContext = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('usePokemonContext must be used within a PokemonProvider');
  }
  return context;
};

export const PokemonProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [types, setTypes] = useState([]);
  const [filteredType, setFilteredType] = useState('');
  const [berries, setBerries] = useState([]);
  const [moves, setMoves] = useState([]); // New state for moves
  const [loading, setLoading] = useState(true);

  const fetchPokemonData = async () => {
    try {
      setLoading(true);

      const pokemonResponse = await fetch('https://pokeapi.co/api/v2/pokemon?limit=33');
      const pokemonData = await pokemonResponse.json();

      const pokemonDetailsPromises = pokemonData.results.map(async (pokemon) => {
        const pokemonDetailsResponse = await fetch(pokemon.url);
        const pokemonDetails = await pokemonDetailsResponse.json();

        // Add other details including ID
        const details = {
          id: pokemonDetails.id, // Add ID
          name: pokemonDetails.name,
          types: pokemonDetails.types.map((type) => type.type.name),
          abilities: pokemonDetails.abilities.map((ability) => ability.ability.name),
          base_experience: pokemonDetails.base_experience,
          height: pokemonDetails.height,
          weight: pokemonDetails.weight,
        };

        return details;
      });

      const pokemonDetails = await Promise.all(pokemonDetailsPromises);
      setPokemons(pokemonDetails);
      setTypes([...new Set(pokemonDetails.flatMap((pokemon) => pokemon.types))]);

      const berryResponse = await fetch('https://pokeapi.co/api/v2/berry?limit=20');
      const berryData = await berryResponse.json();
      setBerries(berryData.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSelectedPokemonData = async (pokemonName) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      const data = await response.json();
      setSelectedPokemon({
        id: data.id, // Include ID
        name: data.name,
        base_experience: data.base_experience,
        height: data.height,
        weight: data.weight,
        abilities: data.abilities,
        types: data.types.map((type) => type.type.name),
      });

      // Fetch moves for the selected Pokémon using the ID
      const movesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${data.id}/moves`);
      const movesData = await movesResponse.json();
      setMoves(movesData.results);
    } catch (error) {
      console.error('Error fetching Pokemon details:', error);
    }
  };

  const handleTypeFilterChange = (type) => {
    setFilteredType(type);
  };

  const closePokemonModal = () => {
    setSelectedPokemon(null);
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        await fetchPokemonData();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <PokemonContext.Provider
      value={{
        pokemons,
        selectedPokemon,
        types,
        filteredType,
        berries,
        moves,
        loading,
        fetchPokemonData,
        fetchSelectedPokemonData,
        handleTypeFilterChange,
        closePokemonModal,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

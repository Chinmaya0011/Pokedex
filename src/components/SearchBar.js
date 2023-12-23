// src/components/SearchBar.js

import React, { useState } from 'react';
import { usePokemonContext } from '../contexts/PokemonContext';
import './SearchBar.css'; // Import the CSS file
import PokemonCard from './PokemonCard'; // Import PokemonCard component

const SearchBar = () => {
  const { fetchSelectedPokemonData } = usePokemonContext();
  const [searchInput, setSearchInput] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setError('');

    try {
      if (searchInput.trim() !== '') {
        const searchValue = searchInput.trim();

        // Try fetching by name
        const pokemonDataByName = await fetchSelectedPokemonData(searchValue.toLowerCase());

        if (pokemonDataByName) {
          setPokemonData(pokemonDataByName);
          return; // Found by name, no need to check by ID
        }

        // If not found by name, try fetching by ID
        const searchValueAsNumber = parseInt(searchValue, 10);

        if (!isNaN(searchValueAsNumber)) {
          const pokemonDataById = await fetchSelectedPokemonData(searchValueAsNumber);

          if (pokemonDataById) {
            setPokemonData(pokemonDataById);
            return; // Found by ID
          }
        }

        // If not found by name or ID
        setError('');
        setPokemonData(null);
      }
    } catch (error) {
      setError('Error fetching Pokemon details. Please try again.');
      console.error('Error fetching Pokemon details:', error);
      setPokemonData(null);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by name or ID"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p className="error-message">{error}</p>}
      
      {/* Display PokemonCard if data is available */}
      {pokemonData && (
        <div className="pokemon-card-container">
          <PokemonCard
            id={pokemonData.id}
            name={pokemonData.name}
            types={pokemonData.types}
            onClick={() => {
              // Replace with the actual logic for handling Pokemon click
              console.log(`Clicked on ${pokemonData.name}`);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;

// src/components/App.js

import React, { useEffect } from 'react';
import PokemonCard from './PokemonCard';
import PokemonDetailModal from './PokemonDetailModal';
import RealTimeTypeFilter from './RealTimeTypeFilter';
import SearchBar from './SearchBar';
import { usePokemonContext } from '../contexts/PokemonContext';
import '../App.css'; // Import the CSS file

const App = () => {
  const {
    pokemons,
    selectedPokemon,
    types,
    filteredType,
    fetchPokemonData,
    fetchSelectedPokemonData,
    handleTypeFilterChange,
    closePokemonModal,
  } = usePokemonContext();

  useEffect(() => {
    fetchPokemonData();
  }, [fetchPokemonData]);

  const handlePokemonClick = (pokemonName) => {
    fetchSelectedPokemonData(pokemonName);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Pokédex</h1>

      <SearchBar />
      <RealTimeTypeFilter types={types} />

      <div className="pokemon-list">
        {pokemons
          .filter((pokemon) => !filteredType || pokemon.types.includes(filteredType))
          .map((pokemon) => (
            <div key={pokemon.name} className="pokemon-card-container">
              <PokemonCard
                id={pokemon.id} // Make sure you have the id property for each Pokemon
                name={pokemon.name}
                types={pokemon.types}
                onClick={() => handlePokemonClick(pokemon.name)}
              />
            </div>
          ))}
      </div>

      {selectedPokemon && (
        <div className="pokemon-detail-modal-container">
          <PokemonDetailModal
            pokemon={selectedPokemon}
            onClose={closePokemonModal}
            className="pokemon-detail-modal"
          />
        </div>
      )}
    </div>
  );
};

export default App;

// src/components/PokemonCard.js

import React from 'react';
import PropTypes from 'prop-types';
import './PokemonCard.css';
import { usePokemonContext } from '../contexts/PokemonContext';

const PokemonCard = ({ id, name, types, onClick }) => {
  const imgUrl = `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`;
  const { fetchSelectedPokemonData } = usePokemonContext();

  const handleImageError = (e) => {
    console.error('Error loading image:', e.target.src);
  };

  const handlePokemonClick = async () => {
    try {
      const selectedPokemonData = await fetchSelectedPokemonData(name);
      // Do something with the selected Pokemon data
      console.log(selectedPokemonData);
    } catch (error) {
      console.error('Error fetching selected Pokemon data:', error);
    }

    // Call the original onClick function, if provided
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className="pokemon-card" onClick={handlePokemonClick}>
      <img
        src={imgUrl}
        alt={`Pokemon ${name}`}
        className="pokemon-image"
        onError={handleImageError}
      />
      <h3 className="pokemon-name">{name}</h3>
      <p className="pokemon-types">Types: {types.join(', ')}</p>
    </div>
  );
};

PokemonCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  types: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func,
};

export default PokemonCard;

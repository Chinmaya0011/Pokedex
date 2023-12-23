
// src/components/PokemonDetailModal.js
import { IoMdClose } from "react-icons/io";

import React from 'react';
import './PokemonDetailModal.css'; // Import the CSS file

const PokemonDetailModal = ({ pokemon, onClose }) => {
  if (!pokemon) {
    return null;
  }

  // Assuming you have a function to generate the image URL based on the Pokemon ID
  const imgUrl = `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemon.id}.svg`;

  return (
    <div className="pokemon-detail-modal">
      <h2 className="modal-title">{pokemon.name}</h2>
      <img src={imgUrl} alt={`Pokemon ${pokemon.name}`} className="modal-image" />
      <p className="modal-info">Base Experience: {pokemon.base_experience}</p>
      <p className="modal-info">Height: {pokemon.height}</p>
      <p className="modal-info">Weight: {pokemon.weight}</p>
      <p className="modal-info">Abilities: {pokemon.abilities.map((ability) => ability.ability.name).join(', ')}</p>
      <p className="modal-info">Types: {pokemon.types.join(', ')}</p>
      <button className="modal-close-button" onClick={onClose}><IoMdClose /></button>
    </div>
  );
};

export default PokemonDetailModal;


import React, { useState, useEffect } from 'react';
import { usePokemonContext } from '../contexts/PokemonContext';
import './RealTimeTypeFilter.css'; // Import the CSS file

const RealTimeTypeFilter = () => {
  const { handleTypeFilterChange, types } = usePokemonContext();
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    handleTypeFilterChange(selectedType);
  }, [selectedType, handleTypeFilterChange]);

  return (
    <div className="type-filter">
      <label htmlFor="type-select">Select Type:</label>
      <select id="type-select" onChange={(e) => setSelectedType(e.target.value)}>
        <option value="">All</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RealTimeTypeFilter;

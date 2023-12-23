import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import { PokemonProvider } from './contexts/PokemonContext';
import './index.css';

const root = document.getElementById('root');
const reactRoot = createRoot(root);

reactRoot.render(
  <React.StrictMode>
    <PokemonProvider>
      <App />
    </PokemonProvider>
  </React.StrictMode>
);

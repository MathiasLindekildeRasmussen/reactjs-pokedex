import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom'; // Home component to include what was previously directly in App.js
import Navbar from './components/navbar';
import Home from './components/home';
import PokemonDetails from './components/pokemondetails';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:pokemonName" element={<PokemonDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/home';
import PokemonDetails from './components/pokemondetails';
import About from './components/about';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:pokemonName" element={<PokemonDetails />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
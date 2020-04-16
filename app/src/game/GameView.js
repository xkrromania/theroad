import React from 'react';
import Cards from './cards/Cards';
import AddCard from './cards/AddCard';

const GameView = () => (
  <section className="game-view">
    <AddCard />
    <Cards />
  </section>
);

export default GameView;

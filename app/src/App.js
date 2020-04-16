import React from 'react';
import GameView from './game/GameView';

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <h1>Game day</h1>
      </header>
      <div className="app__container">
        <GameView></GameView>
      </div>
      <footer className="app__footer">
        Testing
      </footer>
    </div>
  );
}

export default App;

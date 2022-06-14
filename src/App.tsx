import React from 'react';
import './App.css';
import { Colors } from './classes/Board';
import { Player } from './classes/Player';
import BoardComponent from './components/BoardComponent';

function App() {
  return (
    <div className="app">
      <BoardComponent />
    </div>
  );
}

export default App;

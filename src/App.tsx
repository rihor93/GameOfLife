import React from 'react';
import './App.css';
import { BoardComponent } from './gameOfLife/components/BoardComponent';
import ControlComponent from './gameOfLifeClasses/ControlComponent';
import { ControlComponentClasses } from './gameOfLifeClasses/ControlComponentClasses';

function App() {
  return (
    <div className="App">
      <ControlComponent/>
    </div>
  );
}

export default App;

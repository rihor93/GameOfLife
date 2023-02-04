import React from 'react';
import './App.css';
import { BoardComponent } from './gameOfLife/components/BoardComponent';
import ControlComponent from './gameOfLife2/ControlComponent';
import { ControlComponentClasses } from './gameOfLifeClasses/ControlComponentClasses';

function App() {
  return (
    <div className="App">
      <ControlComponent/>
    </div>
  );
}

export default App;

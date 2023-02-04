import React from 'react';
import './App.css';
import { BoardComponent } from './gameOfLife/components/BoardComponent';
import { ControlComponentClasses } from './gameOfLifeClasses/ControlComponentClasses';

function App() {
  return (
    <div className="App">
      <ControlComponentClasses/>
    </div>
  );
}

export default App;

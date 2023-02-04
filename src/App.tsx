import React from 'react';
import './App.css';
import ControlComponent from './gameOfLife2/ControlComponent';
import { PageText } from './Tests/PageText';
import { TextStyled } from './Tests/styles';


function App() {
  return (
    <div className="App">
      <ControlComponent/>
      {/*<TextStyled />*/}
    </div>
  );
}

export default App;

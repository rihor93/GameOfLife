import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import ControlComponent from './gameOfLife2/ControlComponent';
import { PageText } from './Tests/PageText';
import { TextStyled } from './Tests/styles';


function App() {
  return (
    <div className="App">
      <ControlComponent />
      {/*<TextStyled fontSize={25} color={'#CD5C5C'}/>*/}
    </div>
  );
}

export default App;

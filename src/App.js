/**
 * import node modules
 */
import React from 'react';
import './App.scss';

/**
 * Import Components
 */
import Header from './containers/Header/Header.js';
import Calculator from './containers/Calculator/Calculator.js';


function App() { //need to make this a class and add state if we want header to provide options like toggling between the calculator and my development history sketches / scans / notes / concepts.
  return (
    <div className="App">
      <Header />

      <div id="page-content">
        <Calculator />
      </div>

    </div>
  );
}

export default App;

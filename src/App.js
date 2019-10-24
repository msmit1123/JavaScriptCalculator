import React from 'react';
import './App.scss';

import Calculator from './containers/Calculator/Calculator.js';

function App() {
  return (
    <div className='App'>
      <div className='page-content'>
        <Calculator />
      </div>
    </div>
  );
}

export default App;

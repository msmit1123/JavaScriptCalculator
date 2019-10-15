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


class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isViewApp:true,
    }
  }
  render(){
    return (
      <div className="App">
        <Header />

        <div id="page-content" className="app-view">
          {this.state.isViewApp && <Calculator />}
          {/*!this.state.isViewApp && <DevelopmentNotes />*/}
        </div>

      </div>
    );
  }
}

export default App;

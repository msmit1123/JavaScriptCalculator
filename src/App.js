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
      isViewApp:false,
    }
    this.viewApp = this.viewApp.bind(this);
    this.viewNotes = this.viewNotes.bind(this);
  }

  viewNotes(){
    this.setState({ isViewApp:true })
  }
  viewApp() {
    this.setState({ isViewApp: false })
  }

  render(){
    return (
      <div className="App">
        <Header view={ {
          isViewApp: this.state.isViewApp,
          viewApp: this.viewApp,
          viewNotes: this.viewNotes
        } } />
        <div id="page-content" className="app-view">
          {!this.state.isViewApp && <Calculator />}
          {this.state.isViewApp && <div>hihihihihi</div>}
        </div>

      </div>
    );
  }
}

export default App;

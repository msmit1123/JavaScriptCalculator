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
import DevelopmentNotes from './containers/DevelopmentNotes/DevelopmentNotes.js';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isViewNotes:false,
    }
    this.viewApp = this.viewApp.bind(this);
    this.viewNotes = this.viewNotes.bind(this);
  }

  viewNotes(){
    this.setState({ isViewNotes:true })
  }
  viewApp() {
    this.setState({ isViewNotes: false })
  }

  render(){
    return (
      <div className="App">
        <Header view={ {
          isViewNotes: this.state.isViewNotes,
          viewApp: this.viewApp,
          viewNotes: this.viewNotes
        } } />
        <div id="page-content" className={ !this.state.isViewNotes ? "app-view": "development-view" }>
          {!this.state.isViewNotes && <Calculator />}
          {this.state.isViewNotes && <DevelopmentNotes />}
        </div>
      </div>
    );
  }
}

export default App;

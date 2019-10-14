/**
 * import node modules
 */
import React from 'react';
import './App.scss';
//need to import font awesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackspace, faDivide } from '@fortawesome/free-solid-svg-icons';




function App() { //need to make this a class and add state
  return (
    <div className="App">
      <header>header here</header> {/* Header */}
      
      <div id="page-content">
        <div id="calculator-container"> {/* Calculator */}
          
          <div id="screen-container"> {/* Display */}
            <div class="past-text">last entry here</div>
            <input value="current entry"/>
          </div>

          <div id="keypad"> {/* Keypad */}
            <div class="button" id="clear">C</div>
            <div class="button">ans</div>
            <div class="button">entry</div>
            <div class="button"><FontAwesomeIcon icon={faBackspace} /></div>
            <div class="button">(</div> {/* recursively call '=' */}
            <div class="button">)</div>
            <div class="button"><FontAwesomeIcon icon={faDivide} /></div>
            <div class="button">&times;</div>
            <div class="button digit">7</div>
            <div class="button digit">8</div>
            <div class="button digit">9</div>
            <div class="button">-</div>
            <div class="button digit">4</div>
            <div class="button digit">5</div>
            <div class="button digit">6</div>
            <div class="button">+</div>
            <div class="button digit">1</div>
            <div class="button digit">2</div>
            <div class="button digit">3</div>
            <div class="button" id="equals">=</div>
            <div class="button digit">0</div>
            <div class="button digit">.</div>
            <div class="button digit">(-)</div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default App;

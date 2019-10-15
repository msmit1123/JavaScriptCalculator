/**
 * Import Node Modules
 */
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackspace, faDivide } from '@fortawesome/free-solid-svg-icons';

/**
 * Import Components
 */
import Button from '../../components/Button/Button.js';

/**
 * Import other Dependencies
 */
//CSS
import './Keypad.scss';

function Keypad(props){  
    return (
        <div id="keypad">
            <div id="keys">
                <Button classes="button">C</Button>
                <Button classes="button">ans</Button>
                <Button classes="button">entry</Button>
                <Button classes="button"><FontAwesomeIcon icon={faBackspace} /></Button>
                <Button classes="button">(</Button>
                <Button classes="button">)</Button>
                <Button classes="button"><FontAwesomeIcon icon={faDivide} /></Button>
                <Button classes="button">&times;</Button>
                <Button classes="button digit">7</Button>
                <Button classes="button digit">8</Button>
                <Button classes="button digit">9</Button>
                <Button classes="button">-</Button>
                <Button classes="button digit">4</Button>
                <Button classes="button digit">5</Button>
                <Button classes="button digit">6</Button>
                <Button classes="button">+</Button>
                <Button classes="button digit">1</Button>
                <Button classes="button digit">2</Button>
                <Button classes="button digit">3</Button>
                <Button classes="button" id="equals">=</Button>
                <Button classes="button digit">0</Button>
                <Button classes="button digit">.</Button>
                <Button classes="button digit">(-)</Button>
            </div>
        </div>
    )
}

/**
 *  Export the component
 */
export default Keypad




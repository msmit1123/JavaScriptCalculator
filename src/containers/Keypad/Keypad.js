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
                <Button classes="button" onClick={props.clear}>C</Button>
                <Button classes="button" value="ans" onClick={props.handleButtons}>ans</Button>
                <Button classes="button" onClick={props.lastEntry}>entry</Button>
                <Button classes="button" onClick={props.backspace}><FontAwesomeIcon icon={faBackspace} /></Button>
                <Button classes="button" value="(" onClick={props.handleButtons}>(</Button>
                <Button classes="button" value=")" onClick={props.handleButtons}>)</Button>
                <Button classes="button" value="/" onClick={props.handleButtons}><FontAwesomeIcon icon={faDivide} /></Button>
                <Button classes="button" value="*" onClick={props.handleButtons}>&times;</Button>
                <Button classes="button digit" value="7" onClick={props.handleButtons}>7</Button>
                <Button classes="button digit" value="8" onClick={props.handleButtons}>8</Button>
                <Button classes="button digit" value="9" onClick={props.handleButtons}>9</Button>
                <Button classes="button" value="-" onClick={props.handleButtons}>&minus;</Button>
                <Button classes="button digit" value="4" onClick={props.handleButtons}>4</Button>
                <Button classes="button digit" value="5" onClick={props.handleButtons}>5</Button>
                <Button classes="button digit" value="6" onClick={props.handleButtons}>6</Button>
                <Button classes="button" value="+" onClick={props.handleButtons}>+</Button>
                <Button classes="button digit" value="1" onClick={props.handleButtons}>1</Button>
                <Button classes="button digit" value="2" onClick={props.handleButtons}>2</Button>
                <Button classes="button digit" value="3" onClick={props.handleButtons}>3</Button>
                <Button classes="button" id="equals" onClick={props.evaluate}>=</Button>
                <Button classes="button digit" value="0" onClick={props.handleButtons}>0</Button>
                <Button classes="button digit" value="." onClick={props.handleButtons}>.</Button>
                <Button classes="button digit" value="⁻" onClick={props.handleButtons}>(&#8315;)</Button>
            </div>
        </div>
    )
}

/**
 *  Export the component
 */
export default Keypad




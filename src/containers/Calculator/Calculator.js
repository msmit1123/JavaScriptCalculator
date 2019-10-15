/**
 * Import Node Modules
 */
import React from 'react'
import { PropTypes } from 'prop-types';
import Display from '../../components/Display/Display.js';
import Keypad from '../Keypad/Keypad.js';

/**
 * Import other Dependencies
 */
//CSS
import './Calculator.scss'

class Calculator extends React.Component{
    constructor(props){
        super(props);
        this.state={
            curContent: "s",
        };
    }

    render(){
        return (
            <div id="calculator-container">
                <Display content={this.state.curContent} onChange={() => alert("hi")} />
                <Keypad />
            </div>
        )
    }
}


/**
 *  Define component PropTypes
*/
Calculator.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func.isRequired,
}


/**
 *  Export the component
 */
export default Calculator;




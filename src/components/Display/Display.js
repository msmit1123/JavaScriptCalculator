/**
 * Import Node Modules
 */
import React from 'react'
import { PropTypes } from 'prop-types';

/**
 * Import other Dependencies
 */
//CSS
import './Display.scss'

function Display(props){
    return (
        <div id="calculator-top">
            <div id="display-container">
                <div className="text last-entry">&nbsp;{props.lastEntryText}</div>
                <div className="text last-answer">&nbsp;{props.lastAnswer}</div>
                <div id="display" className="text working"><span>{props.content}</span></div>
            </div>
        </div>
    )
}


/**
 *  Define component PropTypes
*/
Display.propTypes = {
    children: PropTypes.node,
    onChange: PropTypes.func.isRequired,
}


/**
 *  Export the component
 */
export default Display




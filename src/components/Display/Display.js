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
                <div className="text working"><span>{props.content}</span></div>
                {/* Create mock display for FreeCodeCamp's grading Script */}
                <div id="display">
                    {props.content === "" ? props.lastAnswer : props.content}
                </div>
            </div>
        </div>
    )
}


/**
 *  Define component PropTypes
*/
Display.propTypes = {
    lastEntryText: PropTypes.string,
    lastAnswer: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    content: PropTypes.string,
    children: PropTypes.node,
}


/**
 *  Export the component
 */
export default Display




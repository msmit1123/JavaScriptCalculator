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
    var handleChange = () => {props.onChange()}
    
    return (
        <div id="screen-container">
            <div className="past-text">last entry here</div>
            <input value={props.content} onChange={handleChange} />
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




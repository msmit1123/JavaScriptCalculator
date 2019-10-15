/**
 * Import Node Modules
 */
import React from 'react'
import { PropTypes } from 'prop-types';

/**
 * Import other Dependencies
 */
//CSS
import './Button.scss'

function Button(props){
    var handleClick = () => {props.onClick()}

    return (
        <div className={props.classes} id={props.id} onClick={handleClick}>
            {props.children}
        </div>
    )
}


/**
 *  Define component PropTypes
*/
Button.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func.isRequired,
}


/**
 *  Export the component
 */
export default Button




/**
 * Import Node Modules
 */
import React from 'react'
import { PropTypes } from 'prop-types';

/**
 * Import other Dependencies
 */
//CSS
import './Header.scss'

function Header(){
    return (
        <header>
            <h1>Basic Javascript Calculator</h1>
            description here <br />
            GitHub link here <br />
            see development notes / history here. toggles state to show concept sketches and the like
        </header>
    )
}


/**
 *  Define component PropTypes
*/
Header.propTypes = {
    children: PropTypes.node,
}


/**
 *  Export the component
 */
export default Header;




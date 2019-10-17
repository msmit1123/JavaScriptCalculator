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

/**
 * Import Components
 */
import ToggleWithLabels from '../../components/ToggleWithLabels/ToggleWithLabels.js';

function Header(props){
    return (
        <header>
            <h1>Basic Javascript Calculator</h1>
            <p>
                I needed a basic calculator, but with a few more functions than a phone app - Specifically - parenthetical grouping. I often want to use parentheses while doing math but I don't always have my TI-83 or TI-36 on me.
            </p>
            <p>
                see source on <a href="https://github.com/msmit1123/basic-javascript-calculator">GitHub</a>
            </p>
            <p>
                <ToggleWithLabels
                    id="view-toggle"
                    ischecked={ props.view.isViewApp }
                    uncheckedInfo={ {label: "Use calculator", action: props.view.viewApp} }
                    checkedInfo={ {label: "View development notes", action: props.view.viewNotes} }
                />
            </p>
            <p>
                {/*
                view: <button onClick={this.displayAsSite}>calculator</button> <ToggleSwitch onChange={this.toggleView} checked={this.state.isFooterChecked} /> <button onClick={this.displayAsFooter}>development notes</button>
                */}
            </p>
        </header>
    )
}


/**
 *  Define component PropTypes
*/
Header.propTypes = {
    children: PropTypes.node,
    view: PropTypes.shape({
        isViewApp: PropTypes.bool.isRequired,
        viewApp: PropTypes.func,
        viewNotes: PropTypes.func
    })
}


/**
 *  Export the component
 */
export default Header;




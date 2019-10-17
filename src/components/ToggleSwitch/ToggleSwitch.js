/**
 * Import Node Modules
 */
import React from 'react'
import { PropTypes } from 'prop-types';

/**
 * Import other Dependencies
 */
//CSS
import './ToggleSwitch.scss'

class ToggleSwitch extends React.Component{

    handleChange = (event) => {this.props.onChange(event)}

    render(){
        return (
            <div className="toggle-switch-container">
                <input type="checkbox" id={this.props.id} checked={this.props.checked} onChange={this.handleChange} />
                <label className="switch-toggle" htmlFor={this.props.id}></label>
            </div>
        )
    }
}


/**
 *  Define component PropTypes
*/
ToggleSwitch.propTypes = {
    id: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.node,
}


/**
 *  Export the component
 */
export default ToggleSwitch




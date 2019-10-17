/**
 * Import Node Modules
 */
import React from 'react'
import { PropTypes } from 'prop-types';

/**
 * Import other Dependencies
 */
//CSS
import './ToggleWithLabels.scss'

/**
 * Import Components
 */
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch.js';

class ToggleWithLabels extends React.Component{
    //handleChange = (event) => {this.props.onChange(event)}
    toggleSwitch = (event) => {
        if(!event.target.checked){ this.props.uncheckedInfo.action() }
        if(event.target.checked){ this.props.checkedInfo.action() }
    }

    render(){
        return (
            <div className="toggle-with-labels" id={ this.props.id }>
                <button onClick={this.props.uncheckedInfo.action}>{this.props.uncheckedInfo.label}</button>
                <ToggleSwitch
                    id={ this.props.id + "-switch" }
                    onChange={ this.toggleSwitch }
                    checked={this.props.isChecked} 
                />
                <button onClick={this.props.checkedInfo.action}>{this.props.checkedInfo.label}</button>
            </div>
        )
    }
}


/**
 *  Define component PropTypes
*/
ToggleSwitch.propTypes = {
    isChecked: PropTypes.bool,
    id: PropTypes.string.isRequired,
    checkedInfo: PropTypes.shape({
        label: PropTypes.string.isRequired,
        action: PropTypes.func.isRequired
    }).isRequired,
    uncheckedInfo: PropTypes.shape({
        label: PropTypes.string.isRequired,
        action: PropTypes.func.isRequired
    }).isRequired,
    children: PropTypes.node,
}


/**
 *  Export the component
 */
export default ToggleWithLabels




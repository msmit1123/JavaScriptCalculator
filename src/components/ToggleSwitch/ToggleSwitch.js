import React from 'react';
import { PropTypes } from 'prop-types';

import './ToggleSwitch.scss';

class ToggleSwitch extends React.Component {
  handleChange = (event) => {
    this.props.onChange(event);
  };

  render() {
    return (
      <div className='toggle-switch'>
        <input
          type='checkbox'
          id={this.props.id}
          checked={this.props.isChecked}
          onChange={this.handleChange}
        />
        <label className='toggle-switch__icon' htmlFor={this.props.id}></label>
      </div>
    );
  }
}

ToggleSwitch.propTypes = {
  id: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node
};

export default ToggleSwitch;

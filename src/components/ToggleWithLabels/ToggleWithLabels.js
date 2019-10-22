import React from 'react';
import { PropTypes } from 'prop-types';

import './ToggleWithLabels.scss';

import ToggleSwitch from '../ToggleSwitch/ToggleSwitch.js';

function ToggleWithLabels({
  isChecked,
  id,
  toggleSwitchType,
  uncheckedInfo,
  checkedInfo,
  ...props
}) {
  const toggleSwitch = (event) => {
    if (!event.target.checked) {
      uncheckedInfo.action();
    }
    if (event.target.checked) {
      checkedInfo.action();
    }
  };

  return (
    <div className='toggle-with-labels' id={id}>
      <button
        className='toggle-with-labels__label'
        onClick={uncheckedInfo.action}
      >
        {uncheckedInfo.label}
      </button>
      <ToggleSwitch
        className={toggleSwitchType}
        id={id + '-switch'}
        onChange={toggleSwitch}
        checked={isChecked}
        {...props}
      />
      <button
        className='toggle-with-labels__label'
        onClick={checkedInfo.action}
      >
        {checkedInfo.label}
      </button>
    </div>
  );
}

ToggleWithLabels.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  toggleSwitchType: PropTypes.string.isRequired,
  checkedInfo: PropTypes.shape({
    label: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired
  }).isRequired,
  uncheckedInfo: PropTypes.shape({
    label: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired
  }).isRequired,
  children: PropTypes.node
};

export default ToggleWithLabels;

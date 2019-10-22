/**
 * Import Node Modules
 */
import React from 'react';
import { PropTypes } from 'prop-types';

/**
 * Import other Dependencies
 */
//CSS
import './Header.scss';

/**
 * Import Components
 */
import ToggleWithLabels from '../../components/ToggleWithLabels/ToggleWithLabels.js';

function Header(props) {
  return (
    <header>
      <h1>Basic Javascript Calculator</h1>
      <p>
        I needed a basic calculator, but with a few more functions than my phone
        app has - Specifically - parenthetical grouping. I often want to use
        parentheses while doing math but I don't always have my TI-83 or TI-36
        on me.
      </p>
      <p>
        see source on{' '}
        <a href='https://github.com/msmit1123/basic-javascript-calculator'>
          GitHub
        </a>
      </p>
      <ToggleWithLabels
        id='view-toggle'
        isChecked={props.view.isViewNotes}
        toggleSwitchType='toggle-switch-type-A'
        uncheckedInfo={{ label: 'Use calculator', action: props.view.viewApp }}
        checkedInfo={{
          label: 'View development notes',
          action: props.view.viewNotes
        }}
      />
    </header>
  );
}

/**
 *  Define component PropTypes
 */
Header.propTypes = {
  children: PropTypes.node,
  view: PropTypes.shape({
    isViewNotes: PropTypes.bool.isRequired,
    viewApp: PropTypes.func,
    viewNotes: PropTypes.func
  })
};

/**
 *  Export the component
 */
export default Header;

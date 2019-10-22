import React from 'react';
import { PropTypes } from 'prop-types';

import './Display.scss';

function Display(props) {
  return (
    <div className='display'>
      <div className='display__text-line display__text-line--last-entry'>
        &nbsp;{props.lastEntryText}
      </div>
      <div className='display__text-line display__text-line--last-answer'>
        &nbsp;{props.lastAnswer}
      </div>
      <div className='display__text-line display__text-line--working-entry'>
        <span>{props.content}</span>
      </div>
    </div>
  );
}

Display.propTypes = {
  lastEntryText: PropTypes.string,
  lastAnswer: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  content: PropTypes.string,
  children: PropTypes.node
};

export default Display;

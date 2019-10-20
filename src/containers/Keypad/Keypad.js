/**
 * Import Node Modules
 */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackspace, faDivide } from '@fortawesome/free-solid-svg-icons';

/**
 * Import Components
 */
import Button from '../../components/Button/Button.js';

/**
 * Import other Dependencies
 */
//CSS
import './Keypad.scss';

function Keypad(props) {
  return (
    <div id='keypad'>
      <div id='keys'>
        <Button
          className='button button--clear'
          id='clear'
          onClick={props.clear}
        >
          AC
        </Button>
        <Button
          className='button'
          id='ans'
          value='ans'
          onClick={props.handleButtons}
        >
          ans
        </Button>
        <Button className='button' id='entry' onClick={props.lastEntry}>
          entry
        </Button>
        <Button className='button' id='delete' onClick={props.backspace}>
          <FontAwesomeIcon icon={faBackspace} />
        </Button>
        <Button
          className='button'
          id='open-paren'
          value='('
          onClick={props.handleButtons}
        >
          (
        </Button>
        <Button
          className='button'
          id='close-paren'
          value=')'
          onClick={props.handleButtons}
        >
          )
        </Button>
        <Button
          className='button'
          id='divide'
          value='/'
          onClick={props.handleButtons}
        >
          <FontAwesomeIcon icon={faDivide} />
        </Button>
        <Button
          className='button'
          id='multiply'
          value='*'
          onClick={props.handleButtons}
        >
          &times;
        </Button>
        <Button
          className='button button--digit'
          id='seven'
          value='7'
          onClick={props.handleButtons}
        >
          7
        </Button>
        <Button
          className='button button--digit'
          id='eight'
          value='8'
          onClick={props.handleButtons}
        >
          8
        </Button>
        <Button
          className='button button--digit'
          id='nine'
          value='9'
          onClick={props.handleButtons}
        >
          9
        </Button>
        <Button
          className='button'
          id='subtract'
          value='-'
          onClick={props.handleButtons}
        >
          &minus;
        </Button>
        <Button
          className='button button--digit'
          id='four'
          value='4'
          onClick={props.handleButtons}
        >
          4
        </Button>
        <Button
          className='button button--digit'
          id='five'
          value='5'
          onClick={props.handleButtons}
        >
          5
        </Button>
        <Button
          className='button button--digit'
          id='six'
          value='6'
          onClick={props.handleButtons}
        >
          6
        </Button>
        <Button
          className='button'
          id='add'
          value='+'
          onClick={props.handleButtons}
        >
          +
        </Button>
        <Button
          className='button button--digit'
          id='one'
          value='1'
          onClick={props.handleButtons}
        >
          1
        </Button>
        <Button
          className='button button--digit'
          id='two'
          value='2'
          onClick={props.handleButtons}
        >
          2
        </Button>
        <Button
          className='button button--digit'
          id='three'
          value='3'
          onClick={props.handleButtons}
        >
          3
        </Button>
        <Button
          className='button button--equals'
          id='equals'
          onClick={props.evaluate}
        >
          =
        </Button>
        <Button
          className='button button--digit'
          id='zero'
          value='0'
          onClick={props.handleButtons}
        >
          0
        </Button>
        <Button
          className='button button--digit'
          id='decimal'
          value='.'
          onClick={props.handleButtons}
        >
          .
        </Button>
        <Button
          className='button button--digit'
          id='negative'
          value='⁻'
          onClick={props.handleButtons}
        >
          (&#8315;)
        </Button>
      </div>
    </div>
  );
}

/**
 *  Export the component
 */
export default Keypad;

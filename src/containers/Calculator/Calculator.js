import React from 'react';
import Display from '../../components/Display/Display.js';
import Keypad from '../Keypad/Keypad.js';

import './Calculator.scss';

import * as regexes from './regexes.js';
import keyMap from './keyMap.js';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curEntry: '0',
      lastEntry: '',
      lastAnswer: ''
    };

    this.clear = this.clear.bind(this);
    this.evaluate = this.evaluate.bind(this);
    this.handleButtons = this.handleButtons.bind(this);
    this.backspace = this.backspace.bind(this);
    this.lastEntry = this.lastEntry.bind(this);
    this.validatePressedButton = this.validatePressedButton.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.mapKeyCode = this.mapKeyCode.bind(this);
  }
  componentDidMount() {
    //add event listener for keyboard presses on mount
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
  }
  componentWillUnmount() {
    //remove on unmount
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);
  }

  clear() {
    this.setState({
      curEntry: '0',
      lastAnswer: '',
      lastEntry: ''
    });
  }

  evaluate() {
    //if there is no string in the display, but there was a last entry, repeat the last entry.
    let whichStringToCalculate;
    let isLastEntryChanging = true;
    if (this.state.curEntry === '' && this.state.lastEntry !== null) {
      whichStringToCalculate = this.state.lastEntry;
      isLastEntryChanging = false;
    } else {
      whichStringToCalculate = this.state.curEntry;
    }

    //convert entire string to array broken up at regex splitpoints
    let exprArr = whichStringToCalculate
      .split(regexes.splitPoints)
      .filter((item) => item !== '');

    // Prep array for operations
    for (let i = 0; i < exprArr.length; i++) {
      exprArr[i] = exprArr[i].replace('⁻', '-'); //convert negative sign before number to negative number
      if (exprArr[i] === 'ans') {
        exprArr[i] = this.state.lastAnswer;
      } //convert "ans" to value of answer
      if (i > 0 && exprArr[i] === '(') {
        if (exprArr[i - 1].match(regexes.anyNumber) || exprArr[i - 1] === ')') {
          exprArr.splice(i, 0, '*'); //if open parentheses is next to a number insert a * between
        }
      }
      if (i > 0 && exprArr[i] === ')' && exprArr[i + 1] !== undefined) {
        if (exprArr[i + 1].match(regexes.anyNumber) || exprArr[i + 1] === '(') {
          exprArr.splice(i + 1, 0, '*'); //if close parentheses is next to a number insert a * between
        }
      }
    }

    // setup error messages
    const parenError = () => this.setState({ lastAnswer: 'Error: "("' });

    //validate number of open parentheses match close
    const openParen = exprArr.filter((a) => a === '(').length;
    const closeParen = exprArr.filter((a) => a === ')').length;
    if (openParen !== closeParen) {
      parenError();
      return null;
    }

    /**
     * Begin evaluating the expression
     */
    //find open and close paren tags and put all the contents between into a sub array
    while (exprArr.includes('(')) {
      exprArr = reduceParen(exprArr);
    }

    //evaluate expression and throw generic error if problem occurs
    let answer;
    try {
      answer = parseFloat(evalArr(exprArr));
      answer = parseFloat(answer.toFixed(8)); //handle floating point rounding

      if (isNaN(answer)) {
        answer = 'Error! - Not Valid';
      }
    } catch (e) {
      answer = 'Error!';
    }

    //update state accordingly
    this.setState({
      lastEntry: isLastEntryChanging
        ? this.state.curEntry
        : this.state.lastEntry,
      lastAnswer: answer,
      curEntry: ''
    });

    /**
     * Define Helper Functions for this method
     */
    function reduceParen(arr) {
      for (let i = 0; i < arr.length; i++) {
        //work forwards through array to
        if (arr[i] === ')') {
          //find first occurance of close paren
          let n = i; //mark this index
          for (let j = n; j >= 0; j--) {
            //work back from there to
            if (arr[j] === '(') {
              //find nearest open paren
              let m = j; //mark this index
              var betweenParen = []; //create a blank array to store the inbetween values
              for (let g = m + 1; g < n; g++) {
                betweenParen.push(arr[g]);
              } //iterate through the array between the two marked values, and push each value to the new array

              //return everything before the open paren, then the array, then everything after
              const newArr = arr
                .slice(0, m)
                .concat([betweenParen])
                .concat(arr.slice(n + 1));
              return newArr;
            }
          }
        }
      }
    }
    function evalArr(arr) {
      if (arr.length === 1) {
        if (typeof arr[0] === 'object') {
          return evalArr(arr[0]);
        }
        return arr[0];
      }

      for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] === '*') {
          arr.splice(i - 1, 3, evalExpression(arr[i - 1], arr[i], arr[i + 1]));
        }
        if (!arr.includes('*') && arr[i] === '/') {
          arr.splice(i - 1, 3, evalExpression(arr[i - 1], arr[i], arr[i + 1]));
          i -= 1;
        }
        if (!arr.includes('*') && !arr.includes('/') && arr[i] === '-') {
          arr.splice(i - 1, 3, evalExpression(arr[i - 1], arr[i], arr[i + 1]));
          i -= 1;
        }
        if (
          !arr.includes('*') &&
          !arr.includes('/') &&
          !arr.includes('-') &&
          arr[i] === '+'
        ) {
          arr.splice(i - 1, 3, evalExpression(arr[i - 1], arr[i], arr[i + 1]));
        }
      }
      return evalArr(arr);
    }
    function evalExpression(firstParam, operator, secondParam) {
      if (typeof firstParam === 'object') {
        evalArr(firstParam);
      }
      if (typeof secondParam === 'object') {
        evalArr(secondParam);
      }
      if (operator === '*') {
        return firstParam * secondParam;
      }
      if (operator === '/') {
        if (secondParam === 0 || secondParam === '0') {
          return 'error';
        }
        return firstParam / secondParam;
      }
      if (operator === '-') {
        return parseFloat(firstParam) - parseFloat(secondParam);
      }
      if (operator === '+') {
        return parseFloat(firstParam) + parseFloat(secondParam);
      }
    }
  }

  handleButtons(event) {
    let value = event.target.getAttribute('value'); //check which button was pressed
    value = this.validatePressedButton(value); //validate what to do with that button
    this.setState((prevState) => {
      return { curEntry: prevState.curEntry.toString().concat(value) };
    });
  }

  backspace() {
    if (this.state.curEntry.substr(this.state.curEntry.length - 3) === 'ans') {
      this.setState((prevState) => {
        return { curEntry: prevState.curEntry.slice(0, -3) };
      });
    } else {
      this.setState((prevState) => {
        return { curEntry: prevState.curEntry.slice(0, -1) };
      });
    }
  }

  lastEntry() {
    this.setState({ curEntry: this.state.lastEntry });
  }

  validatePressedButton(value) {
    const curEntry = this.state.curEntry;
    const lastChar = curEntry.substr(curEntry.length - 1);

    if (value === null) {
      return '';
    }

    //if ans is clicked, do nothing unless an operator was waiting
    if (value === 'ans') {
      if (lastChar.match(regexes.operators) || lastChar === '(') {
        return value;
      } else if (curEntry === '' && this.state.lastAnswer !== '') {
        this.backspace();
        return value;
      } else {
        return '';
      }
    }

    //if neg is clicked, do nothing unless an operator was waiting or blank
    if (value === '⁻') {
      if (curEntry === '0') {
        this.backspace();
        return value;
      }
      if (
        lastChar.match(regexes.operators) ||
        lastChar === '(' ||
        curEntry === ''
      ) {
        return value;
      } else {
        return '';
      }
    }

    //if current entry is 0 and a number is typed, override it.
    if (curEntry === '0') {
      if (value.match(regexes.numbers)) {
        this.backspace();
        return value;
      }
      if (value === '(') {
        this.backspace();
        return value;
      }
    }

    //if current entry is blank and an operator is typed, insert "ans"
    if (curEntry === '' && value.match(regexes.operators)) {
      this.setState({ curEntry: 'ans' });
      return value;
    }

    //if last number in string already has a regexes., don't allow another
    if (
      curEntry.match(regexes.lastNumberHasDecimal) &&
      value.match(regexes.decimal)
    ) {
      return '';
    }

    //for Free Code Camp grading routing, add a rule that if "-" (minus) is typed after an operator to instead insert "⁻" (negative sign)
    if (value === '-') {
      if (lastChar.match(regexes.operators)) {
        return '⁻';
      }
      if (lastChar === '(') {
        return '';
      }
    }

    //only output the last consecutively typed operator
    if (value.match(regexes.operators)) {
      if (lastChar === '⁻') {
        this.backspace();
        this.backspace();
        return value;
      }
      if (lastChar.match(regexes.operators)) {
        this.backspace();
        return value;
      }
    }

    //Don't let more ) be typed than (
    if (value === ')') {
      let openParen = curEntry.match(/(\()/g);
      openParen === null ? (openParen = 0) : (openParen = openParen.length);
      let closeParen = curEntry.match(/(\))/g);
      closeParen === null ? (closeParen = 0) : (closeParen = closeParen.length);
      if (openParen > closeParen) {
        return value;
      } else {
        return '';
      }
    }

    return value;
  }

  handleKeyDown(e) {
    const keyID = this.mapKeyCode(e.key); //figure out what ID corresponds to the pressed button
    if (keyID) {
      const keyElement = document.getElementById(keyID);
      keyElement.click(); //generate a click on that button
      keyElement.classList.add('button--active'); //make the button active
    }
  }

  handleKeyUp(e) {
    const keyID = this.mapKeyCode(e.key); //figure out what ID corresponds to the pressed button
    if (keyID) {
      const keyElement = document.getElementById(keyID);
      keyElement.classList.remove('button--active'); //make the button active
    }
  }

  mapKeyCode(key) {
    return keyMap[key];
  }

  render() {
    return (
      <div id='calculator'>
        <Display
          lastEntryText={this.state.lastEntry}
          lastAnswer={this.state.lastAnswer}
          content={this.state.curEntry}
        />
        <Keypad
          clear={this.clear}
          lastEntry={this.lastEntry}
          backspace={this.backspace}
          evaluate={this.evaluate}
          handleButtons={this.handleButtons}
        />
      </div>
    );
  }
}

export default Calculator;

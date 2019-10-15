/**
 * Import Node Modules
 */
import React from 'react'
import { PropTypes } from 'prop-types';
import Display from '../../components/Display/Display.js';
import Keypad from '../Keypad/Keypad.js';

/**
 * Import other Dependencies
 */
//CSS
import './Calculator.scss'

class Calculator extends React.Component{
    constructor(props){
        super(props);
        this.state={
            curEntry: "0",
            lastEntry: "",
            lastAnswer: "",
        };
        
        this.clear = this.clear.bind(this);
        this.evaluate = this.evaluate.bind(this);
        this.handleButtons = this.handleButtons.bind(this);
        this.backspace = this.backspace.bind(this);
        this.lastEntry = this.lastEntry.bind(this);
    }

    clear(){
        this.setState({
            curEntry: "0",
            lastAnswer: "",
            lastEntry: ""
        })
    };
    
    evaluate(){
        this.setState({
            lastEntry: this.state.curEntry,
            lastAnswer: eval(this.state.curEntry),
            curEntry: ""
        })
    };

    handleButtons(event){
        let value = event.target.getAttribute("value"); //check which button was pressed
        value = this.validatePressedButton(value); //validate what to do with that button
        this.setState((prevState) => {
            return {curEntry: prevState.curEntry.toString().concat(value)}
        })
    };

    backspace(){
        if(this.state.curEntry.substr(this.state.curEntry.length-3) === "ans"){
            this.setState((prevState) => {
                return { curEntry: prevState.curEntry.slice(0, -3) }
            })
        }else{
            this.setState((prevState) => {
                return { curEntry: prevState.curEntry.slice(0,-1) }
            })
        }
    }

    lastEntry(){
        this.clear();
        this.setState({curEntry: this.state.lastEntry})
    }

    validatePressedButton(value){
        var curEntry = this.state.curEntry;
        var lastChar = curEntry.substr(curEntry.length-1);
        var operators = /[+*/-]/;
        var numbers = /[0-9]/;
        var decimal = /[.]/;
        var lastNumberHasDecimal = /([0-9]*\.[0-9]*)$/;

        //if ans is clicked, do nothing unless an operator was waiting
        if(value === "ans"){
            if(lastChar.match(operators)){
                return value;
            }else{
                return "";
            }
        }

        //if current entry is 0 and a number is typed, override it.
        if(curEntry === "0" && value.match(numbers)){
            this.backspace();
            return value;
        }

        //if current entry is blank and an operator is typed, insert "ans"
        if(curEntry === "" && value.match(operators)){
            this.setState({curEntry: "ans"});
            return value;
        }

        //if last number in string already has a decimal, don't allow another
        if(curEntry.match(lastNumberHasDecimal) && value.match(decimal)){
            return ""
        }

        //only output the last consecutively typed operator
        if(lastChar.match(operators) && value.match(operators)){
            this.backspace();
            return value;
        }
        
        
        
        return value;
    }
    

    render(){
        return (
            <div id="calculator-container">
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
        )
    }
}


/**
 *  Define component PropTypes
*/
Calculator.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func.isRequired,
}


/**
 *  Export the component
 */
export default Calculator;




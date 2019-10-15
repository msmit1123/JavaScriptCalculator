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
import { tsImportEqualsDeclaration } from '@babel/types';

class Calculator extends React.Component{
    constructor(props){
        super(props);
        this.state={
            curEntry: "",
            lastEntry: "",
            lastEntryText: "Welcome",
            lastAnswer: "",
        };
        
        this.clear = this.clear.bind(this);
        this.evaluate = this.evaluate.bind(this);
        this.handleButtons = this.handleButtons.bind(this);
        this.backspace = this.backspace.bind(this);
        this.lastEntry = this.lastEntry.bind(this);
    }

    clear(){
        if(this.state.curEntry != ""){
            this.setState({curEntry: ""});
        }else{this.setState({curEntry: "", lastAnswer: "", lastEntryText: ""})}
    };
    
    evaluate(){
        this.setState({
            lastEntryText: this.state.curEntry,
            lastEntry: this.state.curEntry,
            lastAnswer: eval(this.state.curEntry),
            curEntry: ""
        })
    };

    handleButtons(event){
        let value = event.target.getAttribute("value");
        this.setState((prevState) => {
            return {curEntry: prevState.curEntry.toString().concat(value)}
        })
    };

    backspace(){
        if(this.state.curEntry.substr(this.state.curEntry.length-3) == "ans"){
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
        this.setState({curEntry: this.state.lastEntryText})
    }
    

    render(){
        return (
            <div id="calculator-container">
                <Display 
                    lastEntryText={this.state.lastEntryText}
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




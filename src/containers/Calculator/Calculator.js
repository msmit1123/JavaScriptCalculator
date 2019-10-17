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

//set up regexs for use in methods
var splitPoints = /([)(+*/-]|ans)/;
var operators = /[+*/-]/;
var numbers = /[0-9]/;
var anyNumber = /[-.0-9]+/;
var decimal = /[.]/;
var lastNumberHasDecimal = /([0-9]*\.[0-9]*)$/;

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
        //convert entire string to array broken up at operators
        var exprArr = this.state.curEntry.split(splitPoints).filter((item)=>item !== "" );
        
        /**
        * Prep array for operations
        */
        for (let i = 0; i < exprArr.length; i++){
            exprArr[i] = exprArr[i].replace('⁻', '-'); //convert negative sign before number to negative number
            if (exprArr[i] === "ans") { exprArr[i] = this.state.lastAnswer } //convert "ans" to value of answer
            if (i > 0 && exprArr[i] === "("){
                if (exprArr[i-1].match(anyNumber) || exprArr[i-1] === ")"){
                    exprArr.splice(i, 0, "*"); //if open parentheses is next to a number insert a * between    
                }
            }
            if (i > 0 && exprArr[i] === ")" && exprArr[i+1] !== undefined){
                if (exprArr[i + 1].match(anyNumber) || exprArr[i + 1] === "(") {
                    exprArr.splice(i + 1, 0, "*"); //if close parentheses is next to a number insert a * between    
                }
            }
        }
        
        /**
         * setup error messages
         */
        var parenError = () => this.setState({ lastAnswer: "Parentheses Not Matched" });
        var genericError = () => this.setState({ lastAnswer: "Error!" });
        
        //validate number of open parentheses match close
        var openParen = exprArr.filter(a => a === "(").length;
        var closeParen = exprArr.filter(a => a === ")").length;
        if(openParen !== closeParen){
            parenError();
            return null;   
        }


        /**
         * Begin evaluating the expression
        */
        //find open and close paren tags and put all the contents between into a sub array
        while(exprArr.includes("(")){
            exprArr = reduceParen(exprArr);
        }

        //evaluate expression and throw generic error if problem occurs
        try{
            var answer = evalArr(exprArr);
        }
        catch(e){
            answer = "error";
            genericError();
        }
        
        //update state accordingly
        this.setState({
            lastEntry: this.state.curEntry,
            lastAnswer: answer,
            curEntry: ""
        });

        /**
         * Define Helper Functions for this method
         */
        function reduceParen(arr){
            for(let i=0; i < arr.length; i++){  //work forwards through array to
                if(arr[i] === ")"){             //find first occurance of close paren
                    let n = i;                  //mark this index
                    for(let j=n; j >= 0; j--){   //work back from there to
                        if (arr[j] === "(") {   //find nearest open paren
                            let m = j;          //mark this index
                            var betweenParen = [];  //create a blank array to store the inbetween values
                            for(let g = m + 1; g < n; g++){betweenParen.push(arr[g])} //iterate through the array between the two marked values, and push each value to the new array

                            //return everything before the open paren, then the array, then everything after
                            var newArr = arr.slice(0, m).concat([betweenParen]).concat(arr.slice(n + 1));
                            return newArr;
                        }
                    }
                }
            }
        }

        function evalArr(arr){
            if(arr.length === 1 && typeof arr[0] !== "object"){
                return arr[0]
            }

            for(let i=0; i < arr.length-1; i++){
                if (arr[i] === "*") { arr.splice(i - 1, 3, evalExpression(arr[i - 1],arr[i],arr[i+1]));}
                if (!arr.includes("*") && arr[i] === "/") { arr.splice(i - 1, 3, evalExpression(arr[i - 1], arr[i], arr[i + 1])); }
                if (!arr.includes("*") && !arr.includes("/") && arr[i] === "+") { arr.splice(i - 1, 3, evalExpression(arr[i - 1], arr[i], arr[i + 1])); }
                if (!arr.includes("*") && !arr.includes("/") && !arr.includes("+") && arr[i] === "-") { arr.splice(i - 1, 3, evalExpression(arr[i - 1], arr[i], arr[i + 1])); }
            }
            //replace a,o,b with result into new array
            return evalArr(arr);
        }
        function evalExpression(a,o,b){
            if(typeof a === "object"){evalArr(a)}
            if(typeof b === "object") {evalArr(b)}
            if(o === "*"){return a * b}
            if(o === "/") { return a / b }
            if(o === "+") { return parseFloat(a) + parseFloat(b) }
            if(o === "-") { return a - b }
        }
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

        //if ans is clicked, do nothing unless an operator was waiting
        if(value === "ans"){
            if(lastChar.match(operators) || lastChar === "("){
                return value;
            }else{
                return "";
            }
        }

        //if neg is clicked, do nothing unless an operator was waiting or blank
        if (value === "⁻") {
            if(curEntry === "0"){
                this.backspace();
                return value;
            }
            if (lastChar.match(operators) || lastChar === "(" || curEntry ==="") {
                return value;
            } else {
                return "";
            }
        }

        //if current entry is 0 and a number is typed, override it.
        if (curEntry === "0"){
            if(value.match(numbers)){
                this.backspace();
                return value;
            }
            if(value === "("){
                this.backspace();
                return value;
            }
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

        //Don't let more ) be typed than (
        if(curEntry === ")"){
            console.log("please wait");
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




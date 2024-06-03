import './App.css';
import {useReducer} from 'react';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  DELETE_DIGIT: 'delete-digit',
  CLEAR: 'clear',
  EVALUATE: 'evaluate',
  CHOOSE_OPERATION: 'choose-operation'
}


// function Debugger(state){
//   console.log(
//     `previousOperand -> ${state.previousOperand}
//      operation -> ${state.operation}
//      currentOperand -> ${state.currentOperand}`
//   )
// }

function reducer(state, {type, payload}) {
  switch(type) {
    case ACTIONS.ADD_DIGIT:
      // moves previous to current if any digit input occurs with a result already displayed
      if (state.overwrite) {
        return {          
          ...state,
          currentOperand: `${payload.digit}`,
          overwrite: false
        }
      }
      // if the first digit is 0 and the clicked one is also zero, do not add another zero
      if (payload.digit === 0 && state.currentOperand === 0) 
        return state;
      // if current digit is '.' and clicked digit is also '.', do not add another '.'
      if (payload.digit === '.' && state.currentOperand.includes('.')) 
        return state;
      // add previous state and current operand to display
      return {
        ...state,
       currentOperand: `${state.currentOperand || ''}${payload.digit}`, 
      }
      // erases all calculations
    case ACTIONS.CLEAR:
      // if overwrite true (previous calculation concluded), tranform current back to null         
      return {}
    case ACTIONS.CHOOSE_OPERATION:
      // if current and previous operand are blank, do not add operation
      if (state.currentOperand == null && state.previousOperand == null) {
        return state
      }
      // add operation and send current operand to previous operand on display, leaving current operand blank for new input
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null
        }
      }
      // changes the operation without affecting the previousOperand when user missclicks operation
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation
        }
      }
      // provides for previous operation when user clicks another operation instead of Evaluate
      return {
        ...state,
        previousOperand: currentResult(state),
        currentOperand: null,
        operation: payload.operation,
      }
    case ACTIONS.EVALUATE:
      if (state.operation == null || state.currentOperand == null || state.previousOperand == null) {
        return state
      }
      return {
        ...state,
        overwrite: true,
        currentOperand: currentResult(state),
        previousOperand: null,
        operation: null
      }
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null
        }
      }
      if (state.currentOperand == null) {
        return state
      }
      if (state.currentOperand.lenght === 1){
        return {
          ...state,
          currentOperand: null
        }
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }
    default:
    //  do nothing
  }
}

function currentResult({currentOperand, previousOperand, operation}) {
  const prev = parseFloat(previousOperand)
  const curr = parseFloat(currentOperand)
  if (isNaN(prev) || isNaN(curr)) return ''
  let result = ''
  switch (operation) {
    case "+":
      result = prev + curr
      break
    case "-":
      result = prev - curr
      break
    case "÷":
      result = prev / curr
      break
    case "*":
      result = prev * curr
      break
    default:
      //do nothing
  }

  return result.toString()

}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})

function formatter(number) {
  if (number == null) return
  const [integer, decimal] = number.split('.')
  if (decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App() {
  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {})

  return (
    <div className="calculator-grid">
      <div className="output"> 
        <div className="previous-operand">{formatter(previousOperand)} {operation}</div>
        <div className="current-operand">{formatter(currentOperand)}</div>
      </div>
      <button className="span-two" onClick={() => dispatch({type: ACTIONS.CLEAR})}>AC</button>
      <button onClick={() => dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
      <OperationButton operation="÷" dispatch={dispatch}></OperationButton>
      <DigitButton digit="1" dispatch={dispatch}></DigitButton>
      <DigitButton digit="2" dispatch={dispatch}></DigitButton>
      <DigitButton digit="3" dispatch={dispatch}></DigitButton>
      <OperationButton operation="*" dispatch={dispatch}></OperationButton>
      <DigitButton digit="4" dispatch={dispatch}></DigitButton>
      <DigitButton digit="5" dispatch={dispatch}></DigitButton>
      <DigitButton digit="6" dispatch={dispatch}></DigitButton>
      <OperationButton operation="+" dispatch={dispatch}></OperationButton>
      <DigitButton digit="7" dispatch={dispatch}></DigitButton>
      <DigitButton digit="8" dispatch={dispatch}></DigitButton>
      <DigitButton digit="9" dispatch={dispatch}></DigitButton>
      <OperationButton operation="-" dispatch={dispatch}></OperationButton>
      <DigitButton digit="." dispatch={dispatch}></DigitButton>
      <DigitButton digit="0" dispatch={dispatch}></DigitButton>
      <button className="span-two" onClick={() => dispatch({type: ACTIONS.EVALUATE})}>=</button>
    </div>
  );
}

export default App;

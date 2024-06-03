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

function reducer(state, {type, payload}) {
  switch(type) {
    case ACTIONS.ADD_DIGIT:
      if (payload.digit === 0 && state.currentOperand === 0) 
        return state;
      if (payload.digit === '.' && state.currentOperand.includes('.')) 
        return state;

      return {
        ...state
        currentOperand: `${state.currentOperand || ''}${payload.digit}`, 
      }
    case ACTIONS.CLEAR:
      return {}
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state
      }
    case default:
      return {state};
  }
}

function App() {
  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {})

  return (
    <div className="calculator-grid">
      <div className="output"> 
        <div className="previous-operand">{previousOperand} {operation}</div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button className="span-two">AC</button>
      <button>DEL</button>
      <OperationButton digit="÷" dispatch={dispatch}></OperationButton>
      <DigitButton digit="1" dispatch={dispatch}>÷</DigitButton>
      <DigitButton digit="2" dispatch={dispatch}>÷</DigitButton>
      <DigitButton digit="3" dispatch={dispatch}>÷</DigitButton>
      <OperationButton digit="*" dispatch={dispatch}></OperationButton>
      <DigitButton digit="4" dispatch={dispatch}>÷</DigitButton>
      <DigitButton digit="5" dispatch={dispatch}>÷</DigitButton>
      <DigitButton digit="6" dispatch={dispatch}>÷</DigitButton>
      <OperationButton digit="+" dispatch={dispatch}></OperationButton>
      <DigitButton digit="7" dispatch={dispatch}>÷</DigitButton>
      <DigitButton digit="8" dispatch={dispatch}>÷</DigitButton>
      <DigitButton digit="9" dispatch={dispatch}>÷</DigitButton>
      <OperationButton digit="-" dispatch={dispatch}></OperationButton>
      <DigitButton digit="." dispatch={dispatch}>÷</DigitButton>
      <DigitButton digit="0" dispatch={dispatch}>÷</DigitButton>
      <button className="span-two">=</button>
    </div>
  );
}

export default App;

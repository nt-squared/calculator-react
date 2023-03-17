import { useReducer } from "react";
import * as actions from './actions';
import reducer, { initialState } from "./reducer";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";
import './App.css';



const INTEGER_FORMATTER = new Intl.NumberFormat('en-us', {
  maximumFractionDigits: null,
})

function formatOperand(operand) {
  if (operand === '') return

  const [integer, decimal] = operand.split('.');
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { prevOperand, currOperand, operation } = state;

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="prev-operand">{formatOperand(prevOperand)} {operation}</div>
        <div className="curr-operand">{formatOperand(currOperand)}</div>
      </div>
      <button className="span-two" onClick={() => dispatch(actions.clear(''))}>AC</button>
      <button>()</button>
      <button onClick={() => dispatch(actions.remove(''))}>DEL</button>
      <DigitButton digit='1' dispatch={dispatch} />
      <DigitButton digit='2' dispatch={dispatch} />
      <DigitButton digit='3' dispatch={dispatch} />
      <OperationButton operation='/' dispatch={dispatch} />
      <DigitButton digit='4' dispatch={dispatch} />
      <DigitButton digit='5' dispatch={dispatch} />
      <DigitButton digit='6' dispatch={dispatch} />
      <OperationButton operation='*' dispatch={dispatch} />
      <DigitButton digit='7' dispatch={dispatch} />
      <DigitButton digit='8' dispatch={dispatch} />
      <DigitButton digit='9' dispatch={dispatch} />
      <OperationButton operation='+' dispatch={dispatch} />
      <DigitButton digit='0' dispatch={dispatch} />
      <DigitButton digit='.' dispatch={dispatch} />
      <button onClick={() => dispatch(actions.equal(''))}>=</button>
      <OperationButton operation='-' dispatch={dispatch} />
    </div>
  );
}

export default App;

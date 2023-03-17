
import { DIGIT, OPERATION, CLEAR, EVALUATE, REMOVE } from "./constant";

// Initial State
export const initialState = {
    prevOperand: '',
    currOperand: '',
    operation: '',
}

const reducer = (state, action) => {
    const { prevOperand, currOperand, operation, overwrite } = state;
    // eslint-disable-next-line
    switch (action.type) {
        case DIGIT:
            // overwrite after previous calculation
            if (overwrite && action.payload !== '.') {
                return {
                    ...state,
                    overwrite: false,
                    currOperand: action.payload,
                }
            }

            if (overwrite && action.payload === '.') {
                return {
                    ...state,
                    overwrite: false,
                    currOperand: `0${action.payload}`
                }
            }

            // only one '0' if '0 ' is pressed first
            if (action.payload === '0' && currOperand === '0') return state
            // only one 'period' in operand
            if (action.payload === '.' && currOperand.includes('.')) return state
            // operand becomes '0.' if 'period' is pressed first
            if (action.payload === '.' && currOperand === '') {
                return {
                    ...state,
                    currOperand: `0${action.payload}`
                }
            }

            return {
                ...state,
                currOperand: `${currOperand}${action.payload}`,
            }

        case CLEAR:
            return initialState

        case OPERATION:
            // no 'operation' at first
            if (prevOperand === '' && currOperand === '') return state
            // not press 'operation' many times in a row
            if (currOperand === '') {
                return {
                    ...state,
                    operation: action.payload,
                }
            }
            // move current operand to previous operand
            // when 'operation' is pressed
            if (prevOperand === '') {
                return {
                    ...state,
                    prevOperand: currOperand,
                    currOperand: '',
                    operation: action.payload,
                }
            }

            return {
                ...state,
                prevOperand: evaluate(state),
                currOperand: '',
                operation: action.payload,
            }

        case REMOVE:
            if (currOperand === '') return state
            return {
                ...state,
                currOperand: currOperand.slice(0, -1),
            }

        case EVALUATE:
            if (currOperand === '' || prevOperand === '' || operation === '') return state

            return {
                ...state,
                overwrite: true,
                prevOperand: '',
                currOperand: evaluate(state),
                operation: '',
            }
    }
}

function evaluate({ prevOperand, currOperand, operation }) {
    const prev = parseFloat(prevOperand);
    const curr = parseFloat(currOperand);

    if (isNaN(prev) || isNaN(curr)) return '';

    let computation = '';
    // eslint-disable-next-line
    switch (operation) {
        case '+':
            computation = prev + curr;
            break;
        case '-':
            computation = prev - curr;
            break;
        case '*':
            computation = prev * curr;
            break;
        case '/':
            computation = prev / curr;
            break;
    }
    return computation.toString();
}

export default reducer
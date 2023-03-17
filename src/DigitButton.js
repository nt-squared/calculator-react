import React from 'react'
import * as actions from './actions'

export default function DigitButton({ digit, dispatch }) {
    return (
        <button
            onClick={() => dispatch(actions.selectDigit(digit))}
        >
            {digit}
        </button>
    )
}

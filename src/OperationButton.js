import React from 'react'
import * as actions from './actions'

export default function OperationButton({ operation, dispatch }) {
    return (
        <button
            onClick={() => dispatch(actions.selectOperation(operation))}
        >
            {operation}
        </button>
    )
}

import { CLEAR, DIGIT, OPERATION, EVALUATE, REMOVE } from "./constant";

export const selectDigit = (payload) => {
    return {
        type: DIGIT,
        payload,
    }
}

export const selectOperation = (payload) => {
    return {
        type: OPERATION,
        payload,
    }
}

export const clear = (payload) => {
    return {
        type: CLEAR,
        payload,
    }
}

export const remove = (payload) => {
    return {
        type: REMOVE,
        payload,
    }
}

export const equal = (payload) => {
    return {
        type: EVALUATE,
        payload,
    }
}
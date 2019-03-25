import { FETCH_QUOTES, SET_VALUE, MAKE_ORDER } from './types'

export const fetchQuotes = obj => ({ type: FETCH_QUOTES, payload: obj });
export const setValue = obj => ({type: SET_VALUE, payload: obj })
export const makeOrder = obj => ({ type: MAKE_ORDER, payload: obj })
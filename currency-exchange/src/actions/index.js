import { FETCH_QUOTES, SET_VALUE } from './types'

export const fetchQuotes = obj => ({ type: FETCH_QUOTES, payload: obj });
export const setValue = obj => ({type: SET_VALUE, payload: obj })
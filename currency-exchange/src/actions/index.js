import { 
  FETCH_QUOTES, 
  SET_VALUE, 
  MAKE_ORDER, 
  EDIT_COMMISSION, 
  EDIT_SURCHARGE, 
  EDIT_INTERVAL,
  EDIT_MINCOM,
  EDIT_MARGIN,
  CALL_FAIL
 } from './types'

export const fetchQuotes = obj => ({ type: FETCH_QUOTES, payload: obj });
export const setValue = obj => ({type: SET_VALUE, payload: obj })
export const makeOrder = obj => ({ type: MAKE_ORDER, payload: obj })

export const editCommission = num => ({type: EDIT_COMMISSION, payload: num});
export const editSurcharge = num => ({type: EDIT_SURCHARGE, payload: num});
export const editInterval = num => ({type: EDIT_INTERVAL, payload: num});
export const editMinCom = num => ({type: EDIT_MINCOM, payload: num});
export const editMargin = num => ({type: EDIT_MARGIN, payload: num});
export const callFail = () => ({type: CALL_FAIL})
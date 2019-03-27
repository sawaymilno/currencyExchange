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
 } from '../actions/types'

const INITIAL_STATE = { 
  orderProcess: {
    orderValue: 0,
    orderSubtotal: 0,
    orderCommission: 0,
    orderTotal: 0
  },

  settings: {
    commission: .02,
    surcharge: 1.00,
    minCommission: 2.00,
    buySellMargin: .02,
    quoteUpdateInterval: 10
  },

  quotes: [
    ['USDARS', 41.024999], //Agentinian Peso
    ['USDAUD', 1.40735], //Australian Dollar
    ['USDBRL', 3.7929], //Brazilian Real
    ['USDCAD', 1.33645], //Canadian Dollar
    ['USDCNY', 6.704049], //Chinese Yuan
    ['USDEUR', 0.879015], //Euro
    ['USDGBP', 0.76115], //British Sterling Pound
    ['USDJPY', 110.778968], //Japanese Yen
    ['USDKES', 100.810476], //Kenyan Shilling
    ['USDMXN', 18.857601], //Mexican Peso
  ],

  balances: {
      USD: 1500,  //USD Reserve
      USDARS: 41000, //Agentinian Peso
      USDAUD: 1400, //Australian Dollar
      USDBRL: 4000, //Brazilian Real
      USDCAD: 1500, //Canadian Dollar
      USDCNY: 6700, //Chinese Yuan
      USDEUR: 1000, //Euro
      USDGBP: 900, //British Sterling Pound
      USDJPY: 110000, //Japanese Yen
      USDKES: 100, //Kenyan Shilling
      USDMXN: 20000, //Mexican Peso
  },
  initialBalances: {
    USD: 1500,  //USD Reserve
    USDARS: 41000, //Agentinian Peso
    USDAUD: 1400, //Australian Dollar
    USDBRL: 4000, //Brazilian Real
    USDCAD: 1500, //Canadian Dollar
    USDCNY: 6700, //Chinese Yuan
    USDEUR: 1000, //Euro
    USDGBP: 900, //British Sterling Pound
    USDJPY: 110000, //Japanese Yen
    USDKES: 100, //Kenyan Shilling
    USDMXN: 20000, //Mexican Peso
  },
  failMessage:''

}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_QUOTES:
      return { ...state, quotes: action.payload }
    case SET_VALUE:
    return { ...state, orderProcess: action.payload }
    case MAKE_ORDER:
      return { ...state, balances: action.payload }
    case EDIT_COMMISSION:
      return { ...state, settings: {...state.settings, commission: action.payload}}
    case EDIT_SURCHARGE:
      return { ...state, settings: {...state.settings, surcharge: action.payload}}
    case EDIT_INTERVAL:
      return { ...state, settings: {...state.settings, quoteUpdateInterval: action.payload}}
    case EDIT_MINCOM:
      return { ...state, settings: {...state.settings, minCommission: action.payload}}
    case EDIT_MARGIN:
      return { ...state, settings: {...state.settings, buySellMargin: action.payload}}
    case CALL_FAIL:
      return {...state, failMessage: 'API Call Failed. No Current Quotes.'}
    default:
      return state;
  } 
};

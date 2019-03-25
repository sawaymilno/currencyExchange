
import { FETCH_QUOTES, SET_VALUE, MAKE_ORDER } from '../actions/types';

const INITIAL_STATE = { 

  orderProcess: {
    orderValue: 0,
    orderSubtotal: 0,
    orderCommission: 0,
    orderTotal: 0
  },

  settings: {
    refresh: 10,
    commission: .02,
    surcharge: 1.00,
    minCommission: 2.00,
    buySellMargin: .02
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
  }

}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_QUOTES:
      return { ...state, quotes: action.payload }
    case SET_VALUE:
    return { ...state, orderProcess: action.payload }
    case MAKE_ORDER:
      return { ...state, balances: action.payload }
    default:
      return state;
  } 
};

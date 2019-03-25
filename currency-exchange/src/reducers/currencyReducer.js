
import { FETCH_QUOTES, SET_VALUE } from '../actions/types';

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
      USD: 1500,
      USDARS: 41024.999, //Agentinian Peso
      USDAUD: 1407.35, //Australian Dollar
      USDBRL: 3792.9, //Brazilian Real
      USDCAD: 1336.45, //Canadian Dollar
      USDCNY: 6704.049, //Chinese Yuan
      USDEUR: 879.015, //Euro
      USDGBP: 761.15, //British Sterling Pound
      USDJPY: 110778.968, //Japanese Yen
      USDKES: 100.810476, //Kenyan Shilling
      USDMXN: 18857.601, //Mexican Peso
  }

}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_QUOTES:
      return { ...state, quotes: action.payload }
    case SET_VALUE:
    return { ...state, orderProcess: action.payload }
    default:
      return state;
  } 
};

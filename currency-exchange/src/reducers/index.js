import { combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form';

import currencyReducer from './currencyReducer';

export default combineReducers({
  bankData: currencyReducer,
  // form: formReducer,
});
import { createStore, combineReducers } from 'redux';
import { ReduxInitialState } from './reduxInitialState';

export const ReducerAction = {
  SET_SIGN_IN_MODE: "SET_SIGN_IN_MODE",
  SET_SIGN_UP_MODE: "SET_SIGN_UP_MODE",
  SET_LOG_OUT_MODE: "SET_LOG_OUT_MODE",
  SET_USER_MODE: "SET_USER_MODE",
  SET_SOCIAL1_FIRST_NAME: "SET_SOCIAL1_FIRST_NAME",
  SET_SOCIAL1_LAST_NAME: "SET_SOCIAL1_LAST_NAME",
  SET_PHONE: "SET_PHONE",
  SET_SOCIAL1_EMAIL: "SET_SOCIAL1_EMAIL",
  SET_AUTH_TOKEN: 'SET_AUTH_TOKEN',
  SET_PREFERED_LANGUAGE: 'SET_PREFERED_LANGUAGE',
  SET_USER_PROFILE: 'SET_USER_PROFILE',
  SET_ROLE_ID: 'SET_ROLE_ID',
  SET_ADDRESS: 'SET_ADDRESS',
  SET_YEAR_OF_ESTABLISHMENT: 'SET_YEAR_OF_ESTABLISHMENT',
  SET_BANK_INFO: 'SET_BANK_INFO',
  SET_COMPANY_NAME: 'SET_COMPANY',
  SET_PASSWORD: 'SET_PASSWORD',
};

// reducer with actions
const reducer = (state = ReduxInitialState, action) => {
  switch (action.type) {
    case ReducerAction.SET_SIGN_IN_MODE:
      return { ...state, signIn: action.payload };
    case ReducerAction.SET_SIGN_UP_MODE:
      return { ...state, signUp: action.payload };
    case ReducerAction.SET_LOG_OUT_MODE:
      return { ...state, logOut: action.payload };
    case ReducerAction.SET_USER_MODE:
      return { ...state, userMode: action.payload };
    case ReducerAction.SET_SOCIAL1_EMAIL:
      return { ...state, social1Email: action.payload };
    case ReducerAction.SET_SOCIAL1_FIRST_NAME:
      return { ...state, social1FirstName: action.payload };
    case ReducerAction.SET_SOCIAL1_LAST_NAME:
      return { ...state, social1LastName: action.payload };
    case ReducerAction.SET_AUTH_TOKEN:
      return { ...state, authToken: action.payload };
    case ReducerAction.SET_PREFERED_LANGUAGE:
      return { ...state, preferedLanguage: action.payload };
    case ReducerAction.SET_ROLE_ID:
      return { ...state, roleId: action.payload };
    case ReducerAction.SET_USER_PROFILE:
      return { ...state, profile: action.payload };
    case ReducerAction.SET_ADDRESS:
      return { ...state, address: action.payload };
    case ReducerAction.SET_YEAR_OF_ESTABLISHMENT:
      return { ...state, establishmentYear: action.payload };
    case ReducerAction.SET_BANK_INFO:
      return { ...state, bankInfo: action.payload };
    case ReducerAction.SET_PHONE:
      return { ...state, phoneNumber: action.payload };
    case ReducerAction.SET_COMPANY_NAME:
      return { ...state, companyName: action.payload };
    case ReducerAction.SET_PASSWORD:
      return { ...state, password: action.payload };
    default:
      return state;
  }
};

const store = createStore(combineReducers({
  generalReducer: reducer
}));

export default store;


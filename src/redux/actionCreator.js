import {ReducerAction} from './store'

export const setSignInMode = (payload) => {
  return {
    type: ReducerAction.SET_SIGN_IN_MODE,
    payload
  }
}

export const setSignUpMode = (payload) => {
  return {
    type: ReducerAction.SET_SIGN_UP_MODE,
    payload
  }
}

export const setLogOutMode = (payload) => {
  return {
    type: ReducerAction.SET_LOG_OUT_MODE,
    payload
  }
}

export const setPhoneNumber = (payload) => {
  return {
    type: ReducerAction.SET_PHONE,
    payload
  }
}

export const setAuthToken = (payload) => {
  return {
    type: ReducerAction.SET_AUTH_TOKEN,
    payload
  }
}

export const setUserMode = (payload) => {
  return {
    type: ReducerAction.SET_USER_MODE,
    payload
  }
}

export const setFirstNameFromScoial1 = (payload) => {
  return {
    type: ReducerAction.SET_SOCIAL1_FIRST_NAME,
    payload
  }
}

export const setLastNameFromScoial1 = (payload) => {
  return {
    type: ReducerAction.SET_SOCIAL1_LAST_NAME,
    payload
  }
}

export const setEmailFromScoial1 = (payload) => {
  return {
    type: ReducerAction.SET_SOCIAL1_EMAIL,
    payload
  }
}

export const setProfileFromScoial1 = (payload) => {
  return {
    type: ReducerAction.SET_USER_PROFILE,
    payload
  }
}
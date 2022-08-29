import {useReducer} from 'react'

const initialState: LoginState = {
  username: '',
  password: '',
  isLoading: false,
  error: '',
  isLoggedIn: false,
  variant: 'login'
}

// type LoginState = typeof initialState

interface LoginState {
  username: string
  password: string
  isLoading: boolean
  error: string
  isLoggedIn: boolean
  variant: 'login' | 'forgetPassword'
}

// Naive:
// interface LoginAction {
//   type: string
//   fieldName?: string
//   payload?: string
// }

type LoginAction =
  | { type: 'login' | 'success' | 'error' | 'logout' }
  | { type: 'field', fieldName: string, payload: string }

function loginReducer(state: LoginState, action: LoginAction) {
  switch (action.type) {
    case 'field':
      return {
        ...state,
        [action.fieldName]: action.payload
      }
    case 'login':
      return {
        ...state,
        isLoading: true,
        error: ''
      }
    case 'success':
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        error: ''
      }
    case 'error':
      return {
        ...state,
        isLoading: false,
        error: 'Incorrect username or password',
        username: '',
        password: ''
      }
    case 'logout':
      return {
        ...state,
        isLoggedIn: false,
        isLoading: false,
        username: '',
        password: ''
      }
    default: return state
  }
}

export default function useLogin() {
  // return [state, dispatch]
  return useReducer(loginReducer, initialState, () => initialState)
}

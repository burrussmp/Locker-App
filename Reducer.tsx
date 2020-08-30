import { combineReducers } from 'redux';
import { AsyncStorage } from 'react-native';

import config from 'config';

const SIGN_UP = "SIGN_UP";
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const ERROR = "ERROR"

interface SignUpAction {
  type: typeof SIGN_UP,
};

interface LoginAction {
  type: typeof LOGIN,
  token: string
};

interface LogOutAction {
  type: typeof LOGOUT,
};

interface ErrorAction {
  type: typeof ERROR,
  message: string
};

type AuthorizationActions = SignUpAction | LoginAction | LogOutAction | ErrorAction;

interface AuthState {
  token : string
};
const AuthInitialState = {
  token : ""
};

export const SignUp = async (data : Object) : Promise<AuthorizationActions> => {
  let response = await fetch(`${config.server}/users`,{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
    body: JSON.stringify(data)
  });
  if (response.ok){
    return {
      type: SIGN_UP
    }
  } else {
    let err = await response.json();
    return {
      type : ERROR,
      message: err.message
    }
  }
}

export const Login = async (data : Object) : Promise<AuthorizationActions> => {
  let response = await fetch(`${config.server}/auth/login`,{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
    body: JSON.stringify(data)
  });
  if (response.ok){
    let result = await response.json();
    await AsyncStorage.setItem("token",result.token);
    return {
      type: LOGIN,
      token: result.token
    }
  } else {
    let err = await response.json();
    return {
      type : ERROR,
      message: err.message
    }
  }
}

export const LogOut = async () : Promise<AuthorizationActions> => {
  let response = await fetch(`${config.server}/auth/logout`);
  if (response.ok){
    await AsyncStorage.setItem("token","");
    return {
      type: LOGOUT
    }
  } else {
    let err = await response.json();
    return {
      type : ERROR,
      message: err.message
    }
  }
}
 
const AuthorizationReducer = (
  state = AuthInitialState, 
  action : AuthorizationActions
  ) : AuthState => {
  switch (action.type) {
    case LOGOUT:
      return {
        "token" : ""
      }
    case SIGN_UP:
      return state
    case LOGIN:
      return {
        "token" : action.token
      }
    case ERROR: 
      return state
    default:
      return state
  }
};

export default combineReducers({
  auth: AuthorizationReducer,
});
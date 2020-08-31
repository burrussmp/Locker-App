"use strict";

import config from 'config';
import { AsyncStorage } from 'react-native';

/*
  * Helpers
*/

// set the JWT token from AsyncStorage
const setToken = async (token : string) : Promise<void> => {
  return AsyncStorage.setItem("token",token);
}

// get the JWT token from AsyncStorage
const getToken = async () : Promise<String | null> => {
  return AsyncStorage.getItem("token"); 
}

// A wrapper to throw a new error that includes the status code and server message
const handleError = async (res : any) : Promise<Error> => {
  let status = res.status;
  let err = await res.json();
  return new Error(JSON.stringify({
    status: status,
    message: err
  }))
}

// retrieves the header including the token to set the Authorization header
const getHeaders = async () : Promise<{}> => {
  let token = await getToken();
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization' : `Bearer ${token}`
  };
}

/*
  * API
*/
const Login = async (loginInfo : Object) : Promise<String | Error | undefined> => {
  loginInfo = config.default_user;
  let res = await fetch(`${config.server}/auth/login`,{
    method: 'POST',
    headers: await getHeaders(),
    body: JSON.stringify(loginInfo)
  });
  if (res.ok){
    let result = await res.json();
    await setToken(result.token);
    return result.token;
  } else {
    throw handleError(res);
  }
}

const Logout = async () : Promise<void | Error> => {
  let res = await fetch(`${config.server}/auth/logout`);
  if (res.ok){
    await setToken("");
  } else {
    throw handleError(res);
  }
}

const SignUp = async (data : Object) : Promise<void | Error>=> {
  let res = await fetch(`${config.server}/users`,{
    method: 'POST',
    headers: await getHeaders(),
    body: JSON.stringify(data)
  });
  if (!res.ok){
    throw handleError(res);
  }
}

export default {
  Login,
  Logout,
  SignUp,
  getToken,
  setToken
}
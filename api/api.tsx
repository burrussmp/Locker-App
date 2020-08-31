"use strict";

import config from 'config';
import { AsyncStorage } from 'react-native';

// HELPERS

/**
  * @desc Saves user JWT token in memory
  * @param token : String - Token retrieved from server or empty to remove
  * @return Promise to be resolved
*/
const setToken = async (token : string) : Promise<void> => {
  return AsyncStorage.setItem("token",token);
}

/**
  * @desc Retrieves the user JWT token from memory
  * @return Promise<String>
*/
const getToken = async () : Promise<String | null> => {
  return AsyncStorage.getItem("token"); 
}

/**
  * @desc A wrapper to retrieve error (status code and message are JSON stringified)
  * @return Promise<Error>
*/
const handleError = async (res : any) : Promise<Error> => {
  let status = res.status;
  let err = await res.json();
  return new Error(JSON.stringify({
    status: status,
    message: err
  }))
}

/**
  * @desc A wrapper to retrieve token and set headers for React's Fetch API
  * @return Promise<Object>
*/
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

/**
  * @desc Login API
  * @param data : Object - Contains the login info and password of the
  * Example: {
  *   login: "userA",
  *   password: "password123$"
  * }
  * @return A promise that can be handled. If resolved, the user's token is returned (String) else an error is returned
*/
const Login = async (data : Object) : Promise<String | Error | undefined> => {
  data = config.default_user;
  let res = await fetch(`${config.server}/auth/login`,{
    method: 'POST',
    headers: await getHeaders(),
    body: JSON.stringify(data)
  });
  if (res.ok){
    let result = await res.json();
    await setToken(result.token);
    return result.token;
  } else {
    throw handleError(res);
  }
}

/**
  * @desc Logout API
  * @return A promise that can be handled. If resolved, the user's token has been deleted else error can be caught
*/
const Logout = async () : Promise<void | Error> => {
  let res = await fetch(`${config.server}/auth/logout`);
  if (res.ok){
    await setToken("");
  } else {
    throw handleError(res);
  }
}

/**
  * @desc Login API
  * @param data : Object - Contains the login info and password of the
  * Example: {
  *   username: "userA",
  *   email : "userA@mail.com",
  *   first_name : "userA first name",
  *   last_name : "userA last name",
  *   phone_number: "000-111-2222"
  *   password: "password123$"
  * }
  * @return A promise that can be handled. If resolved, void else throws error
*/
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
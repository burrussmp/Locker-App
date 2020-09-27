/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Client-Side API calls
 * @version 1.0.0
 */

import apiSession from './session';
import apiHelper from './helper';
import {Session} from 'store/types/auth.types';
import config from 'config';
global.fetch = require('node-fetch');

interface LoginData {
  login: string;
  password: string;
}

interface SignUpData {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}

/**
 * @desc Login API
 * @param data : Object - Contains the login info and password of the
 * @return A promise that can be handled. If resolved, the user's token is returned (String) else an error is returned
 * @success
```
{
    "access_token": "XXXX",
    "id_token": "YYYY",
    "refresh_token" : "ZZZZ",
    "_id": "WWWW"
}
```
 */
const Login = async (data: LoginData): Promise<Session | Error> => {
  const res = await global.fetch(`${config.server}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    const session = await res.json();
    await apiSession.setSession(session);
    return session;
  } else {
    throw await apiHelper.handleError(res);
  }
};

/**
 * @desc Logout API
 * @return A promise that can be handled. If resolved, the user's token has been deleted else error can be caught
 * @success
```
  {
    "message": "Logged out"
  }
```
 */
const Logout = async (): Promise<{message: string} | Error> => {
  const res = await global.fetch(`${config.server}/auth/logout`);
  if (res.ok) {
    await apiSession.setSession(null);
    return await res.json();
  } else {
    throw await apiHelper.handleError(res);
  }
};

/**
 * @desc Signup API
 * @param data : Object - Contains the login info and password of the
 * @return A promise that can be handled. If resolved, void else throws error
  * @success
```
{
    "access_token": "XXXX",
    "id_token": "YYYY",
    "refresh_token" : "ZZZZ",
    "_id": "WWWW"
}
```
 */
const SignUp = async (data: SignUpData): Promise<Session> => {
  const res = await global.fetch(`${config.server}/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    const session = await res.json();
    await apiSession.setSession(session);
    return session;
  } else {
    throw await apiHelper.handleError(res);
  }
};

/**
 * @desc Forgot Password
 * @param {string} email The email of the person who forgot their password
 * @return A promise that resolves if a code has been sent to person's email
  * @success (Note: The cognito_username is required to reset the password so must be kept)
```
  {
    "cognito_username" : "4d9cfc84-9d89-4866-a28f-d8c2b7c41178"
  }
```
 */
const ForgotPassword = async (
  email: string
): Promise<{cognito_username: string}> => {
  const res = await global.fetch(`${config.server}/auth/forgot_password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
    }),
  });
  if (res.ok) {
    return await res.json();
  } else {
    throw await apiHelper.handleError(res);
  }
};

/**
 * @desc Confirm Forgot Password
 * @param {string} cognito_username The cognito username of the person (should come from the ForgotPassword request)
 * @param {string} confirmation_code The confirmation code sent to the user
 * @param {string} new_password The new password of the person
 * @return A promise that resolves if the password has been successfully reset
  * @success (Note: The cognito_username is required to reset the password so must be kept)
```
{
    "message": "Correctly reset password"
}
```
 */
const ConfirmForgotPassword = async (
  cognito_username: string,
  confirmation_code: string,
  new_password: string
): Promise<boolean> => {
  const res = await global.fetch(
    `${config.server}/auth/confirm_forgot_password`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cognito_username: cognito_username,
        confirmation_code: confirmation_code,
        new_password: new_password,
      }),
    }
  );
  if (res.ok) {
    return true;
  } else {
    throw await apiHelper.handleError(res);
  }
};

export default {
  Login,
  Logout,
  SignUp,
  ForgotPassword,
  ConfirmForgotPassword,
};

/**
 * @description All of the authorization calls for users
 * @author Matthew P. Burruss
 * @date 12/24/2020
 * @version 1.0.0
 */

import fetch from 'node-fetch';

import apiSession from 'api/session';
import apiHelper from 'api/helper';
import { Session } from 'store/types/auth.types';
import config from 'config';

/**
 * @desc Login information interface
 */
interface LoginData {
  /**
   * @property {string} login The username, phone number, or email of the user.
   */
  'login': string;
  /**
   * @property {string} password The password of the user.
   */
  'password': string;
}

interface SignUpData {
  /**
   * @property {string} email The email of the user.
   */
  'email': string;
  /**
   * @property {string} phone_number The phone number of the user. Must be in format +15024567890
   */
  'phone_number': string;
  /**
   * @property {string} login The username of the user (<= 32 characters).
   */
  'username': string;
  /**
   * @property {string} password The password of the user (at least 1 number, 1 lower case, 1 upper case
   * and 1 special character, and >= 8 characters.).
   */
  'password': string;
  /**
   * @property {string} first_name The first name of the user (optional)
   */
  'first_name': string;
  /**
   * @property {string} last_name The first name of the user (optional)
   */
  'last_name': string;
}

/**
 * @desc User Login API
 * @param {LoginData} data Contains the login info and password of the
 * @return {Promise<Session | Error>} A promise that can be handled. If resolved, the user's token is returned (String)
 * else an error is returned
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
  const res = await fetch(`${config.server}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    const session = await res.json() as Session;
    await apiSession.setSession(session);
    return session;
  }
  throw await apiHelper.handleError(res);
};

/**
 * @desc Logout API
 * @return {Promise<{message: string} | Error>} A promise that resolves
 * if the user has successfully been logged out.
 * @success
```
  {
    "message": "Logged out"
  }
```
 */
const Logout = async (): Promise<{message: string} | Error> => {
  const res = await fetch(`${config.server}/auth/logout`);
  if (res.ok) {
    await apiSession.setSession(null);
    return await res.json() as {message: string};
  }
  throw await apiHelper.handleError(res);
};

/**
 * @desc User Sign Up API
 * @param {SignUpData} data The sign in information. Required attributes include username, email,
 * phone number, and password.
 * @return {Promise<Session>} The user session if successful.
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
  const res = await fetch(`${config.server}/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    const session = await res.json() as Session;
    await apiSession.setSession(session);
    return session;
  }
  throw await apiHelper.handleError(res);
};

/**
 * @desc Forgot Password API
 * @param {string} email The email of the person who forgot their password
 * @return {Promise<{cognito_username: string}>} The cognito_username if the person has been sent an
 * email.
  * @success (Note: The cognito_username is required to reset the password so must be kept)
```
  {
    "cognito_username" : "4d9cfc84-9d89-4866-a28f-d8c2b7c41178"
  }
```
 */
const ForgotPassword = async (email: string): Promise<{'cognito_username': string}> => {
  const res = await fetch(`${config.server}/auth/forgot_password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
    }),
  });
  if (res.ok) {
    return await res.json() as {'cognito_username': string};
  }
  throw await apiHelper.handleError(res);
};

/**
 * @desc Confirm Forgotten Password
 * @param {string} cognito_username The cognito username of the person (should come from the ForgotPassword request)
 * @param {string} confirmationCode The confirmation code sent to the user via email or SMS.
 * @param {string} newPassword The new password of the person
 * @return {Promise<boolean>} A promise that resolves if the password has been successfully reset
  * @success (Note: The cognito_username is required to reset the password so must be kept)
```
{
    "message": "Correctly reset password"
}
```
 */
const ConfirmForgotPassword = async (cognitoUsername: string, confirmationCode: string, newPassword: string): Promise<boolean> => {
  const res = await fetch(`${config.server}/auth/confirm_forgot_password`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cognito_username: cognitoUsername,
        confirmation_code: confirmationCode,
        new_password: newPassword,
      }),
    });
  if (res.ok) {
    return true;
  }
  throw await apiHelper.handleError(res);
};

export default {
  Login,
  Logout,
  SignUp,
  ForgotPassword,
  ConfirmForgotPassword,
};

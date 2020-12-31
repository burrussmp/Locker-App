/**
 * @description Auth API
 * @author Matthew P. Burruss
 * @date 12/24/2020
 */

import apiSession from 'api/session';
import utils from 'api/utils';
import { Session } from 'store/types/auth.types';

/**
 * @desc Login information interface
 */
interface LoginData extends Record<string, string> {
  /**
   * @property {string} login The username, phone number, or email of the user.
   */
  'login': string;
  /**
   * @property {string} password The password of the user.
   */
  'password': string;
}

interface SignUpData extends Record<string, string> {
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
 * @return {Promise<Session>} A promise that can be handled. If resolved, the user's token is returned (String)
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
const Login = async (data: LoginData): Promise<Session> => {
  const res = await utils.postRequest('/auth/login', data);
  const session = await res.json() as Session;
  await apiSession.setSession(session);
  return session;
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
  const res = await utils.getRequest('/auth/logout');
  await apiSession.setSession(null);
  return await res.json() as {message: string};
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
  const res = await utils.postRequest('/api/users', data);
  const session = await res.json() as Session;
  await apiSession.setSession(session);
  return session;
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
const ForgotPassword = async (email: string): Promise<Record<string, string>> => {
  const res = await utils.postRequest('/auth/forgot_password', { email });
  return await res.json() as Record<string, string>;
};

/**
 * @desc Confirm Forgotten Password
 * @param {string} cognito_username The cognito username of the person (should come from the ForgotPassword request)
 * @param {string} confirmationCode The confirmation code sent to the user via email or SMS.
 * @param {string} newPassword The new password of the person
 * @return {Promise<void>} A promise that resolves if the password has been successfully reset
  * @success (Note: The cognito_username is required to reset the password so must be kept)
```
{
    "message": "Correctly reset password"
}
```
 */
const ConfirmForgotPassword = async (cognitoUsername: string, confirmationCode: string, newPassword: string): Promise<void> => {
  await utils.postRequest('/auth/confirm_forgot_password', {
    cognito_username: cognitoUsername,
    confirmation_code: confirmationCode,
    new_password: newPassword,
  });
};

export default {
  Login,
  Logout,
  SignUp,
  ForgotPassword,
  ConfirmForgotPassword,
};

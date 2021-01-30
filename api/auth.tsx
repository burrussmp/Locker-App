/**
 * @description Auth API
 * @author Matthew P. Burruss
 * @date 12/24/2020
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiSession from 'api/session';
import utils from 'api/utils';

import AuthActions from 'store/actions/auth.actions';
import store from 'store/index';
import { Session } from 'store/types/auth.types';
import { ASYNC_STORAGE_LOCKER_ID_KEY } from 'api/locker';

/**
 * @desc User Login API
 * @param {string} login The username, phone number, or email of the user.
 * @param {string} password The password of the user (at least 1 number, 1 lower case, 1 upper case
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
const Login = async (login: string, password: string): Promise<Session> => {
  const res = await utils.postRequest('/auth/login', { login, password });
  const session = await res.json() as Session;
  await apiSession.setSession(session);
  store.dispatch(AuthActions.setSession(session));
  return session;
};

/**
 * @desc Logout API
 * @return {Promise<{message: string}>} A promise that resolves
 * if the user has successfully been logged out.
 * @success
```
  {
    "message": "Logged out"
  }
```
 */
const Logout = async (): Promise<{message: string}> => {
  await apiSession.setSession();
  store.dispatch(AuthActions.logout());
  const res = await utils.getRequest('/auth/logout');
  await AsyncStorage.setItem(ASYNC_STORAGE_LOCKER_ID_KEY, '');
  return await res.json() as {message: string};
};

/**
 * @desc User Sign Up API
 * @param {string} email The email of the user.
 * @param {string} phone_number The phone number of the user. Must be in format +15024567890
 * @param {string} login The username of the user (<= 32 characters).
 * @param {string} password The password of the user (at least 1 number, 1 lower case, 1 upper case
 * @param {string} first_name The first name of the user (optional)
 * @param {string} last_name The first name of the user (optional)
*
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

const SignUp = async (email: string, phoneNumber: string, username: string, password: string, firstName = '',
  lastName = ''): Promise<Session> => {
  const res = await utils.postRequest('/api/users', {
    email,
    phone_number: phoneNumber,
    username,
    password,
    first_name: firstName,
    last_name: lastName,
  });
  const session = await res.json() as Session;
  await apiSession.setSession(session);
  store.dispatch(AuthActions.setSession(session));
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
const ForgotPassword = async (email: string): Promise<{'cognito_username': string}> => {
  const res = await utils.postRequest('/auth/forgot_password', { email });
  return await res.json() as {'cognito_username': string};
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

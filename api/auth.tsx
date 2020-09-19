/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Client-Side API calls
 * @version 1.0.0
 */

import config from 'config';
import apiSession from './session';
import apiHelper from './helper';
import {Session} from 'store/types/auth.types';

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
  data = config.default_user;
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
const SignUp = async (data: SignUpData): Promise<Session | Error> => {
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

export default {
  Login,
  Logout,
  SignUp,
};

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
 * Example: {
 *   login: "userA",
 *   password: "password123$"
 * }
 * @return A promise that can be handled. If resolved, the user's token is returned (String) else an error is returned
 */
const Login = async (data: LoginData): Promise<Session | Error> => {
  data = config.default_user;
  console.log(data);
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
 * @desc Verify Token API
 * @return A promise that can be handled. If resolved, the token is verified
 */
const VerifyToken = async (token: string): Promise<boolean | Error> => {
  const res = await global.fetch(
    `${config.server}/auth/verify_token?token=${token}`,
    {
      method: 'HEAD',
    }
  );
  console.log(res.ok);
  if (res.ok) {
    return true;
  } else {
    throw await apiHelper.handleError(res);
  }
};

/**
 * @desc Logout API
 * @return A promise that can be handled. If resolved, the user's token has been deleted else error can be caught
 */
const Logout = async (): Promise<void | Error> => {
  const res = await global.fetch(`${config.server}/auth/logout`);
  if (res.ok) {
    await apiSession.setSession(null);
  } else {
    throw await apiHelper.handleError(res);
  }
};

/**
 * @desc Signup API
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
  VerifyToken,
};

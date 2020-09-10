/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc All the actions necessary to authorize a user
 * Actions in redux are dispatched to the store. The store uses the appropriate reducer
 * to change the state based on the current state and the dispatched action.
 */

import {
  AuthorizationActions,
  SIGN_UP,
  LOGIN,
  LOGOUT,
} from 'store/types/auth.types';

const SignUp = (token: string): AuthorizationActions => {
  return {
    type: SIGN_UP,
    token: token,
  };
};

const Login = (token: string): AuthorizationActions => {
  return {
    type: LOGIN,
    token: token,
  };
};

const Logout = (): AuthorizationActions => {
  return {
    type: LOGOUT,
  };
};

export default {
  Login,
  Logout,
  SignUp,
};

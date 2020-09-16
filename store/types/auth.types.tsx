/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Necessary for typescript use of react redux. Specify the types that the actions/reducer needs to define appropriately
 */

export const SIGN_UP = 'auth/sign_up';
export const LOGIN = 'auth/login';
export const LOGOUT = 'auth/logout';

export interface Session {
  access_token: string;
  refresh_token: string;
  id_token: string;
  _id: string;
}

interface SignUpAction {
  type: typeof SIGN_UP;
  session: Session;
}

interface LoginAction {
  type: typeof LOGIN;
  session: Session;
}

interface LogOutAction {
  type: typeof LOGOUT;
}

export type AuthorizationActions = SignUpAction | LoginAction | LogOutAction;

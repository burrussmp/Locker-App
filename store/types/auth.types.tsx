/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Necessary for typescript use of react redux. Specify the types that the actions/reducer needs to define appropriately
 */

export const SET_SESSION = 'auth/session';
export const LOGIN = 'auth/login';
export const LOGOUT = 'auth/logout';
export const VERIFY_TOKEN = 'auth/verify_token';

export interface Session {
  access_token: string;
  refresh_token: string;
  id_token: string;
  _id: string;
}

interface SetSession {
  type: typeof SET_SESSION;
  session: Session;
}
interface LogOutAction {
  type: typeof LOGOUT;
}

interface VerifyTokenAction {
  type: typeof VERIFY_TOKEN;
  verified: boolean;
}

export type AuthorizationActions =
  | SetSession
  | LogOutAction
  | VerifyTokenAction;

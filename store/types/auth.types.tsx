"use strict";

export const SIGN_UP = "auth/sign_up";
export const LOGIN = "auth/login";
export const LOGOUT = "auth/logout";

interface SignUpAction {
  type: typeof SIGN_UP,
};

interface LoginAction {
  type: typeof LOGIN,
  token: string
};

interface LogOutAction {
  type: typeof LOGOUT,
};

export type AuthorizationActions = SignUpAction | LoginAction | LogOutAction;

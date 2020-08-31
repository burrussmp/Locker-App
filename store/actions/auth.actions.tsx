"use strict";

import {
    AuthorizationActions,
    SIGN_UP,
    LOGIN,
    LOGOUT
} from 'store/types/auth.types';

const SignUp = () : AuthorizationActions => {
    return {
        type: SIGN_UP
    }
}

const Login = (token : string) : AuthorizationActions => {
    return {
      type: LOGIN,
      token: token
    }
}

const Logout = () : AuthorizationActions => {
    return {
      type: LOGOUT
    }
}

export default {
    Login,
    Logout,
    SignUp
}
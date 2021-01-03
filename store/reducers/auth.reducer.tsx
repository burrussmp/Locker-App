/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc The slice reducer for the authorization. Handles all the logic necessary to
 * produce a new state given the old state and the action
 */

import {
  AuthorizationActions,
  SET_SESSION,
  LOGOUT,
  VERIFY_TOKEN,
  Session,
} from 'store/types/auth.types';

type AuthState = {
  session: Session;
  verified: boolean;
};

const AuthInitialState = {
  session: {
    access_token: '',
    id_token: '',
    refresh_token: '',
    _id: '',
  },
  verified: false,
};

const AuthorizationReducer = (state = AuthInitialState, action: AuthorizationActions): AuthState => {
  switch (action.type) {
    case LOGOUT:
      return AuthInitialState;
    case SET_SESSION:
      return { ...state, session: action.session };
    case VERIFY_TOKEN:
      return { ...state, verified: action.verified };
    default:
      return state;
  }
};

export default AuthorizationReducer;

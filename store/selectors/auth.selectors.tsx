import {Session} from 'store/types/auth.types';
import AuthActions from 'store/actions/auth.actions';
import api from 'api/api';
import store from 'store/index';

/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Selectors are easy ways to retrieve certain information from the store
 */

const isLoggedIn = (state: any): boolean => {
  return (
    state.auth &&
    state.auth.session &&
    state.auth.verified &&
    state.auth.session.access_token
  );
};

const Authenticate = async (dispatch: any, session: Session) => {
  dispatch(AuthActions.SetSession(session));
  if (session) {
    const verified = await api.Session.VerifyToken(session['access_token']);
    dispatch(AuthActions.VerifyToken(verified));
  }
};

/**
 * @desc Retrieve the my userID from redux
 * @return "{
 *  "id" : user ID,
 * } if it exists otherwise throws an error
 */
const getMyID = (): undefined | string => {
  const state = store.getState();
  if (state.auth && state.auth.session) {
    return state.auth.session._id;
  }
};

export default {
  isLoggedIn,
  Authenticate,
  getMyID,
};

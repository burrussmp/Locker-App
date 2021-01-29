/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Selectors are easy ways to retrieve certain information from the store
*/
import { Dispatch } from 'redux';

import { Session } from 'store/types/auth.types';
import AuthActions from 'store/actions/auth.actions';
import api from 'api/api';
import { AuthState } from 'store/types/auth.types';
import store, { RootAction } from 'store/index';

/**
 * @desc Check Redux state and see if logged in.
 * @param {AuthState} authState The redux auth state
 * @return {boolean} True if logged in else False.
 */
const isLoggedIn = (authState: AuthState): boolean => (
  Boolean(authState
    && authState.session
    && authState.verified
    && authState.session.access_token)
);

/**
 * @desc Authenticate a user.
 * @param dispatch
 * @param session
 */
const authenticate = async (dispatch: Dispatch<RootAction>, session: Session): Promise<void> => {
  dispatch(AuthActions.setSession(session));
  if (session) {
    const verified = await api.Session.verifyToken(session.access_token);
    dispatch(AuthActions.verifyToken(verified));
  }
};

/**
 * @desc Retrieve the my userId from redux
 * @return "{
 *  "id" : user ID,
 * } if it exists otherwise throws an error
 */
const getMyID = (): undefined | string => {
  const state = store.getState();
  if (state.auth && state.auth.session) {
    return state.auth.session._id;
  }
  return undefined;
};

export default {
  isLoggedIn,
  authenticate,
  getMyID,
};

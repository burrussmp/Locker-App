/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc The central store created by all the reducers with logging middleware. This is what app.js imports
 */

import {
  createStore, applyMiddleware, compose, combineReducers,
} from 'redux';
import { createLogger } from 'redux-logger';

// import reducers
import AuthReducer from 'store/reducers/auth.reducer';

// import states
import { AuthActions, AuthState } from 'store/types/auth.types';

// add logger if development
const middleware = [];
if (process.env.NODE_ENV === 'development') {
  middleware.push(createLogger());
}

// Root state
export interface RootState {
  auth: AuthState;
}

// Root Action
export type RootAction = AuthActions;

// Root reducer
export const reducers = combineReducers({
  auth: AuthReducer,
});

export default compose(applyMiddleware(...middleware))(createStore)(reducers); // export the created store

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
import HomeReducer from 'store/reducers/home.reducer';
import PostReducer from 'store/reducers/post.reducer';

// import states
import { AuthActions, AuthState } from 'store/types/auth.types';
import { HomeActions, HomeState } from 'store/types/home.types';
import { PostActions, PostState } from 'store/types/post.types';

// add logger if development
const middleware = [];
if (process.env.NODE_ENV === 'development') {
  middleware.push(createLogger());
}

// Root state
export interface RootState {
  auth: AuthState;
  home: HomeState;
  post: PostState;
}

// Root Action
export type RootAction = AuthActions | HomeActions | PostActions;

// Root reducer
export const reducers = combineReducers({
  auth: AuthReducer,
  home: HomeReducer,
  post: PostReducer,
});

export default compose(applyMiddleware(...middleware))(createStore)(reducers); // export the created store

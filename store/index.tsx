/**
  * @author Matthew P. Burruss
  * @date Aug 2020
  * @desc The central store created by all the reducers with logging middleware. This is what app.js imports
*/

import { createStore,applyMiddleware, compose, combineReducers} from 'redux';
import {createLogger} from 'redux-logger' 

import AuthReducer from 'store/reducers/auth.reducer';

const middleware = [];
if (process.env.NODE_ENV === `development`) { // Add logging if in development mode
    middleware.push(createLogger());
}

const Reducer = combineReducers({ // create the combined reducer with all the reducer slices
    auth: AuthReducer
})

export default compose(applyMiddleware(...middleware))(createStore)(Reducer); // export the created store

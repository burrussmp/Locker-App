"use strict";

// import external libraries
import { createStore,applyMiddleware, compose, combineReducers} from 'redux';
import {createLogger} from 'redux-logger' 

// Add logging if in development mode
const middleware = [];
if (process.env.NODE_ENV === `development`) {
    const logger = createLogger({
        level : 'log'
    })
    middleware.push(logger);
}

// import reducers
import AuthReducer from 'store/reducers/auth.reducer';

// create the reducers
const Reducer = combineReducers({
    auth: AuthReducer
})

// create the Redux store with the base reducer
export default compose(applyMiddleware(...middleware))(createStore)(Reducer);

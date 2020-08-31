import React,{useEffect,useState} from 'react';
import { AsyncStorage} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import {createLogger} from 'redux-logger' 
import { Provider } from 'react-redux';
import { createStore,applyMiddleware, compose} from 'redux';
import Reducer, {Login,isLoggedIn} from 'Reducer';

import AuthNavigation from 'navigation/AuthNavigation';
import AppNavigation from 'navigation/AppNavigation';

export default function App() {
  // create the basic context for the app
  const AppContext = React.createContext({
    language: "EN",
    theme: "light",
    authenticated: false
  });
  // Create the stack (similar to stack trace)
  const Stack = createStackNavigator();
  // Add logging if in development mode
  const middleware = [];
  if (process.env.NODE_ENV === `development`) {
    const logger = createLogger({
      level : 'log'
    })
    middleware.push(logger);
  }
  // create the Redux store with the base reducer
  const store = compose(applyMiddleware(...middleware))(createStore)(Reducer);

  const SwitchNavigator = createSwitchNavigator(
    {
      Auth: AuthNavigation,
      App: AppNavigation
    },
    {
      initialRouteName: 'Auth'
    }
  )
  const AppContainer = createAppContainer(SwitchNavigator);
  return (
    <AppContext.Provider value={{
      "language" : 'EN',
      "theme" : "light",
      "authenticated" : false,
    }}>
      <Provider store={store}>
        <AppContainer>
        </AppContainer>
      </Provider>
    </AppContext.Provider>
  );
}

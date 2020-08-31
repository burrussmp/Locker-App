import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';

import store from 'store/index';
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

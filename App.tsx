/* eslint-disable node/no-unpublished-require */

import React from 'react';
import {Provider} from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import {useFonts} from 'expo-font';

import store from 'store/index';
import AppContainer from 'navigation/index';

export default function App() {
  const AppContext = React.createContext({
    language: 'EN',
    theme: 'light',
    authenticated: false,
  });
  const [fontsLoaded] = useFonts({
    CircularBlack: require('/assets/fonts/CircularStd-Black.otf'),
    CircularBook: require('/assets/fonts/CircularStd-Book.otf'),
  });
  if (!fontsLoaded) {
    SplashScreen.preventAutoHideAsync();
  } else {
    SplashScreen.hideAsync();
  }
  return (
    <AppContext.Provider
      value={{
        language: 'EN',
        theme: 'light',
        authenticated: false,
      }}
    >
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </AppContext.Provider>
  );
}

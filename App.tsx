/* eslint-disable node/no-unpublished-require */

import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import SplashScreen from 'screens/Splash';
import * as Font from 'expo-font';
import store from 'store/index';
import AppContainer from 'navigation/index';

const App = () => {
  const AppContext = React.createContext({
    language: 'EN',
    theme: 'light',
    authenticated: false,
  });
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await Font.loadAsync({
        CircularBlack: require('/assets/fonts/CircularStd-Black.otf'),
        CircularBook: require('/assets/fonts/CircularStd-Book.otf'),
        CircularMedium: require('/assets/fonts/CircularStd-Medium.otf'),
      });
      setFontLoaded(true);
    })();
  }, []);
  return !fontLoaded ? (
    <SplashScreen />
  ) : (
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
};

export default App;

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/**
 * @desc The main app
 * @author Matthew P. Burruss
 * @date 1/21/2021
 */
import React, { useEffect, useState, FC } from 'react';
import { Provider } from 'react-redux';
import SplashScreen from 'screens/Splash';
import * as Font from 'expo-font';
import store from 'store/index';
import AppContainer from 'navigation/index';

// import fonts
const CircularBlack = require('assets/fonts/CircularStd-Black.otf');
const CircularBook = require('assets/fonts/CircularStd-Book.otf');
const CircularMedium = require('assets/fonts/CircularStd-Medium.otf');

const App: FC = () => {
  const AppContext = React.createContext({
    language: 'EN',
    theme: 'light',
    authenticated: false,
  });
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({ CircularBlack, CircularBook, CircularMedium }).then(() => {
      setFontLoaded(true);
    }).catch(() => {
      setFontLoaded(false);
    });
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

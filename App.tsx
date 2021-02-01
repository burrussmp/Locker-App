/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/**
 * @desc The main app
 * @author Matthew P. Burruss
 * @date 1/21/2021
 */
import React, { useEffect, useState, FC } from 'react';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import store from 'store/index';
import AppContainer from 'screens/index';
import SplashScreen from 'screens/Splash';

// import fonts
import CircularBlack from 'assets/fonts/CircularStd-Black.otf';
import CircularBook from 'assets/fonts/CircularStd-Book.otf';
import CircularMedium from 'assets/fonts/CircularStd-Medium.otf';

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

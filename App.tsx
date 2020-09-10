import React from 'react';
import {Provider} from 'react-redux';
import {useFonts} from 'expo-font';

import store from 'store/index';
import AppContainer from 'navigation/index';

export default function App() {
  const AppContext = React.createContext({
    language: 'EN',
    theme: 'light',
    authenticated: false,
  });
  useFonts({
    'CircularStd': require('/assets/fonts/CircularStd-Black.otf'),
  });
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

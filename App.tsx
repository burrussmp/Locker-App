import React from 'react';
import {Provider} from 'react-redux';

import store from 'store/index';
import AppContainer from 'navigation/index';

export default function App() {
  const AppContext = React.createContext({
    language: 'EN',
    theme: 'light',
    authenticated: false,
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

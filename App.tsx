import React from 'react';
import {Provider} from 'react-redux';
import {useFonts} from 'expo-font';

import store from 'store/index';
import AppContainer from 'navigation/index';

import Amplify from 'aws-amplify';
import {withAuthenticator} from '@aws-amplify/ui-react';

Amplify.configure({
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_ycpAdyf98',
    userPoolWebClientId: 'kjplia9eusjqnbf1hjlv0nc11',
  },
});

function App() {
  const AppContext = React.createContext({
    language: 'EN',
    theme: 'light',
    authenticated: false,
  });
  useFonts({
    CircularStd: require('/assets/fonts/CircularStd-Black.otf'),
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

export default App;
/* eslint-disable node/no-unpublished-require */

import React from 'react';
import {Provider} from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import {useFonts} from 'expo-font';

import store from 'store/index';
import AppContainer from 'navigation/index';

// import Amplify from 'aws-amplify';

// No MFA
// Amplify.configure({
//   Auth: {
//     region: 'us-east-1',
//     userPoolId: 'us-east-1_uzv0nGVUa',
//     userPoolWebClientId: '3fr2io4a9vldqnain9r10pho41',
//   },
// });

// WITH MFA
// Amplify.configure({
//   Auth: {
//     region: 'us-east-1',
//     userPoolId: 'us-east-1_4Tq6zjGDl',
//     userPoolWebClientId: '6up3042bbq4pciuelka6ame3qk',
//   },
// });

function App() {
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

export default App;

import React,{useEffect} from 'react';
import { AsyncStorage} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import logger from 'redux-logger' 
import Login from 'screens/Login';
import Splash from 'screens/Splash';
import Home from 'screens/Home';

import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from 'redux';
import Reducer from 'Reducer';
import compose from 'lodash/fp/compose'

const AppContext = React.createContext({
  language: "EN",
  theme: "light",
  authenticated: false
});


// Create the stack (similar to stack trace)
const Stack = createStackNavigator();
// Add logging

const middleware = [];
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === `development`) {
  middleware.push(logger);
}

const store = compose(applyMiddleware(...middleware))(createStore)(Reducer);

export default function App({ navigation }) {
  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  return (
    <AppContext.Provider value={{
      "language" : 'EN',
      "theme" : "light",
      "authenticated" : false,
    }}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            {state.isLoading ? (
              <Stack.Screen name="Splash" component={Splash} />
            ) : state.userToken == null ? (
              <Stack.Screen name="Login" component={Login}
                options={{
                  title: 'Sign in',
                  animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                }}
              />
            ) : (
              <Stack.Screen name="Home" component={Home} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </AppContext.Provider>
  );
}

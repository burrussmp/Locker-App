import React,{useEffect,dispatch} from 'react';
import { AsyncStorage, Button, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from 'screens/Login';
import Splash from 'screens/Splash';
import Home from 'screens/Home';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Reducer from 'Reducer';


const AppContext = React.createContext({
  language: "EN",
  theme: "light",
  authenticated: false
});


const Stack = createStackNavigator();
const store = createStore(Reducer);

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

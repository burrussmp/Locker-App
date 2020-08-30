import React,{useEffect} from 'react';
import { AsyncStorage} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createLogger} from 'redux-logger' 
import { Provider } from 'react-redux';
import { createStore,applyMiddleware, compose} from 'redux';
import Reducer from 'Reducer';

import Login from 'screens/Login';
import Splash from 'screens/Splash';
import Home from 'screens/Home';


export default function App() {
  const AppContext = React.createContext({
    language: "EN",
    theme: "light",
    authenticated: false
  });
  
  
  // Create the stack (similar to stack trace)
  const Stack = createStackNavigator();
  // Add logging if in development mode
  const middleware = [];
  if (process.env.NODE_ENV === `development`) {
    const logger = createLogger({
      level : 'info'
    })
    middleware.push(logger);
  }
  // create the Redux store with the base reducer
  const store = compose(applyMiddleware(...middleware))(createStore)(Reducer);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
      }
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
              <Stack.Screen name="Login" component={Login}/>
              <Stack.Screen name="Home" component={Home}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </AppContext.Provider>
  );
}

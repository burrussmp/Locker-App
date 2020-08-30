import React,{useEffect,dispatch} from 'react';
import { AsyncStorage, Button, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import config from 'config';

import Login from 'screens/Login';
import Splash from 'screens/Splash';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AuthReducer from 'Reducer';


const AuthContext = React.createContext({
  language: "EN",
  theme: "light",
  authenticated: false
});


const Stack = createStackNavigator();
const store = createStore(AuthReducer);
export default function App({ navigation }) {
  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data : Object) => {
        fetch(`${config.server}/auth/login`,{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
          body: JSON.stringify(data)
        }).then(async res=>{
          if (res.ok){
            return res.json()
          } else {
            throw new Error(JSON.stringify({
              StatusCode : res.status,
              Message: (await res.json()).error
            }))
          }
        }).then(async data=>{
            await AsyncStorage.setItem('userToken',data.token);
            dispatch({ type: 'SIGN_IN', token: data.token });
          })
          .catch(err=>{
            console.log(err);
          })
      },
      signOut: async () => {
        let userToken = await AsyncStorage.getItem("userToken");
        console.log(`Signing out: ${userToken}`);
        await AsyncStorage.setItem("userToken","");
        dispatch({ type: 'SIGN_OUT' })
      },
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={{
      "language" : 'EN',
      "theme" : "light",
      "authenticated" : false,
    }}>
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
            <Stack.Screen name="Home" component={HomeScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

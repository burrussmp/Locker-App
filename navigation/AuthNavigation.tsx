/**
  * @author Matthew P. Burruss
  * @date Aug 2020
  * @desc Stack navigation for authorization (login, registration, reset password, etc.)
*/
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AuthScreen from 'screens/Auth';
import LoginScreen from 'screens/Login';

const AuthStack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <AuthStack.Navigator 
      headerMode='none' 
      initialRouteName='Auth'
      mode='modal'>
        <AuthStack.Screen name='Auth' component={AuthScreen}/>
        <AuthStack.Screen name='Login' component={LoginScreen}/>
    </AuthStack.Navigator>
  );
}

export default AuthNavigation;
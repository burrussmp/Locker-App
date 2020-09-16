/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Stack navigation for authorization (login, registration, reset password, etc.)
 */

import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthScreen from 'screens/Auth';
import LoginScreen from 'screens/Login';
import RegisterScreen from 'screens/Register';

const AuthStack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <AuthStack.Navigator headerMode="none" initialRouteName="Auth" mode="modal">
      <AuthStack.Screen name="Auth" component={AuthScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;

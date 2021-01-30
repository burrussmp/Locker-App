/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Stack navigation for authorization (login, registration, reset password, etc.)
 */

import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from 'screens/Auth/Auth';
import LoginScreen from 'screens/Auth/Login';
import RegisterScreen from 'screens/Register';
import ForgotPasswordScreen from 'screens/Auth/ForgotPassword';
import ResetPasswordScreen from 'screens/Auth/ResetPassword';

import { AuthParamList } from 'types/Navigation/auth.navigation.types';

const AuthStack = createStackNavigator<AuthParamList>();

const AuthNavigation: FC = () => (
  <AuthStack.Navigator headerMode="none" initialRouteName="Auth" mode="modal">
    <AuthStack.Screen name="Auth" component={AuthScreen} />
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen
      name="ForgotPassword"
      component={ForgotPasswordScreen}
    />
    <AuthStack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    <AuthStack.Screen name="Register" component={RegisterScreen} />
  </AuthStack.Navigator>
);

export default AuthNavigation;

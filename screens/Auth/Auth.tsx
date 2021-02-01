/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Stack navigation for authorization (login, registration, reset password, etc.)
 */

import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Landing from 'screens/Auth/Landing/Landing';
import Login from 'screens/Auth/Login/Login';
import Register from 'screens/Auth/Register/Register';
import ForgotPasswordScreen from 'screens/Auth/ForgotPassword/ForgotPassword';
import ResetPassword from 'screens/Auth/ResetPassword/ResetPassword';

import { AuthParamList } from 'types/navigation/auth.navigation.types';

const AuthStack = createStackNavigator<AuthParamList>();

const AuthNavigation: FC = () => (
  <AuthStack.Navigator headerMode="none" initialRouteName="Landing" mode="modal">
    <AuthStack.Screen name="Landing" component={Landing} />
    <AuthStack.Screen name="Login" component={Login} />
    <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <AuthStack.Screen name="ResetPassword" component={ResetPassword} />
    <AuthStack.Screen name="Register" component={Register} />
  </AuthStack.Navigator>
);

export default AuthNavigation;

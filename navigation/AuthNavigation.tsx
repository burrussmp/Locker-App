"use strict";

import { createStackNavigator } from 'react-navigation-stack'

import LoginScreen from 'screens/Login';

const AuthNavigation = createStackNavigator(
    {
      Login: { screen: LoginScreen }
    //   Signup: { screen: Signup }
    },
    {
      initialRouteName: 'Login',
      headerMode: 'none'
    }
)
export default AuthNavigation;
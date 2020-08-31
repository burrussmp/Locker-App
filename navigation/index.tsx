"use strict";

import { createStackNavigator } from '@react-navigation/stack';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
// import { ColorSchemeName } from 'react-native';
// import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
// import NotFoundScreen from 'screens/NotFoundScreen';
import AuthNavigation from 'navigation/AuthNavigation';
import AppNavigation from 'navigation/AppNavigation';

// Create the stack (similar to stack trace)
const Stack = createStackNavigator();

const SwitchNavigator = createSwitchNavigator(
  {
    Auth: AuthNavigation,
    App: AppNavigation
  },
  {
    initialRouteName: 'Auth'
  }
)
export default createAppContainer(SwitchNavigator);

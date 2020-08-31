/**
  * @author Matthew P. Burruss
  * @date Aug 2020
  * @desc Create the app container with all of the stack navigations (App.js imports this)
*/

import { createStackNavigator } from '@react-navigation/stack';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import AuthNavigation from 'navigation/AuthNavigation';
import AppNavigation from 'navigation/AppNavigation';
// import { ColorSchemeName } from 'react-native';
// import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
// import NotFoundScreen from 'screens/NotFoundScreen';



const Stack = createStackNavigator(); // can be used later

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

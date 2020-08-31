/**
  * @author Matthew P. Burruss
  * @date Aug 2020
  * @desc Stack navigation for authorization (login, registration, reset password, etc.)
*/

import { createStackNavigator } from 'react-navigation-stack'
import LoginScreen from 'screens/Login';

const AuthNavigation = createStackNavigator(
    {
      Login: { screen: LoginScreen }
    },
    {
      initialRouteName: 'Login',
      headerMode: 'none'
    }
)

export default AuthNavigation;
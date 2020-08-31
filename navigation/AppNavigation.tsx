/**
  * @author Matthew P. Burruss
  * @date Aug 2020
  * @desc Stack navigation for the main application
*/

import { createStackNavigator } from 'react-navigation-stack'
import Home from 'screens/Home'

const AppNavigation = createStackNavigator(
  {
    Home: { screen: Home }
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none'

  }
)

export default AppNavigation


/**
 * @author Matthew P. Burruss
 * @date 1/21/2021
 * @desc Explore screen (mainly just navigation to other screen)
 */

import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LockerScreen from 'screens/App/Locker/Locker';
import SearchUsers from 'screens/App/Explore/User/SearchUsers';

import { ExploreProp } from 'types/navigation/app.navigation.types';

const ExploreNavigation: FC<ExploreProp> = () => {
  const ExploreNavigator = createStackNavigator();
  return (
    <ExploreNavigator.Navigator headerMode="screen">
      <ExploreNavigator.Screen
        name="SearchUsers"
        component={SearchUsers}
        options={{ headerShown: false }}
      />
      <ExploreNavigator.Screen
        name="FoundUser"
        component={LockerScreen}
        options={{ headerShown: false }}
      />
    </ExploreNavigator.Navigator>
  );
};

export default ExploreNavigation;

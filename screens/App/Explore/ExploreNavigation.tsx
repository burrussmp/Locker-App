/**
 * @author Matthew P. Burruss
 * @date 1/21/2021
 * @desc Explore Navigation
 */

import React, { FC } from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import Locker from 'screens/App/Locker/Locker';
import ExploreLanding from 'screens/App/Explore/ExploreLanding';
import SearchSpecific from 'screens/App/Explore/Search/SearchSpecific';

import { ExploreProp } from 'types/navigation/app.navigation.types';

import { ExploreParamList } from 'types/navigation/explore.navigation.types';

const ExploreNavigation: FC<ExploreProp> = () => {
  const ExploreNavigator = createStackNavigator<ExploreParamList>();
  return (
    <ExploreNavigator.Navigator
      initialRouteName="ExploreLanding"
      headerMode="none"
      screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forNoAnimation }}
    >
      <ExploreNavigator.Screen
        name="ExploreLanding"
        component={ExploreLanding}
        options={{ headerShown: false }}
      />
      <ExploreNavigator.Screen
        name="FoundUser"
        component={Locker}
        options={{ headerShown: false }}
      />
      <ExploreNavigator.Screen
        name="SearchSpecific"
        component={SearchSpecific}
        options={{ headerShown: false }}
      />
    </ExploreNavigator.Navigator>
  );
};

export default ExploreNavigation;

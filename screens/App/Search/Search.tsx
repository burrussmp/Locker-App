/**
 * @author Matthew P. Burruss
 * @date 1/21/2021
 * @desc Search screen (mainly just navigation to other screen)
 */

import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LockerScreen from 'screens/App/Locker/Locker';
import SearchUsers from 'screens/App/Search/UsersList';

import { SearchProp } from 'types/Navigation/app.navigation.types';

import PostDetails from 'common/containers/Post/Post.Details';

const SearchNavigation: FC<SearchProp> = () => {
  const SearchNavigator = createStackNavigator();
  return (
    <SearchNavigator.Navigator headerMode="screen">
      <SearchNavigator.Screen
        name="SearchUsers"
        component={SearchUsers}
        options={{ headerShown: false }}
      />
      <SearchNavigator.Screen
        name="FoundUser"
        component={LockerScreen}
        options={{ headerShown: false }}
      />
      <SearchNavigator.Screen
        name="PostDetails"
        component={PostDetails}
        options={{
          headerShown: false,
          headerTransparent: true,
        }}
      />
    </SearchNavigator.Navigator>
  );
};

export default SearchNavigation;

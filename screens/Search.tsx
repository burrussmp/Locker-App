/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * @author Matthew P. Burruss
 * @date Sep 2020
 * @desc Search screen (mainly just navigation to other screen)
 */

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ProfileScreen from 'screens/Profile';
import SearchUsers from 'containers/Search/Search.Users';

/**
 * @desc The main screen for the search
 */
const SearchNavigation = () => {
  const SearchNavigator = createStackNavigator();
  return (
    <SearchNavigator.Navigator headerMode="screen">
      <SearchNavigator.Screen
        name="SearchUsers"
        component={SearchUsers}
        options={{headerShown: false}}
      />
      <SearchNavigator.Screen
        name="FoundUser"
        children={(props: any) => {
          if (props.route.params && props.route.params.userId) {
            return <ProfileScreen userId={props.route.params.userId} />;
          } else {
            throw 'Error: Navigating to the FoundUser but not userID';
          }
        }}
        options={{headerShown: false}}
      />
    </SearchNavigator.Navigator>
  );
};

export default SearchNavigation;

/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import ProfileOnDisplay from 'components/Profile/Profile.OnDisplay';
import ProfilePosts from 'components/Profile/Profile.Posts';

/**
 * @desc Renders the tab bar navigation below the profile header
 */
const ProfileNavigation = () => {
  const ProfileTopTab = createMaterialTopTabNavigator();
  return (
    <ProfileTopTab.Navigator
      tabBarOptions={{
        activeTintColor: '#0c0b0b',
        inactiveTintColor: '#737373',
        pressOpacity: 1,
        style: {
          borderBottomColor: '#c6b9bb',
          borderBottomWidth: 1,
          backgroundColor: '#f1e4e6ab',
          elevation: 0,
          paddingLeft: 35,
          paddingRight: 35,
        },
        indicatorStyle: {
          backgroundColor: '#000000',
          height: 2,
        },
        labelStyle: {
          fontFamily: 'CircularBlack',
        },
      }}
    >
      <ProfileTopTab.Screen name="On Display" component={ProfileOnDisplay} />
      <ProfileTopTab.Screen name="Posts" component={ProfilePosts} />
    </ProfileTopTab.Navigator>
  );
};

export default ProfileNavigation;

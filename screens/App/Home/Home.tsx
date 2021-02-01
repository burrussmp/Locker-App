/**
 * @author Paul H. Sullivan
 * @date Sep 2020
 * @desc Authorization Screen
 */

import React, { FC } from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import FeedNavigation from 'screens/App/Home/Feed/Feed.Navigation';
import PostDetails from 'screens/App/Home/Feed/Post/Post.Details';

import { HomeParamList } from 'types/Navigation/home.navigation.types';

const Home: FC = () => {
  const HomeNavigator = createStackNavigator<HomeParamList>();
  return (
    <HomeNavigator.Navigator headerMode="screen">
      <HomeNavigator.Screen
        name="Feed"
        component={FeedNavigation}
        options={{
          headerShown: false,
        }}
      />
      <HomeNavigator.Screen
        name="PostDetails"
        component={PostDetails}
        options={{
          headerShown: false,
          headerTransparent: true,
        }}
      />
    </HomeNavigator.Navigator>
  );
};

export default Home;

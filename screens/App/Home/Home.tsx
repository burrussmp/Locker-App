/**
 * @author Paul H. Sullivan
 * @date Sep 2020
 * @desc Authorization Screen
 */

import React, { FC } from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import FeedNavigation from 'screens/App/Home/Feed/Feed.Navigation';
import PostDetails from 'screens/App/Home/PostDetails/PostDetails';

import { HomeParamList } from 'types/navigation/home.navigation.types';

const Home: FC = () => {
  const HomeNavigator = createStackNavigator<HomeParamList>();
  return (
    <HomeNavigator.Navigator initialRouteName="Feed" headerMode="none">
      <HomeNavigator.Screen name="Feed" component={FeedNavigation} />
      <HomeNavigator.Screen name="PostDetails" component={PostDetails} />
    </HomeNavigator.Navigator>
  );
};

export default Home;

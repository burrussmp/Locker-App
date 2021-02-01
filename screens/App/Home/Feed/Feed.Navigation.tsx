/**
 * @author Paul H. Sullivan
 * @date Sep 2020
 * @desc Authorization Screen
 */

import React, { FC } from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import FeedContainer from 'screens/App/Home/Feed/Feed.Container';
import PostDetails from 'components/Post/Post.Expanded';

import { FeedParamList } from 'types/Navigation/feed.navigation.types';

const Feed: FC = () => {
  const FeedNavigator = createStackNavigator<FeedParamList>();
  return (
    <FeedNavigator.Navigator headerMode="screen">
      <FeedNavigator.Screen
        name="Feed"
        component={FeedContainer}
        options={{
          headerShown: false,
        }}
      />
      <FeedNavigator.Screen
        name="PostDetails"
        component={PostDetails}
        options={{
          headerTransparent: true,
        }}
      />
    </FeedNavigator.Navigator>
  );
};

export default Feed;

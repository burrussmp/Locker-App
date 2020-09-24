/**
 * @author Paul H. Sullivan
 * @date Sep 2020
 * @desc Authorization Screen
 */

import * as React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import FeedContainer from 'components/Feed.Container';
import PostExpanded from 'components/Post/Post.Expanded';

const Feed = (props: any) => {
  const FeedNavigator = createStackNavigator();
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
        name="PostExpanded"
        component={PostExpanded}
        options={{
          headerTransparent: true,
        }}
      />
    </FeedNavigator.Navigator>
  );
};

export default Feed;

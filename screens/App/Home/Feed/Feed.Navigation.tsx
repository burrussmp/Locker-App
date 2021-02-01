/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Home screen
 */

import React, { FC } from 'react';
import { View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import FeedTopBar from 'screens/App/Home/Feed/Feed.TopBar';
import FeedContainer from 'screens/App/Home/Feed/Feed.Container';
import SafeArea from 'common/components/SafeArea';

import { FeedParamList } from 'types/navigation/feed.navigation.types';

const TabBarOptions = {
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
    fontSize: 14,
  },
};

const FeedNavigator: FC = () => {
  const FeedTopTab = createMaterialTopTabNavigator<FeedParamList>();
  return (
    <SafeArea>
      <View style={{ flex: 1 }}>
        <FeedTopTab.Navigator tabBar={FeedTopBar} tabBarOptions={TabBarOptions}>
          <FeedTopTab.Screen name="Following" component={FeedContainer} />
          <FeedTopTab.Screen name="For You" component={FeedContainer} />
        </FeedTopTab.Navigator>
      </View>
    </SafeArea>
  );
};

export default FeedNavigator;

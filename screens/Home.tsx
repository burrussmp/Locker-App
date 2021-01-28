/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Home screen
 */

import * as React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TopTabBar from 'components/Navigation.TopTabBar';
import PostSelectors from 'store/selectors/post.selectors';
import Feed from 'screens/Feed';
import SafeArea from 'components/Common/SafeArea';

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
const HomeScreen = (props: any) => {
  const HomeTopTab = createMaterialTopTabNavigator();
  const postIsExpanded = PostSelectors.isExpanded(props.state);

  return (
    <SafeArea
      children={(
        <View style={{ flex: 1 }}>
          <HomeTopTab.Navigator
            tabBar={TopTabBar}
            swipeEnabled={!postIsExpanded}
            tabBarOptions={TabBarOptions}
          >
            <HomeTopTab.Screen name="Following" component={Feed} />
            <HomeTopTab.Screen name="For You" component={Feed} />
          </HomeTopTab.Navigator>
        </View>
      )}
    />
  );
};

const mapStateToProps = (state: any) => ({
  state,
});

export default connect(mapStateToProps, null)(HomeScreen);

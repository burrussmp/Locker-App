/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Home screen
 */

import React, { FC } from 'react';
import { View } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import TopTabBar from 'navigation/components/TopTabBar';
import PostSelectors from 'store/selectors/post.selectors';
import Feed from 'screens/App/Feed';
import SafeArea from 'components/Common/SafeArea';

import { RootState } from 'store/index';
import { HomeParamList } from 'types/Navigation/home.navigation.types';

const mapStateToProps = (state: RootState) => ({
  postState: state.post,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type IProps = PropsFromRedux;

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

const HomeScreen: FC<IProps> = ({ postState }: IProps) => {
  const HomeTopTab = createMaterialTopTabNavigator<HomeParamList>();
  const postIsExpanded = PostSelectors.isExpanded(postState);

  return (
    <SafeArea>
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
    </SafeArea>
  );
};

export default connector(HomeScreen) as FC<IProps>;

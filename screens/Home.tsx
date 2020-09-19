/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Home screen
 */

import * as React from 'react';
import {Fragment} from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import {connect} from 'react-redux';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import TopTabBar from 'components/Navigation.TopTabBar';
import PostSelectors from 'store/selectors/post.selectors';
import Feed from 'screens/Feed';

const HomeScreen = (props: any) => {
  const HomeTopTab = createMaterialTopTabNavigator();
  const postIsExpanded = PostSelectors.isExpanded(props.state);

  return (
    <Fragment>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFFFFF'}} />
      <View style={{flex: 1}}>
        <HomeTopTab.Navigator
          tabBar={TopTabBar}
          swipeEnabled={!postIsExpanded}
          tabBarOptions={{
            activeTintColor: '#000000',
            inactiveTintColor: '#000000',
            pressOpacity: 1,
            style: {
              borderBottomColor: '#000000',
              backgroundColor: 'transparent',
              elevation: 0,
            },
            indicatorStyle: {
              backgroundColor: postIsExpanded ? 'transparent' : '#000000',
              height: 2,
            },
            labelStyle: {
              fontFamily: 'CircularBlack',
            },
          }}
        >
          <HomeTopTab.Screen
            name="Following"
            component={Feed}
            options={{
              tabBarLabel: ({focused}) => (
                <Text
                  style={{
                    fontFamily: focused ? 'CircularBlack' : 'CircularMedium',
                    alignSelf: 'center',
                  }}
                >
                  FOLLOWING
                </Text>
              ),
            }}
          />
          <HomeTopTab.Screen
            name="For You"
            component={Feed}
            options={{
              tabBarLabel: ({focused}) => (
                <Text
                  style={{
                    fontFamily: focused ? 'CircularBlack' : 'CircularMedium',
                    alignSelf: 'center',
                  }}
                >
                  FOR YOU
                </Text>
              ),
            }}
          />
        </HomeTopTab.Navigator>
      </View>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => {
  return {
    state: state,
  };
};

export default connect(mapStateToProps, null)(HomeScreen);

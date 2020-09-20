/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Home screen
 */

import * as React from 'react';
import {Animated, Text, View, Button} from 'react-native';
import {connect} from 'react-redux';

import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
} from '@react-navigation/material-top-tabs';

import AuthActions from 'store/actions/auth.actions';
import HomeSelectors from 'store/selectors/home.selectors';
import PostSelectors from 'store/selectors/post.selectors';

import Feed from 'screens/Feed';

const HomeScreen = (props: any) => {
  const HomeTopTab = createMaterialTopTabNavigator();
  const homeScrollPosition = HomeSelectors.homeScrollTracker(props.state);
  const postIsExpanded = PostSelectors.isExpanded(props.state);

  const TabBar = (props: any) => {
    const headerHeight = homeScrollPosition.interpolate({
      inputRange: [0, 46],
      outputRange: [48, 2],
      extrapolate: 'clamp',
    });
    return (
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          height: headerHeight,
        }}
      >
        <MaterialTopTabBar {...props} />
      </Animated.View>
    );
  };

  const Logout = (props: any) => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button title="LogOut" onPress={async () => {}} />
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={{height: 45}} />
      <HomeTopTab.Navigator
        tabBar={TabBar}
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
          name="Products"
          component={Logout}
          options={{
            tabBarLabel: ({focused}) => (
              <Text
                style={{
                  fontFamily: focused ? 'CircularBlack' : 'CircularMedium',
                  alignSelf: 'center',
                }}
              >
                PRODUCTS
              </Text>
            ),
          }}
        />
        <HomeTopTab.Screen
          name="Styles"
          component={Feed}
          options={{
            tabBarLabel: ({focused}) => (
              <Text
                style={{
                  fontFamily: focused ? 'CircularBlack' : 'CircularMedium',
                  alignSelf: 'center',
                }}
              >
                STYLES
              </Text>
            ),
          }}
        />
      </HomeTopTab.Navigator>
    </View>
  );
};

const mapStateToProps = (state: any) => {
  return {
    state: state,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    Logout: () => {
      dispatch(AuthActions.Logout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Home screen
 */

import React, {useRef, createRef} from 'react';
import {
  Animated,
  Easing,
  Alert,
  Text,
  View,
  Button,
  SafeAreaView,
  ScrollView,
  NativeEventEmitter,
} from 'react-native';
import {BlurView} from 'expo-blur';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
} from '@react-navigation/material-top-tabs';

import AuthActions from 'store/actions/auth.actions';
import HomeSelectors from 'store/selectors/home.selectors';
import Post from 'components/Post.tsx';

import Feed from 'screens/Feed';

import api from 'api/api';
import styles from 'styles/styles';

const headerMax = 48;
const headerMin = 2;
const headerScroll = 46;

const HomeScreen = (props: any) => {
  const HomeTopTab = createMaterialTopTabNavigator();
  const homeScrollPosition = HomeSelectors.homeScrollTracker(props.state);
  const headerHeight = homeScrollPosition.interpolate({
    inputRange: [0, 46],
    outputRange: [48, 2],
    extrapolate: 'clamp',
  });

  const TabBar = (props: any) => {
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

  const Logout = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button
          title="LogOut"
          onPress={async () =>
            api
              .Logout()
              .then(() => {
                props.Logout();
              })
              .catch(err => {
                console.log(err);
              })
          }
        />
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={{height: 45}} />
      <HomeTopTab.Navigator
        tabBar={TabBar}
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
            backgroundColor: '#000000',
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
import {connect} from 'react-redux';
import {SafeAreaConsumer} from 'react-native-safe-area-context';
import Layout from 'constants/Layout';
import {EACCES} from 'constants';
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

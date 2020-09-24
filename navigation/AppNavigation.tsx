/* eslint-disable @typescript-eslint/no-unused-vars */

import * as React from 'react';
import {Image, Platform, KeyboardAvoidingView} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainTabBar from 'components/Navigation.MainTabBar';
import icons from 'icons/icons';

import NotificationScreen from 'screens/Notifications';
import HomeScreen from 'screens/Home';
import ProfileScreen from 'screens/Profile';
import SearchScreen from 'screens/Search';
import authSelectors from 'store/selectors/auth.selectors';

const AppNavigation = () => {
  const myID = authSelectors.getMyID();
  const BottomTab = createBottomTabNavigator();
  if (!myID) {
    throw 'Error; Cannot see the app without being logged in';
  }
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? -100 : 20}
      enabled={Platform.OS === 'ios' ? true : false}
    >
      <BottomTab.Navigator
        initialRouteName="Home"
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        tabBar={MainTabBar}
        tabBarOptions={{
          activeTintColor: '#000000',
          inactiveTintColor: '#000000',
          showLabel: false,
          style: {
            borderOpacity: 0,
            borderTopColor: '#000000',
            backgroundColor:
              Platform.OS === 'ios' ? 'transparent' : '#ffffffee',
            elevation: 0,
          },
        }}
      >
        <BottomTab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({focused}) => (
              <Image
                source={focused ? icons.home.focused : icons.home.unfocused}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({focused}) => (
              <Image
                source={focused ? icons.search.focused : icons.search.unfocused}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="Locker"
          component={NotificationScreen}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({focused}) => (
              <Image
                source={focused ? icons.locker.focused : icons.locker.unfocused}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="Cart"
          component={NotificationScreen}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({focused}) => (
              <Image
                source={focused ? icons.cart.focused : icons.cart.unfocused}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="Profile"
          children={() => <ProfileScreen userId={myID} />}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({focused}) => (
              <Image
                source={
                  focused ? icons.profile.focused : icons.profile.unfocused
                }
              />
            ),
          }}
        />
      </BottomTab.Navigator>
    </KeyboardAvoidingView>
  );
};

export default AppNavigation;

/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { FC } from 'react';
import { Image, Platform, KeyboardAvoidingView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainTabBar from 'components/Navigation.MainTabBar';
import icons from 'icons/icons';

import CartScreen from 'screens/Cart';
import HomeScreen from 'screens/Home';
import ProfileScreen from 'screens/Profile';
import SearchScreen from 'screens/Search';
import authSelectors from 'store/selectors/auth.selectors';

import { AppParamList } from 'types/Navigation/app.navigation.types';

const AppNavigation: FC = () => {
  const myID = authSelectors.getMyID();
  const BottomTab = createBottomTabNavigator<AppParamList>();
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? -100 : 20}
      enabled={Platform.OS === 'ios'}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? icons.home.focused : icons.home.unfocused}
            />
          ),
        }}
      />
      <BottomTab.Navigator
        initialRouteName="Search"
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
          name="Search"
          component={SearchScreen}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ focused }: {focused: boolean}) => (
              <Image source={focused ? icons.search.focused : icons.search.unfocused} />
            ),
          }}
        />
        <BottomTab.Screen
          name="Locker"
          component={CartScreen}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ focused }: {focused: boolean}) => (
              <Image source={focused ? icons.locker.focused : icons.locker.unfocused} />
            ),
          }}
        />
        <BottomTab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ focused }: {focused: boolean}) => (
              <Image source={focused ? icons.cart.focused : icons.cart.unfocused} />
            ),
          }}
        />
      </BottomTab.Navigator>
    </KeyboardAvoidingView>
  );
};

export default AppNavigation;

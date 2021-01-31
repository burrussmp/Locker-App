import React, { FC } from 'react';
import { Image, Platform, KeyboardAvoidingView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import icons from 'icons/icons';

import CartScreen from 'screens/App/Cart/Cart';
import HomeScreen from 'screens/App/Home/Home';
import LockerScreen from 'screens/App/Locker/Locker';
import SavingsScreen from 'screens/App/Savings/Savings';
import SearchScreen from 'screens/App/Search/Search';

import MainTabBar from 'navigation/components/MainTabBar';

import { AppParamList } from 'types/Navigation/app.navigation.types';

const AppNavigation: FC = () => {
  const BottomTab = createBottomTabNavigator<AppParamList>();
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? -100 : 20}
      enabled={Platform.OS === 'ios'}
    >
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
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ focused }: {focused: boolean}) => (
              <Image source={focused ? icons.home.focused : icons.home.unfocused} />
            ),
          }}
        />
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
          component={LockerScreen}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ focused }: {focused: boolean}) => (
              <Image source={focused ? icons.locker.focused : icons.locker.unfocused} />
            ),
          }}
        />
        <BottomTab.Screen
          name="Savings"
          component={SavingsScreen}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ focused }: {focused: boolean}) => (
              <Image source={focused ? icons.savings.focused : icons.savings.unfocused} />
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

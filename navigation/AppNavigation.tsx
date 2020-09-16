/* eslint-disable @typescript-eslint/no-unused-vars */

import * as React from 'react';
import {Button, Text, Image, View} from 'react-native';
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {connect} from 'react-redux';
import HomeScreen from 'screens/Home';
import NotificationScreen from 'screens/Notifications';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import styles from 'styles/styles';
import {BlurView} from 'expo-blur';
import {Avatar} from 'react-native-elements';
import AuthActions from 'store/actions/auth.actions';
import api from 'api/api';
import icons from 'icons/icons';

const ProfileTopTab = createMaterialTopTabNavigator();

const ProfileOnDisplay = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>ON DISPLAY!</Text>
    </View>
  );
};
const ProfilePosts = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>ON DISPLAY!</Text>
    </View>
  );
};

const ProfileStylePosts = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>ON DISPLAY!</Text>
    </View>
  );
};

function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <View style={styles.profileBioView}>
          <Text style={styles.profileName}>Paula Sullivan</Text>
          <Text style={styles.profileLiner}>100 Followers • 150 Following</Text>
          <Text style={styles.profileHandle}>@paula_sullivan</Text>
        </View>
        <View style={styles.avatarPhoto}>
          <Avatar
            size="large"
            rounded
            source={{
              uri:
                'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            }}
            onPress={() => {
              console.log('avatar pressed');
            }}
          />
        </View>
      </View>
      <ProfileTopTab.Navigator>
        <ProfileTopTab.Screen name="On Display" component={ProfileOnDisplay} />
        <ProfileTopTab.Screen name="Posts" component={ProfilePosts} />
        <ProfileTopTab.Screen name="Style" component={ProfileStylePosts} />
      </ProfileTopTab.Navigator>
    </View>
  );
}

const TabBar = (props: any) => {
  return (
    <BlurView
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      }}
      tint="default"
      intensity={100}
    >
      <BottomTabBar {...props} />
    </BlurView>
  );
};

const BottomTab = createBottomTabNavigator();

const AppNavigation = (props: any) => {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBar={TabBar}
      tabBarOptions={{
        activeTintColor: '#000000',
        inactiveTintColor: '#000000',
        showLabel: false,
        style: {
          borderOpacity: 0,
          borderTopColor: '#000000',
          backgroundColor: 'transparent',
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
        component={NotificationScreen}
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
        component={Profile}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <Image
              source={focused ? icons.profile.focused : icons.profile.unfocused}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default AppNavigation;

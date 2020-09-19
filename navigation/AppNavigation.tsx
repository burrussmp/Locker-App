/* eslint-disable @typescript-eslint/no-unused-vars */

import * as React from 'react';
import {Text, Image, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from 'screens/Home';
import NotificationScreen from 'screens/Notifications';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import styles from 'styles/styles';
import {Avatar} from 'react-native-elements';

import MainTabBar from 'components/Navigation.MainTabBar';
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

const BottomTab = createBottomTabNavigator();

const AppNavigation = (props: any) => {
  return (
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

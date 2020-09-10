import * as React from 'react';
import {Text, Image, View} from 'react-native';
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import HomeScreen from 'screens/Home';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import styles from 'styles/styles';
import {BlurView} from 'expo-blur';
import {Avatar} from 'react-native-elements';

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

function Notifications() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Notifications!</Text>
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

const AppNavigation = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBar={TabBar}
      tabBarOptions={{
        activeTintColor: '#000000',
        inactiveTintColor: '#000000',
        showLabel: false,
        style: {
          borderTopColor: '#666666',
          backgroundColor: 'transparent',
        },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={focused ? icons.home.focused : icons.home.unfocused}
              style={styles.tabBarIcon}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={Notifications}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={focused ? icons.search.focused : icons.search.unfocused}
              style={styles.tabBarIcon}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Locker"
        component={Notifications}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={focused ? icons.locker.focused : icons.locker.unfocused}
              style={styles.tabBarIcon}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Cart"
        component={Notifications}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={focused ? icons.cart.focused : icons.cart.unfocused}
              style={styles.tabBarIcon}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={focused ? icons.profile.focused : icons.profile.unfocused}
              style={styles.tabBarIcon}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default AppNavigation;

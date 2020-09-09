import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from 'screens/Home';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import styles from 'styles/styles';


import { Avatar} from 'react-native-elements';
const ProfileTopTab = createMaterialTopTabNavigator();
const ProfileOnDisplay = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>ON DISPLAY!</Text>
    </View>
  );
}
const ProfilePosts = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>ON DISPLAY!</Text>
    </View>
  );
}

const ProfileStylePosts = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>ON DISPLAY!</Text>
    </View>
  );
}

function Profile() {
  return (
    <View style = {styles.container}>
    <View style={styles.avatarContainer}>
        <View style = {styles.profileBioView}>
          <Text style={styles.profileName}>Paula Sullivan</Text>
          <Text style={styles.profileLiner}>100 Followers • 150 Following</Text>
          <Text style={styles.profileHandle}>@paula_sullivan</Text>
        </View>
        <View style={styles.avatarPhoto}>
          <Avatar
            size = "large"
            rounded
            source={{
              uri:
                'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            }}
            onPress={()=>{console.log('avatar pressed')}}
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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications!</Text>
    </View>
  );
}

const BottomTab = createBottomTabNavigator();

const AppNavigation = () => {
  return (
      <BottomTab.Navigator
        initialRouteName="Profile"
        tabBarOptions={{
            activeTintColor: '#000000',
            inactiveTintColor: '#555555',
            style: {
              borderTopWidth: 1,
              borderTopColor: '#aaaaaabb',
              backgroundColor: '#eeeeeebb',
              position:'absolute'
          }
        }}
      >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused, color, size }) => (
            <MaterialCommunityIcons name={focused ? "home" : "home-outline"} color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Explore"
        component={Notifications}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name={focused ? "magnify-minus" : "magnify"} color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Locker"
        component={Notifications}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name={focused ? "alpha-l-circle" : "alpha-l-circle-outline"} color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Shop"
        component={Notifications}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused,color, size }) => (
            <MaterialCommunityIcons name={focused ? "cart" : "cart-outline"} color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name={focused ? "account" : "account-outline"} color={color} size={size} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

export default AppNavigation;
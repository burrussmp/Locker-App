import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {BlurView} from 'expo-blur';
import HomeScreen from 'screens/Home';

function Profile() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile!</Text>
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

const Tab = createBottomTabNavigator();
const AppNavigation = () => {
  return (
    // <BlurView
    //   style={{
    //     position: 'absolute',
    //     bottom: 0,
    //     left: 0,
    //     right: 0,
    //   }}
    //   tint="default"
    //   intensity={100}
    //   >
      <Tab.Navigator
        initialRouteName="Home"
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
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused, color, size }) => (
            <MaterialCommunityIcons name={focused ? "home" : "home-outline"} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Notifications}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name={focused ? "magnify-minus" : "magnify"} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Locker"
        component={Notifications}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name={focused ? "alpha-l-circle" : "alpha-l-circle-outline"} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Shop"
        component={Notifications}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused,color, size }) => (
            <MaterialCommunityIcons name={focused ? "cart" : "cart-outline"} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name={focused ? "account" : "account-outline"} color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
    // </BlurView>
  );
}

export default AppNavigation;
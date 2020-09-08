import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from 'screens/Home';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

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

const BottomTab = createBottomTabNavigator();
const ProfileTopTab = createMaterialTopTabNavigator();

const AppNavigation = () => {
  return (
      <BottomTab.Navigator
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
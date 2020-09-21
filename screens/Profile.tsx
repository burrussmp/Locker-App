'use strict';

import React, {useState, useEffect} from 'react';
import {Text, SafeAreaView, View, StyleSheet} from 'react-native';
import styles from 'styles/styles';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import api from 'api/api';
import authSelectors from 'store/selectors/auth.selectors';
import ProfileHeader from 'components/Profile/Profile.Header';
import ProfileLoading from 'components/Profile/Profile.Loading';
import {UserInfoType} from 'api/user';

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

const ProfileScreen = (props: any) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [avatarURI, setAvatarURI] = useState('' as string);
  const [userInfo, setUserInfo] = useState(undefined as UserInfoType);
  const userId = props.userId;
  const isMyProfile = userId === authSelectors.getMyID();
  useEffect(() => {
    (async () => {
      try {
        await api.Avatar.Get(userId, 'large').then(uri => {
          setAvatarURI(uri as string);
        });
        await api.User.GetByID(userId).then(userInfo => {
          setUserInfo(userInfo as UserInfoType);
        });
        setIsLoaded(true);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return !isLoaded ? (
    <ProfileLoading />
  ) : (
    <SafeAreaView style={styles.droidSafeArea}>
      <ProfileHeader
        isMyProfile={isMyProfile}
        userInfo={userInfo}
        avatarURI={avatarURI}
      />
      <ProfileTopTab.Navigator
        tabBarOptions={{
          activeTintColor: '#0c0b0b',
          inactiveTintColor: '#737373',
          pressOpacity: 1,
          style: {
            borderBottomColor: '#c6b9bb',
            borderBottomWidth: 1,
            backgroundColor: '#f1e4e6ab',
            elevation: 0,
            paddingLeft: 35,
            paddingRight: 35,
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
        <ProfileTopTab.Screen name="On Display" component={ProfileOnDisplay} />
        <ProfileTopTab.Screen name="Posts" component={ProfilePosts} />
        <ProfileTopTab.Screen name="Style" component={ProfileStylePosts} />
      </ProfileTopTab.Navigator>
    </SafeAreaView>
  );
};

export default ProfileScreen;

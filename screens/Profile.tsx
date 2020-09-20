'use strict';

import React, {useEffect, useState} from 'react';
import {Text, Image, View, ImageURISource} from 'react-native';
import styles from 'styles/styles';
import {Avatar} from 'react-native-elements';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import api from 'api/api';
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
  const [avatarURI, setAvatarURI] = useState('');
  const [userInfo, setUserInfo] = useState(undefined as UserInfoType);
  const userId = props.userId;

  useEffect(() => {
    (async () => {
      try {
        const uri = (await api.Avatar.Get(userId, 'large')) as string;
        setAvatarURI(uri);
        const userInfo = (await api.User.GetByID(userId)) as UserInfoType;
        setUserInfo(userInfo);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <View style={styles.profileBioView}>
          <Text style={styles.profileName}>
            {userInfo ? userInfo.first_name : ''}{' '}
            {userInfo ? userInfo.last_name : ''}
          </Text>
          <Text style={styles.profileLiner}>
            {userInfo ? userInfo.followers.length : ''} Followers •{' '}
            {userInfo ? userInfo.following.length : ''} Following
          </Text>
          <Text style={styles.profileHandle}>
            @{userInfo ? userInfo.username : ''}
          </Text>
        </View>
        <View style={styles.avatarPhoto}>
          <Avatar
            size="large"
            rounded
            source={(avatarURI ? {uri: avatarURI} : null) as ImageURISource}
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
};

export default ProfileScreen;

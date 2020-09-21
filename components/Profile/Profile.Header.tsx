/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';
import React, {useState} from 'react';
import {Text, View, ImageURISource, StyleSheet, Platform} from 'react-native';
import {Avatar} from 'react-native-elements';

import services from 'components/Profile/Profile.Services';

import {ProfileHeaderData} from 'components/Profile/Profile.Types';

import styles from 'components/Profile/Profile.Styles';

const ProfileHeader = (props: {data: ProfileHeaderData}) => {
  if (!props.data) {
    throw 'Cannot render Profile Header without data';
  }
  const isMyProfile = props.data.isMyProfile;
  const userInfo = props.data.userInfo;
  const [avatarURI, setAvatarURI] = useState(props.data.avatarURI);
  const ComponentStyles = styles.Header;
  return (
    <View style={ComponentStyles.container}>
      <View style={ComponentStyles.topContainer}>
        <View style={ComponentStyles.infoContainer}>
          <Text style={ComponentStyles.nameText}>
            {userInfo ? `${userInfo.first_name} ${userInfo.last_name}` : ''}
          </Text>
          <Text style={ComponentStyles.followersText}>
            {userInfo
              ? `${userInfo.followers.length} Followers • ${userInfo.following.length} Following`
              : ''}
          </Text>
          <Text style={ComponentStyles.handleText}>
            {userInfo ? `@${userInfo.username}` : ''}
          </Text>
        </View>
        <View style={ComponentStyles.avatarContainer}>
          <Avatar
            size="xlarge"
            rounded
            containerStyle={ComponentStyles.avatarImageContainer}
            source={(avatarURI ? {uri: avatarURI} : null) as ImageURISource}
            onPress={() => {
              if (isMyProfile) {
                services
                  .pickImageFromLibrary()
                  .then(media => {
                    setAvatarURI(media.uri);
                  })
                  .catch(err => {
                    console.log(err);
                  });
              }
            }}
          ></Avatar>
        </View>
      </View>
      <View style={ComponentStyles.bottomContainer}>
        <Text style={ComponentStyles.aboutText}>
          {userInfo && userInfo.about ? `${userInfo.about}` : ''}
        </Text>
      </View>
    </View>
  );
};

export default ProfileHeader;

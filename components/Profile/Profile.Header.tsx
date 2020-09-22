/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';
import React, {useState} from 'react';
import {Text, View, ImageURISource, StyleSheet, Platform} from 'react-native';
import {Avatar} from 'react-native-elements';

import services from 'components/Profile/Profile.Services';
import api from 'api/api';

import {ProfileHeaderData} from 'components/Profile/Profile.Types';

import styles from 'components/Profile/Profile.Styles';

/**
 * @desc Renders the header of the user profile
 * @props The 'data' attribute specifies the avatarURI and userInfo contains from API
 */
const ProfileHeader = (props: {data: ProfileHeaderData}) => {
  if (!props.data) {
    throw 'Cannot render Profile Header without data';
  }
  // props
  const isMyProfile = props.data.isMyProfile;
  const userInfo = props.data.userInfo;
  // state
  const [avatarURI, setAvatarURI] = useState(props.data.avatarURI);
  // variables that depend on state or props
  const followingText = userInfo
    ? `${userInfo.followers.length} Followers • ${userInfo.following.length} Following`
    : '';
  const nameText = userInfo
    ? `${userInfo.first_name} ${userInfo.last_name}`
    : '';
  const handleText = userInfo ? `@${userInfo.username}` : '';
  const aboutText = userInfo ? userInfo.about : '';
  const avatarSource = (avatarURI ? {uri: avatarURI} : null) as ImageURISource;
  // style
  const ComponentStyles = styles.Header;
  /**
   * @desc what happens when the avatar is pressed
   */
  const on_avatar_press = () => {
    if (isMyProfile) {
      services
        .pickImageFromLibrary()
        .then(async media => {
          await api.Avatar.Update(media);
          setAvatarURI(media.uri);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  return (
    <View style={ComponentStyles.container}>
      <View style={ComponentStyles.topContainer}>
        <View style={ComponentStyles.infoContainer}>
          <Text style={ComponentStyles.nameText}>{nameText}</Text>
          <Text style={ComponentStyles.followersText}>{followingText}</Text>
          <Text style={ComponentStyles.handleText}>{handleText}</Text>
        </View>
        <View style={ComponentStyles.avatarContainer}>
          <Avatar
            size="xlarge"
            rounded
            containerStyle={ComponentStyles.avatarImageContainer}
            source={avatarSource}
            onPress={on_avatar_press}
          ></Avatar>
        </View>
      </View>
      <View style={ComponentStyles.bottomContainer}>
        <Text style={ComponentStyles.aboutText}>{aboutText}</Text>
      </View>
    </View>
  );
};

export default ProfileHeader;

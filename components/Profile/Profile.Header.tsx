'use strict';

import React, {useEffect, useState} from 'react';
import {Text, View, ImageURISource, StyleSheet, Platform} from 'react-native';
import {Avatar} from 'react-native-elements';
import * as Permissions from 'expo-permissions';

import api from 'api/api';
import * as ImagePicker from 'expo-image-picker';

import {ProfileHeaderData} from 'components/Profile/Profile.Types';

const borderColor = '#888';

const getPermissionAsync = async () => {
  if (Platform.OS !== 'web') {
    const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      global.alert('Sorry, we need camera roll permissions to make this work!');
    }
  }
};

const ProfileStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginBottom: 15,
    backgroundColor: '#f1f0f0',
  },
  topContainer: {
    height: 'auto',
    paddingTop: 25,
    marginLeft: 35,
    marginRight: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomContainer: {
    marginTop: 10,
    marginLeft: 35,
    marginRight: 35,
    justifyContent: 'space-around',
  },
  infoContainer: {
    flex: 0.9,
    alignSelf: 'center',
  },
  nameText: {
    fontSize: 26,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  followersText: {
    color: '#000',
    fontSize: 14,
    marginBottom: 8,
  },
  handleText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  aboutText: {
    color: '#333',
    fontSize: 14,
    flexWrap: 'wrap',
  },
  avatarContainer: {
    alignSelf: 'flex-start',
  },
  avatarImageContainer: {
    borderWidth: 1,
    borderRightColor: borderColor,
    borderTopColor: borderColor,
    borderBottomColor: borderColor,
    borderLeftColor: borderColor,
    height: 120,
    width: 120,
    borderRadius: 60,
  },
});

type ProfileHeaderProps = {
  data: ProfileHeaderData;
};

const ProfileHeader = (props: ProfileHeaderProps) => {
  if (!props.data) {
    throw 'Cannot render Profile Header without data';
  }
  const isMyProfile = props.data.isMyProfile;
  const userInfo = props.data.userInfo;
  const [avatarURI, setAvatarURI] = useState(props.data.avatarURI);
  const _pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        const media = {
          name: 'profile_photo',
          type: 'image/png',
          uri: result.uri,
        };
        await api.Avatar.Update(media);
        setAvatarURI(result.uri);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={ProfileStyles.container}>
      <View style={ProfileStyles.topContainer}>
        <View style={ProfileStyles.infoContainer}>
          <Text style={ProfileStyles.nameText}>
            {userInfo ? `${userInfo.first_name} ${userInfo.last_name}` : ''}
          </Text>
          <Text style={ProfileStyles.followersText}>
            {userInfo
              ? `${userInfo.followers.length} Followers • ${userInfo.following.length} Following`
              : ''}
          </Text>
          <Text style={ProfileStyles.handleText}>
            {userInfo ? `@${userInfo.username}` : ''}
          </Text>
        </View>
        <View style={ProfileStyles.avatarContainer}>
          <Avatar
            size="xlarge"
            rounded
            containerStyle={ProfileStyles.avatarImageContainer}
            source={(avatarURI ? {uri: avatarURI} : null) as ImageURISource}
            onPress={async () => {
              if (isMyProfile) {
                await getPermissionAsync();
                await _pickImage();
              }
            }}
          ></Avatar>
        </View>
      </View>
      <View style={ProfileStyles.bottomContainer}>
        <Text style={ProfileStyles.aboutText}>
          {userInfo && userInfo.about ? `${userInfo.about}` : ''}
        </Text>
      </View>
    </View>
  );
};

export default ProfileHeader;

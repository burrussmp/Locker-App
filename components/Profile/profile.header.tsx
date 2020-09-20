'use strict';

import React, {useEffect, useState} from 'react';
import {Text, View, ImageURISource, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-elements';

import api from 'api/api';
// import ImagePicker from 'react-native-image-picker';
import {UserInfoType} from 'api/user';

const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const borderColor = '#888';

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

const ProfileHeader = (props: any) => {
  const userId = props.userId;
  const isMyProfile = props.isMyProfile;
  const [avatarURI, setAvatarURI] = useState('');
  const [userInfo, setUserInfo] = useState(undefined as UserInfoType);
  useEffect(() => {
    api.Avatar.Get(userId, 'large')
      .then(uri => {
        setAvatarURI(uri as string);
      })
      .catch(err => {
        console.log(err);
      });
    api.User.GetByID(userId)
      .then(userInfo => {
        setUserInfo(userInfo as UserInfoType);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
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
            onPress={() => {
              // ImagePicker.showImagePicker(options, response => {
              //   console.log('Response = ', response);

              //   if (response.didCancel) {
              //     console.log('User cancelled image picker');
              //   } else if (response.error) {
              //     console.log('ImagePicker Error: ', response.error);
              //   } else if (response.customButton) {
              //     console.log(
              //       'User tapped custom button: ',
              //       response.customButton
              //     );
              //   } else {
              //     setAvatarURI(response.uri);
              //   }
              // });
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

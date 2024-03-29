/**
 * @author Matthew P. Burruss
 * @date 1/27/2021
 * @desc Profile header
*/

import React, { useState, useEffect } from 'react';
import {
  Text, View, Button, TouchableOpacity, Platform,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import Icons from 'react-native-vector-icons/MaterialIcons';

import { useNavigation } from '@react-navigation/native';

import ImageLibrary from 'services/Images/ImageLibrary';
import api from 'api/api';

import { ProfileHeaderData } from 'types/Profile/profile';

import styles from 'styles/Profile/Profile.Styles';
import BlurHashService from 'services/Images/BlurHashDecoder';

/**
 * @desc Renders the header of the user profile
 * @props The 'data' attribute specifies the avatarURI and userInfo contains from API
 */
const ProfileHeader = (props: {data: ProfileHeaderData}) => {
  // props
  const { isMyProfile } = props.data;
  const { userInfo } = props.data;
  // get blur hash
  const { profile_photo } = props.data.userInfo;
  const blur_hash = profile_photo?.blurhash;

  // state
  const [avatarURI, setAvatarURI] = useState('');
  const avatarSource = avatarURI ? { uri: avatarURI } : undefined;
  const navigation = useNavigation();

  // variables that depend on state or props
  const followingText = userInfo
    ? `${userInfo.followers.length} Followers • ${userInfo.following.length} Following`
    : '';
  const nameText = userInfo
    ? `${userInfo.first_name ? userInfo.first_name : ''} ${userInfo.last_name ? userInfo.last_name : ''}`
    : '';
  const handleText = userInfo ? `@${userInfo.username}` : '';
  const aboutText = userInfo ? userInfo.about : '';

  // style
  const ComponentStyles = styles.Header;

  /**
   * @desc what happens when the avatar is pressed
   */

  const on_avatar_press = () => {
    if (isMyProfile) {
      ImageLibrary
        .pickImageFromLibrary()
        .then(async (media) => {
          await api.Avatar.Update(media);
          setAvatarURI(media.uri);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    (async () => {
      const blur_hash_uri = blur_hash
        ? BlurHashService.BlurHashDecoder(blur_hash).getURI()
        : undefined;
      if (blur_hash_uri && Platform.OS === 'android') {
        const resized_uri = await BlurHashService.asyncImageResize(
          blur_hash_uri,
          200,
        );
        setAvatarURI(resized_uri);
      } else if (blur_hash_uri && Platform.OS === 'ios') {
        setAvatarURI(blur_hash_uri);
      }
      const profile_uri = (await api.Avatar.Get(
        userInfo._id,
        'xlarge',
      ));
      setAvatarURI(profile_uri);
    })();
  }, []);
  return (
    <View style={ComponentStyles.container}>
      {!isMyProfile ? (
        <TouchableOpacity
          onPress={navigation.goBack}
          style={{
            marginLeft: 10,
            marginTop: 10,
            width: 200,
            flexDirection: 'row',
            alignContent: 'center',
          }}
        >
          <Icons
            name="arrow-back"
            size={25}
            color="#000"
            style={{
              alignSelf: 'center',
            }}
          />
          <Text
            style={{
              marginLeft: 3,
              alignSelf: 'center',
              fontSize: 20,
              color: '#000',
              fontWeight: 'bold',
            }}
          >
            {`@${userInfo.username}`}
          </Text>
        </TouchableOpacity>
      ) : undefined}
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
          />
        </View>
      </View>
      <View style={ComponentStyles.bottomContainer}>
        <Text style={ComponentStyles.aboutText}>{aboutText}</Text>
      </View>
    </View>
  );
};

export default ProfileHeader;

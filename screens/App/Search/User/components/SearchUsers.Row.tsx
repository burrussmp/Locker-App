/**
 * @author Matthew P. Burruss
 * @date 1/30/2021
 * @desc Component for a single search item
 */

import React, { useState, useEffect, FC } from 'react';
import {
  View, Text, StyleSheet, Alert, ImageSourcePropType,
} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import api, { APIErrorType } from 'api/api';
import { UserSearchResultsType } from 'api/search';

import BlurHashService from 'services/Images/BlurHashDecoder';

import DefaultAvatar from 'assets/images/profile-pic.png';

const SearchItemStyles = StyleSheet.create({
  title: {
    fontFamily: 'CircularBlack',
    color: '#222',
    fontSize: 15,
  },
  subTitle: {
    fontFamily: 'CircularBlack',
    color: '#888',
    fontSize: 12,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
});

type IProps = {
  userSearchResult: UserSearchResultsType[0]
}
const SearchRow: FC<IProps> = ({ userSearchResult }: IProps) => {
  const navigation = useNavigation();
  const [source, setSource] = useState(DefaultAvatar as ImageSourcePropType);
  useEffect(() => {
    let complete = false;
    if (!complete) {
      if (userSearchResult.data.profile_photo && userSearchResult.data.profile_photo.blurhash) {
        const BlurHashDecoder = BlurHashService.BlurHashDecoder(userSearchResult.data.profile_photo.blurhash);
        setSource({ uri: BlurHashDecoder.getURI() });
        const { key } = userSearchResult.data.profile_photo;
        api.S3.getMedia(key, 'large').then((profilePhotoURI) => {
          setSource({ uri: profilePhotoURI });
        }).catch((err: APIErrorType) => {
          Alert.alert(err.error);
        });
      }
      setSource(DefaultAvatar);
    }
    return function cleanup() {
      complete = true;
    };
  }, []);
  const subtitleText = `${userSearchResult.data.first_name || ''} ${userSearchResult.data.last_name || ''}`;
  return (
    <ListItem
      bottomDivider
      onPress={() => {
        navigation.navigate('FoundUser', {
          userId: userSearchResult.data._id,
        });
      }}
    >
      <Avatar rounded size="small" source={source} />
      <View style={SearchItemStyles.rowContainer}>
        <View>
          <Text style={SearchItemStyles.title}>{userSearchResult.data.username}</Text>
          <Text style={SearchItemStyles.subTitle}>{subtitleText}</Text>
        </View>
        <Icon name="ios-arrow-forward" color="tan" size={25} />
      </View>
    </ListItem>
  );
};

export default SearchRow;

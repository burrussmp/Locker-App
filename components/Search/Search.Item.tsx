/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Component for a single search item
 */

import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {SearchResultsType} from 'types/Search/Search.Types';
import BlurHashService from 'services/Images/BlurHashDecoder';
import authSelectors from 'store/selectors/auth.selectors';
import api from 'api/api';
import Icon from 'react-native-vector-icons/Ionicons';
import {profile} from 'console';
const DefaultAvatar = require('assets/images/profile-pic.png');

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

/**
 * @desc A single search item (row in the serach results)
 * @param {SearchResultsType} item
 */
const SearchItem = (props: {item: SearchResultsType}) => {
  if (!props.item) {
    throw 'Received a null object! This should not happen';
  }
  const navigation = useNavigation();

  const item = props.item;
  const username = item.data.username;
  const firstName = item.data.firstName;
  const lastName = item.data.lastName;
  const userId = item.data._id;
  const [source, setSource] = useState(DefaultAvatar);
  useEffect(() => {
    (async () => {
      if (item.data.profile_photo) {
        try {
          const BlurHashDecoder = BlurHashService.BlurHashDecoder(
            item.data.profile_photo.blurhash
          );
          setSource({uri: BlurHashDecoder.getURI()});
          const key = item.data.profile_photo.key;
          const profilePhotoURI = await api.S3.getMedia(key, 'large');
          setSource({uri: profilePhotoURI});
        } catch (err) {
          console.log(err);
        }
      } else {
        setSource(DefaultAvatar);
      }
    })();
  }, []);
  let subtitleText = '';
  subtitleText += firstName ? firstName + ' ' : '';
  subtitleText += lastName ? lastName : '';
  const Subtitle = subtitleText ? (
    <Text style={SearchItemStyles.subTitle}>{subtitleText}</Text>
  ) : undefined;

  return (
    <ListItem
      bottomDivider
      onPress={() => {
        if (userId === authSelectors.getMyID()) {
          navigation.navigate('Profile');
        } else {
          navigation.navigate('FoundUser', {
            userId: userId,
            username: username,
          });
        }
      }}
    >
      <Avatar rounded size={'small'} source={source} />
      <View style={SearchItemStyles.rowContainer}>
        <View>
          <Text style={SearchItemStyles.title}>{username}</Text>
          {Subtitle}
        </View>
        <Icon name="ios-arrow-forward" color="tan" size={25} />
      </View>
    </ListItem>
  );
};

export default SearchItem;

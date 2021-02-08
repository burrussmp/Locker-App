/**
 * @author Matthew P. Burruss
 * @date 1/30/2021
 * @desc A component for a search row
 */

import React, { useState, useEffect, FC } from 'react';
import {
  View, Text, StyleSheet, Alert, ImageSourcePropType,
} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import api, { APIErrorType } from 'api/api';

import BlurHashService from 'services/Images/BlurHashDecoder';

import DefaultAvatar from 'assets/images/profile-pic.png';
import { mediaType } from 'api/S3';

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
  title: string;
  onPress: () => void;
  subTitle?: string;
  media?: mediaType;
}
const SearchRow: FC<IProps> = ({
  title, onPress, subTitle, media,
}: IProps) => {
  const [source, setSource] = useState(DefaultAvatar as ImageSourcePropType);
  useEffect(() => {
    let complete = false;
    if (!complete) {
      if (media) {
        if (media.blurhash) {
          const BlurHashDecoder = BlurHashService.BlurHashDecoder(media.blurhash);
          setSource({ uri: BlurHashDecoder.getURI() });
        }
        api.S3.getMedia(media.key, 'large').then((dataURI) => {
          setSource({ uri: dataURI });
        }).catch((err: APIErrorType) => {
          Alert.alert(err.error);
        });
      }
    }
    return function cleanup() {
      complete = true;
    };
  }, []);
  return (
    <ListItem bottomDivider onPress={onPress}>
      <Avatar rounded size="small" source={source} />
      <View style={SearchItemStyles.rowContainer}>
        <View>
          <Text style={SearchItemStyles.title}>{title}</Text>
          <Text style={SearchItemStyles.subTitle}>{subTitle}</Text>
        </View>
        <Icon name="ios-arrow-forward" color="tan" size={25} />
      </View>
    </ListItem>
  );
};

SearchRow.defaultProps = {
  subTitle: '',
  media: undefined,
};

export default SearchRow;

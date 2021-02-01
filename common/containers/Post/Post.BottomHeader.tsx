/**
 * @author Matthew P. Burruss
 * @date 2/1/2021
 * @desc This is the the component for a basic post
 */

import React, { FC } from 'react';
import {
  Alert, Image, Text, View, StyleSheet,
} from 'react-native';

import { Avatar } from 'react-native-elements';

import { State, TapGestureHandler, TapGestureHandlerStateChangeEvent } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import LikeButton from 'common/components/buttons/LikeButton';
import LockButton from 'common/components/buttons/LockButton';
import icons from 'icons/icons';

type IProps = {
  color?: string;
  author?: string;
  avatar?: {
    uri: string;
  };
};

const PostFeedBottomHeaderStyles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignContent: 'center',
  },
  avatarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 12.5,
    paddingLeft: 17.5,
  },
  avatar: {
    height: 25,
    width: 25,
    borderRadius: 15,
  },
  avatarText: {
    marginLeft: 10,
    fontSize: 12,
  },
  interactionContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 15,
    paddingTop: 10,
  },
});

const PostFeedBottomHeader: FC<IProps> = ({ color, avatar, author }: IProps) => {
  const navigation = useNavigation();

  const onEllipsesTap = (event: TapGestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      navigation.navigate('PostDetails');
    }
  };

  return (
    <View style={[PostFeedBottomHeaderStyles.container, { backgroundColor: color }]}>
      <View style={PostFeedBottomHeaderStyles.avatarContainer}>
        <Avatar
          source={avatar}
          rounded
          containerStyle={PostFeedBottomHeaderStyles.avatar}
          onPress={() => Alert.alert('Avatar pressed.')}
          activeOpacity={0.5}
        />
        <Text style={PostFeedBottomHeaderStyles.avatarText}>
          {author}
        </Text>
      </View>
      <View style={{ paddingTop: 10 }}>
        <TapGestureHandler onHandlerStateChange={onEllipsesTap}>
          <View style={{ alignItems: 'center', paddingTop: 11 }}>
            <Image source={icons.more.more} style={{ opacity: 0.25 }} />
          </View>
        </TapGestureHandler>
      </View>
      <View style={PostFeedBottomHeaderStyles.interactionContainer}>
        <LikeButton style={{ marginEnd: 5 }} />
        <LockButton />
      </View>
    </View>
  );
};

PostFeedBottomHeader.defaultProps = {
  color: '#fff',
  author: '',
  avatar: undefined,
};

export default PostFeedBottomHeader;

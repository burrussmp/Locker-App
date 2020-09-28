import * as React from 'react';
import {Text, View} from 'react-native';
import {Avatar, Divider} from 'react-native-elements';
import LikeButton from './Post.LikeButton';

const PostComment = (props: any) => {
  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
      }}
    >
      <Divider style={{backgroundColor: '#000000', opacity: 0.25}} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Avatar
          rounded
          containerStyle={{
            height: 25,
            width: 25,
            marginRight: 15,
            backgroundColor: '#DDDDDD',
            alignSelf: 'center',
          }}
        />
        <Text style={{paddingVertical: 15, fontSize: 12}}>
          {props.commentData.text}
        </Text>
        <LikeButton size="small" style={{position: 'absolute', right: 0}} />
      </View>
      <Divider style={{backgroundColor: '#000000', opacity: 0.25}} />
    </View>
  );
};

export default PostComment;

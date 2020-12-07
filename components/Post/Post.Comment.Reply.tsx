import api from 'api/api';
import {CommentType} from 'api/comments';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {Avatar, Divider} from 'react-native-elements';
import {FlatList} from 'react-native-gesture-handler';
import LikeButton from './Post.LikeButton';

const PostCommentReply = (props: any) => {
  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
      }}
    >
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
            marginLeft: 20,
            marginRight: 15,
            backgroundColor: '#DDDDDD',
            alignSelf: 'center',
          }}
        />
        <Text style={{paddingVertical: 15, fontSize: 12, paddingRight: 75}}>
          {props.commentReplyData.text}
        </Text>
        <LikeButton size="small" style={{position: 'absolute', right: 0}} />
      </View>
    </View>
  );
};

export default PostCommentReply;

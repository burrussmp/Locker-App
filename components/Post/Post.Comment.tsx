import api from 'api/api';
import {CommentType} from 'api/comments';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {Avatar, Divider} from 'react-native-elements';
import {FlatList} from 'react-native-gesture-handler';
import PostCommentReply from './Post.Comment.Reply';
import LikeButton from './Post.LikeButton';

const PostComment = (props: any) => {
  const [replyData, setReplyData] = useState([] as CommentType[]);
  // Hooks
  useEffect(() => {
    (async () => {
      try {
        const replyData = await api.Comments.ListReplies(props.commentData._id);
        setReplyData(replyData as CommentType[]);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
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
        <Text style={{paddingVertical: 15, fontSize: 12, paddingRight: 75}}>
          {props.commentData.text}
        </Text>
        <LikeButton size="small" style={{position: 'absolute', right: 0}} />
      </View>
      <FlatList
        data={replyData}
        keyExtractor={item => item._id}
        renderItem={({item}) => <PostCommentReply commentReplyData={item} />}
      />
      <Divider style={{backgroundColor: '#000000', opacity: 0.25}} />
    </View>
  );
};

export default PostComment;

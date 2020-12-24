import api from 'api/api';
import {CommentType} from 'api/comments';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import PostComment from './Post.Comment';

const PostCommentContainer = (props: any) => {
  // Extract props
  const id = props.id;
  // State
  const [commentData, setCommentData] = useState([] as CommentType[]);
  // Hooks
  useEffect(() => {
    (async () => {
      try {
        const commentData = await api.Post.Basic.ListComments(id);
        setCommentData(commentData as CommentType[]);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <View style={{padding: 20}}>
      <FlatList
        data={commentData}
        keyExtractor={item => item._id}
        renderItem={({item}) => <PostComment commentData={item} />}
      />
    </View>
  );
};

export default PostCommentContainer;

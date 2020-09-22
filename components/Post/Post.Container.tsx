/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';
// External
import * as React from 'react';
import {useEffect, useState} from 'react';
import {Animated} from 'react-native';
// Services
import api from 'api/api';
// Containers
import PostContent from 'components/Post/Post.Content';
// Types
import {PostData} from 'components/Post/Post.Types';
import PostLoading from 'components/Post/Post.Loading';

interface PostContainerProps {
  index: number;
  id: string;
  scrollY: Animated.Value;
}

/**
 * @desc Makes necessary API calls and handles post loading
 * @props The index and id for the specific post, the scrollY value of the parent feed
 */
const PostContainer: React.FunctionComponent<PostContainerProps> = (
  props: PostContainerProps
) => {
  // Extract props
  const scrollY = props.scrollY;
  // State
  const [isLoaded, setIsLoaded] = useState(false);
  const [postData, setPostData] = useState(null as PostData);
  const [index, setIndex] = useState(props.index);
  // Hooks
  useEffect(() => {
    (async () => {
      try {
        const postInfo = await api.Post.Basic.GetByID(props.id);
        const postMedia = await api.S3.GetMedia(postInfo.content.media.key);
        const userInfo = await api.User.GetByID(postInfo.postedBy);
        const avatarURI = await api.Avatar.Get(userInfo._id, 'small');
        setPostData({
          postInfo: postInfo,
          userInfo: userInfo,
          media: postMedia,
          avatar: avatarURI,
          index: index,
          scrollY: scrollY,
        } as PostData);
        setIsLoaded(true);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return !isLoaded ? (
    <PostLoading index={index} scrollY={scrollY} />
  ) : (
    <PostContent data={postData} />
  );
};

export default PostContainer;

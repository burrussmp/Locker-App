/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';
// External
import * as React from 'react';
import {useEffect, useState} from 'react';
import {Animated} from 'react-native';
// Internal
import PostLoading from 'components/Post/Post.Loading';
import PostTypeHandler from 'components/Post/Post.TypeHandler';
// Services
import api from 'api/api';
// Types
import {PostData} from 'components/Post/Post.Types';

interface PostContainerProps {
  id: string;
  index: number;
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
  const id = props.id;
  const index = props.index;
  const scrollY = props.scrollY;
  // State
  const [isLoaded, setLoaded] = useState(false);
  const [postData, setPostData] = useState(null as PostData);
  // Hooks
  useEffect(() => {
    let isMounted = true;
    api.Post.Basic.GetByID(id)
      .then(postData => {
        if (isMounted)
          setPostData({
            apiResponse: postData,
            index: index,
            scrollY: scrollY,
          } as PostData);
        setLoaded(true);
      })
      .catch(err => console.log(err));
    return () => {
      isMounted = false;
    };
  }, []);

  return !isLoaded ? (
    <PostLoading index={index} scrollY={scrollY} />
  ) : (
    <PostTypeHandler postData={postData} />
  );
};

export default PostContainer;

/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';
// External
import * as React from 'react';
import {useState} from 'react';
import {Animated, View} from 'react-native';
// Services
import api from 'api/api';
// Containers
import PostContent from 'components/Post/Post.Content';
// Types
import {PostData, CONTENT} from 'components/Post/Post.Types';

interface PostTypeHandlerProps {
  postData: PostData;
}

/**
 * @desc Makes necessary API calls and handles post loading
 * @props The index and id for the specific post, the scrollY value of the parent feed
 */
const PostTypeHandler: React.FunctionComponent<PostTypeHandlerProps> = (
  props: PostTypeHandlerProps
) => {
  if (!props.postData) {
    throw 'Cannot pass Post.Type.Handler undefined data';
  }
  // Extract props
  const postData = props.postData;
  const postType = postData.apiResponse.type;
  let renderItem = null;
  // Function
  switch (postType) {
    case CONTENT: {
      renderItem = <PostContent postData={postData} />;
    }
  }
  return <View>{renderItem}</View>;
};

PostTypeHandler.defaultProps = {
  postData: {
    apiResponse: {
      caption: '',
      tags: [],
      _id: '',
      type: '',
      content: {
        price: 0,
        media: {
          key: '',
          mimetype: '',
          blurhash: '',
        },
      },
      postedBy: '',
      createdAt: '',
      updatedAt: '',
      __v: undefined,
    },
    index: 0,
    scrollY: new Animated.Value(0),
  },
};

export default PostTypeHandler;

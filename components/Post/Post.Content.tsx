/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';
// External
import React, {useEffect, useRef, useState} from 'react';
import {View, Animated, Alert} from 'react-native';
// Internal
import PostContentFront from 'components/Post/Post.Content.Front';
import PostContentBack from 'components/Post/Post.Content.Back';
import PostBottomTab from 'components/Post/Post.BottomTab';
// Services
import {flipAnimation} from 'services/animations/PostAnimations';
// Types
import {PostData} from 'components/Post/Post.Types';
// Styles
import styles from 'components/Post/Post.Styles';

/**
 * @desc Renders a content post
 * @props The 'data' attribute specifies the post data to render
 */
const PostContent = (props: {data: PostData}) => {
  if (!props.data) {
    throw 'Cannot render Post without data';
  }
  // Extract props
  const postInfo = props.data.postInfo;
  const userInfo = props.data.userInfo;
  const image = props.data.media;
  const scrollY = props.data.scrollY;
  const index = props.data.index;
  const username = userInfo?.username;
  const avatar = props.data.avatar;
  // Styles
  const ComponentStyles = styles.Content({index: index});
  // State
  const [isFlipped, setFlipped] = useState(false);
  // Hooks
  const rotationDegrees = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    flipAnimation(rotationDegrees, isFlipped);
  }, [isFlipped]);
  // Functions
  const handleFlip = () => {
    setFlipped(prev => !prev);
  };

  return (
    <View style={ComponentStyles.container}>
      <View>
        {/* Change above View to card color */}
        <PostContentBack
          info={postInfo}
          image={image}
          index={index}
          rotationDegrees={rotationDegrees}
          scrollY={scrollY}
          handleFlip={handleFlip}
        />
        <PostContentFront
          image={image}
          index={index}
          rotationDegrees={rotationDegrees}
          scrollY={scrollY}
          handleFlip={handleFlip}
        />
      </View>
      <PostBottomTab
        index={index}
        scrollY={scrollY}
        rotationDegrees={rotationDegrees}
        author={username}
        authorAvatar={avatar}
      />
    </View>
  );
};

export default PostContent;

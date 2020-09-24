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
import api from 'api/api';

interface PostContentProps {
  postData: PostData;
}

/**
 * @desc Renders a content post
 * @props The 'data' attribute specifies the post data to render
 */
const PostContent = (props: {postData: PostData}) => {
  if (!props.postData) {
    throw 'Cannot render Post without data';
  }
  // Extract props
  const info = props.postData.apiResponse;
  const mediaKey = props.postData.apiResponse.content.media.key;
  const scrollY = props.postData.scrollY;
  const index = props.postData.index;
  // Styles
  const ComponentStyles = styles.Content({index: index});
  // State
  const [image, setImage] = useState('');
  const [isFlipped, setFlipped] = useState(false);
  // Hooks
  useEffect(() => {
    (async () => {
      try {
        const imageUri = await api.S3.GetMedia(mediaKey);
        setImage(imageUri);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
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
          info={info}
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
      />
    </View>
  );
};

export default PostContent;

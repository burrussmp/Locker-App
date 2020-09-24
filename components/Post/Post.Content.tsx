/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';
// External
import React, {useEffect, useRef, useState} from 'react';
import {View, Animated, Alert, Platform} from 'react-native';
// Internal
import PostContentFront from 'components/Post/Post.Content.Front';
import PostContentBack from 'components/Post/Post.Content.Back';
import PostBottomTab from 'components/Post/Post.BottomTab';
// Services
import {flipAnimation} from 'services/animations/PostAnimations';
import BlurHashService from 'services/BlurHashDecoder';
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
  const blur_hash = props.postData.apiResponse.content.media.blurhash;
  const bottomTabData = props.postData.apiResponse.postedBy;
  const scrollY = props.postData.scrollY;
  const index = props.postData.index;
  const cardColor = BlurHashService.BlurHashDecoder(blur_hash).getTabColor(10);
  // Styles
  const ComponentStyles = styles.Content({cardColor: cardColor});
  // State
  const [image, setImage] = useState('');
  const [isFlipped, setFlipped] = useState(false);
  // Hooks
  useEffect(() => {
    (async () => {
      const blur_hash_uri = blur_hash
        ? BlurHashService.BlurHashDecoder(blur_hash).getURI()
        : undefined;
      if (blur_hash_uri && Platform.OS === 'android') {
        const resized_uri = await BlurHashService.asyncImageResize(
          blur_hash_uri,
          200
        );
        setImage(resized_uri);
      } else if (blur_hash_uri && Platform.OS === 'ios') {
        setImage(blur_hash_uri);
      }
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
    <View>
      <View style={ComponentStyles.topContainer}>
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
        bottomTabData={bottomTabData}
        cardColor={cardColor}
        index={index}
        scrollY={scrollY}
        rotationDegrees={rotationDegrees}
      />
    </View>
  );
};

export default PostContent;

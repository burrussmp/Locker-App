/**
 * @author Matthew P. Burruss
 * @date 2/1/2021
 * @desc Front of a post.
 */

import React, { FC } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { flipAnimationTransform } from 'services/animations/PostAnimations';

import { PostType } from 'api/post';

const PostFrontStyles = StyleSheet.create({
  container: {
    flex: 1,
    backfaceVisibility: 'hidden',
  },
  heroImage: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
  },
});

type IProps = {
  heroImage: {
    uri: string;
  },
  postData: PostType,
  rotationRef: Animated.Value,
}

const PostFront: FC<IProps> = ({ heroImage, postData, rotationRef }: IProps) => {
  console.log('');
  return (
    <Animated.View style={[PostFrontStyles.container, flipAnimationTransform(rotationRef, true)]}>
      <Animated.Image
        source={heroImage}
        style={PostFrontStyles.heroImage}
      />
    </Animated.View>
  );
};

export default PostFront;

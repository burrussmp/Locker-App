/**
 * @author Matthew P. Burruss
 * @date 2/1/2021
 * @desc Front of a post.
 */

import React, { FC } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { flipAnimationTransform } from 'services/animations/PostAnimations';

const PostFrontStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    backfaceVisibility: 'hidden',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderWidth: 0.25,
    borderColor: '#ccc',
    elevation: 5,
  },
  heroImage: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
});

type IProps = {
  heroImage: {
    uri: string;
  },
  rotationRef: Animated.Value,
}

const PostFront: FC<IProps> = ({ heroImage, rotationRef }: IProps) => {
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

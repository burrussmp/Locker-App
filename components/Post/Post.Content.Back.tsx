/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';
// External
import * as React from 'react';
import {Animated, ImageURISource, Text, View} from 'react-native';
import {Avatar, Divider} from 'react-native-elements';
// Services
import {
  borderTopRadiusAnimationStyle,
  flipAnimationTransform,
  pushOutAnimationTransform,
} from 'services/animations/PostAnimations';
// Type
import {PostType} from 'api/post';
// Styles
import styles from 'components/Post/Post.Styles';
import PostCommentContainer from 'components/Post/Post.Comment.Container';

/**
 * @desc Renders back of a content post
 * @props The information from post container to render along with
 * scroll and rotation animated.value references
 */
const PostContentBack = (props: {
  info: PostType;
  imageSource: ImageURISource;
  index: number;
  rotationDegrees: Animated.Value;
  scrollY: Animated.Value;
  handleFlip(): void;
}) => {
  if (!props.info) {
    throw (
      'Cannot render Post.Content.Back without data\nProps: ' +
      JSON.stringify(props)
    );
  }
  // Styles
  const ComponentStyles = styles.ContentBack;
  // Extract props
  const id = props.info._id;
  const caption = props.info.caption;
  const price = `$${props.info.content.price}`;
  const imageSource = props.imageSource;
  const index = props.index;
  const scrollY = props.scrollY;
  const rotationDegrees = props.rotationDegrees;
  // Animation
  const flipAnimation = flipAnimationTransform(rotationDegrees, false);
  const scrollAnimation = borderTopRadiusAnimationStyle(scrollY, index);
  return (
    <Animated.View
      style={[ComponentStyles.container, flipAnimation, scrollAnimation]}
    >
      <View style={ComponentStyles.headerContainer}>
        <View style={ComponentStyles.captionContainer}>
          <Text style={ComponentStyles.captionText}>{caption}</Text>
          <Text style={ComponentStyles.priceText}>{price}</Text>
        </View>
        <Avatar
          source={imageSource}
          rounded
          containerStyle={ComponentStyles.avatarContainer}
        />
      </View>
      <View style={ComponentStyles.bottomContainer}>
        <Divider style={ComponentStyles.divider} />
        <PostCommentContainer id={id} />
      </View>
    </Animated.View>
  );
};

export default PostContentBack;

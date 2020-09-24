/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';
// External
import * as React from 'react';
import {Animated, Image, Text, View} from 'react-native';
import {Avatar} from 'react-native-elements';
// Internal
import LikeButton from 'components/Post/Post.LikeButton';
import LockButton from 'components/Post/Post.LockButton';
// Services
import {
  borderRadiusAnimationStyle,
  flipAnimationTransform,
  pushOutAnimationTransform,
} from 'services/animations/PostAnimations';
import icons from 'icons/icons';
// Styles
import styles from 'components/Post/Post.Styles';

interface PostBottomTabProps {
  index: number;
  scrollY: Animated.Value;
  rotationDegrees: Animated.Value;
  author: string;
  authorAvatar: string;
}

/**
 * @desc Renders bottom tab of post
 * @props The information from post container to render along with
 * scroll and rotation animated.value references
 */
const PostBottomTab: React.FunctionComponent<PostBottomTabProps> = (
  props: PostBottomTabProps
) => {
  // Styles
  const ComponentStyles = styles.BottomTab(props);
  // Extract props
  const index = props.index;
  const scrollY = props.scrollY;
  const rotationDegrees = props.rotationDegrees;
  const author = props.author;
  const authorAvatar = props.authorAvatar;
  // Animations
  const scrollAnimation = borderRadiusAnimationStyle(scrollY, index);
  const flipAnimation = flipAnimationTransform(rotationDegrees, false);
  return (
    <View>
      <Animated.View style={[ComponentStyles.container, scrollAnimation]}>
        <Animated.View
          style={[
            ComponentStyles.flippedContainer,
            scrollAnimation,
            flipAnimation,
          ]}
        />
        <View style={ComponentStyles.alignmentView}>
          <View style={ComponentStyles.userContainer}>
            <Avatar
              source={{uri: authorAvatar}}
              rounded
              containerStyle={ComponentStyles.avatarContainer}
            />
            <Text style={ComponentStyles.userText}>{author}</Text>
          </View>
          <View style={ComponentStyles.moreContainer}>
            <Image
              source={icons.more.more}
              style={ComponentStyles.moreButton}
            />
          </View>
          <View style={ComponentStyles.reactionContainer}>
            <LikeButton />
            <View style={ComponentStyles.reactionPadding} />
            <LockButton />
          </View>
        </View>
      </Animated.View>
      <Animated.View
        style={[ComponentStyles.containerShadow, scrollAnimation]}
      />
    </View>
  );
};

PostBottomTab.defaultProps = {
  index: 0,
  scrollY: new Animated.Value(0),
  rotationDegrees: new Animated.Value(0),
  author: '',
  authorAvatar: undefined,
};

export default PostBottomTab;

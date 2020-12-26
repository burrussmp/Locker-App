/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';
// External
import * as React from 'react';
import {useRef, useState} from 'react';
import {Animated, View, ViewStyle} from 'react-native';
import {
  State,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
// Services
import {
  likeAnimation,
  likeAnimationTransform,
} from 'services/animations/ReactionAnimations';
import icons from 'icons/icons';

/**
 * @desc Renders a like button
 * @props The 'data' attribute specifies the post data to render
 */
const LikeButton = (props: {size?: string; style?: ViewStyle}) => {
  // Extract props
  const size = props.size || 'large';
  const viewStyle = props.style;
  // State
  const [isLiked, setLiked] = useState(false);
  // Refs
  const scaleRef = useRef(new Animated.Value(1)).current;
  // Functions
  const onSingleTap = (event: TapGestureHandlerGestureEvent) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      handleLike();
    }
  };
  function handleLike() {
    setLiked(prev => !prev);
    likeAnimation(scaleRef);
  }
  const icon =
    size === 'large'
      ? isLiked
        ? icons.like.liked
        : icons.like.unliked
      : isLiked
      ? icons.like.liked_small
      : icons.like.unliked_small;
  return (
    <View style={viewStyle}>
      <TapGestureHandler onHandlerStateChange={onSingleTap}>
        <Animated.Image
          source={icon}
          style={likeAnimationTransform(scaleRef)}
        />
      </TapGestureHandler>
    </View>
  );
};

export default LikeButton;

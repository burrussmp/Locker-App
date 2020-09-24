/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';
// External
import * as React from 'react';
import {useRef, useState} from 'react';
import {Animated, View} from 'react-native';
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
const LikeButton = () => {
  // State
  const [isLiked, setLiked] = useState(false);
  const icon = isLiked ? icons.like.liked : icons.like.unliked;
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
  return (
    <View>
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

/**
 * @author Paul H. Sullivan
 * @date Sep 2020
 * @desc This is the the component for the like button
 */

import * as React from 'react';

import {useEffect, useRef, useState} from 'react';
import {Animated, View} from 'react-native';

import {State, TapGestureHandler} from 'react-native-gesture-handler';

import {
  likeAnimation,
  likeAnimationTransform,
} from 'services/animations/ReactionAnimations';
import icons from 'icons/icons';

const LikeButton: React.FunctionComponent = (props: any) => {
  const [isLiked, setLiked] = useState(false);
  const scaleRef = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    likeAnimation(scaleRef);
  }, [isLiked]);

  const onSingleTap = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      handleLike();
    }
  };

  function handleLike() {
    setLiked(prev => !prev);
  }

  return (
    <View style={props.style}>
      <TapGestureHandler onHandlerStateChange={onSingleTap}>
        <Animated.Image
          source={isLiked ? icons.like.liked : icons.like.unliked}
          style={likeAnimationTransform(scaleRef)}
        />
      </TapGestureHandler>
    </View>
  );
};

export default LikeButton;

/**
 * @author Matthew P. Burruss
 * @date 2/1/2021
 * @desc The like button.
 */

import React, { FC, useRef, useState } from 'react';

import { Animated, View, ViewStyle } from 'react-native';
import { State, TapGestureHandler, TapGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { likeAnimation, likeAnimationTransform } from 'services/animations/ReactionAnimations';
import icons from 'icons/icons';

type IProps = {
  isLiked: boolean;
  size?: string;
  style?: ViewStyle;
  onChange?: (state: boolean) => Promise<void>;
};

const getIcon = (isLiked: boolean, size?: string) => {
  if (size === 'large') {
    return isLiked ? icons.like.liked : icons.like.unliked;
  }
  return isLiked ? icons.like.liked_small : icons.like.unliked_small;
};

const LikeButton: FC<IProps> = ({
  size, style, isLiked, onChange,
}: IProps) => {
  const scaleRef = useRef(new Animated.Value(1)).current;

  const onSingleTap = async (event: TapGestureHandlerGestureEvent) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      likeAnimation(scaleRef);
      if (onChange) {
        await onChange(!isLiked);
      }
    }
  };

  return (
    <View style={style}>
      <TapGestureHandler onHandlerStateChange={onSingleTap}>
        <Animated.Image
          source={getIcon(isLiked, size)}
          style={likeAnimationTransform(scaleRef)}
        />
      </TapGestureHandler>
    </View>
  );
};

LikeButton.defaultProps = {
  size: 'large',
  style: {},
  onChange: undefined,
};

export default LikeButton;

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
  size?: string;
  style?: ViewStyle;
  isLiked?: boolean;
  onChange?: (state: boolean) => void;
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
  const [mIsLiked, setMIsLiked] = useState(Boolean(isLiked));
  const scaleRef = useRef(new Animated.Value(1)).current;

  const onSingleTap = (event: TapGestureHandlerGestureEvent) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setMIsLiked(!mIsLiked);
      likeAnimation(scaleRef);
      if (onChange) {
        onChange(mIsLiked);
      }
    }
  };

  return (
    <View style={style}>
      <TapGestureHandler onHandlerStateChange={onSingleTap}>
        <Animated.Image
          source={getIcon(mIsLiked, size)}
          style={likeAnimationTransform(scaleRef)}
        />
      </TapGestureHandler>
    </View>
  );
};

LikeButton.defaultProps = {
  size: 'large',
  style: {},
  isLiked: false,
  onChange: undefined,
};

export default LikeButton;

/**
 * @author Matthew P. Burruss
 * @date 2/1/2021
 * @desc The lock button.
 */

import React, { FC, useRef } from 'react';

import { Animated, View, ViewStyle } from 'react-native';
import { State, TapGestureHandler, TapGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { lockAnimation, unlockAnimation, lockAnimationTransform } from 'services/animations/ReactionAnimations';
import icons from 'icons/icons';

type IProps = {
  style?: ViewStyle;
  isLocked: boolean;
  onChange: (state: boolean) => void;
};

const LockButton: FC<IProps> = ({ style, isLocked, onChange }: IProps) => {
  const rotationDegreesRef = useRef(new Animated.Value(isLocked ? 90 : 0)).current;

  const onSingleTap = (event: TapGestureHandlerGestureEvent) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      if (!isLocked) {
        lockAnimation(rotationDegreesRef);
      } else {
        unlockAnimation(rotationDegreesRef);
      }
      onChange(isLocked);
    }
  };

  return (
    <View style={style}>
      <TapGestureHandler onHandlerStateChange={onSingleTap}>
        <Animated.Image
          source={isLocked ? icons.lock.locked : icons.lock.unlocked}
          style={lockAnimationTransform(rotationDegreesRef)}
        />
      </TapGestureHandler>
    </View>
  );
};

LockButton.defaultProps = {
  style: {},
};

export default LockButton;

/**
 * @author Matthew P. Burruss
 * @date 2/1/2021
 * @desc The lock button.
 */

import React, { FC, useRef, useState } from 'react';

import { Animated, View, ViewStyle } from 'react-native';
import { State, TapGestureHandler, TapGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { lockAnimation, unlockAnimation, lockAnimationTransform } from 'services/animations/ReactionAnimations';
import icons from 'icons/icons';

type IProps = {
  style?: ViewStyle;
  isLocked?: boolean;
  onChange?: (state: boolean) => void;
};

const LockButton: FC<IProps> = ({ style, isLocked, onChange }: IProps) => {
  const [mIsLocked, setMIsLocked] = useState(Boolean(isLocked));
  const rotationDegreesRef = useRef(new Animated.Value(1)).current;

  const onSingleTap = (event: TapGestureHandlerGestureEvent) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setMIsLocked(!mIsLocked);
      if (mIsLocked) {
        lockAnimation(rotationDegreesRef);
      } else {
        unlockAnimation(rotationDegreesRef);
      }
      if (onChange) {
        onChange(mIsLocked);
      }
    }
  };

  return (
    <View style={style}>
      <TapGestureHandler onHandlerStateChange={onSingleTap}>
        <Animated.Image
          source={mIsLocked ? icons.lock.locked : icons.lock.unlocked}
          style={lockAnimationTransform(rotationDegreesRef)}
        />
      </TapGestureHandler>
    </View>
  );
};

LockButton.defaultProps = {
  style: {},
  isLocked: false,
  onChange: undefined,
};

export default LockButton;

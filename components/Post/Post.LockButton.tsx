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
  lockAnimation,
  lockAnimationTransform,
  unlockAnimation,
} from 'services/animations/ReactionAnimations';
import icons from 'icons/icons';

/**
 * @desc Renders a lock button
 * @props The 'data' attribute specifies the post data to render
 */
const LockButton: React.FunctionComponent = () => {
  // State
  const [isLocked, setLocked] = useState(false);
  const icon = isLocked ? icons.lock.locked : icons.lock.unlocked;
  // Refs
  const rotationDegreesRef = useRef(new Animated.Value(0)).current;
  // Functions
  const onSingleTap = (event: TapGestureHandlerGestureEvent) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      handleLock();
    }
  };
  function handleLock() {
    setLocked(prev => !prev);
    if (isLocked) {
      lockAnimation(rotationDegreesRef);
    } else {
      unlockAnimation(rotationDegreesRef);
    }
  }
  return (
    <View>
      <TapGestureHandler onHandlerStateChange={onSingleTap}>
        <Animated.Image
          source={icon}
          style={lockAnimationTransform(rotationDegreesRef)}
        />
      </TapGestureHandler>
    </View>
  );
};

export default LockButton;

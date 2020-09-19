/**
 * @author Paul H. Sullivan
 * @date Sep 2020
 * @desc This is the the component for the lock button
 */

import * as React from 'react';

import {useEffect, useRef, useState} from 'react';
import {Animated, View} from 'react-native';

import {State, TapGestureHandler} from 'react-native-gesture-handler';

import icons from 'icons/icons';
import {
  lockAnimation,
  lockAnimationTransform,
  unlockAnimation,
} from 'services/animations/ReactionAnimations';

const LockButton: React.FunctionComponent = (props: any) => {
  const [isLocked, setLocked] = useState(false);
  const rotationDegreesRef = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isLocked) {
      lockAnimation(rotationDegreesRef);
    } else {
      unlockAnimation(rotationDegreesRef);
    }
  }, [isLocked]);

  const onSingleTap = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      handleLock();
    }
  };

  function handleLock() {
    setLocked(prev => !prev);
  }

  return (
    <View style={props.style}>
      <TapGestureHandler onHandlerStateChange={onSingleTap}>
        <Animated.Image
          source={isLocked ? icons.lock.locked : icons.lock.unlocked}
          style={lockAnimationTransform(rotationDegreesRef)}
        />
      </TapGestureHandler>
    </View>
  );
};

export default LockButton;

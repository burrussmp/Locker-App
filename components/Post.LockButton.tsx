/**
 * @author Paul H. Sullivan
 * @date Sep 2020
 * @desc This is the the component for the lock button
 */

import * as React from 'react';
import {useEffect, useState} from 'react';
import {Animated, View} from 'react-native';

import {State, TapGestureHandler} from 'react-native-gesture-handler';

import styles from 'styles/styles';
import icons from 'icons/icons';

const LockButton: React.FunctionComponent = (props: any) => {
  const [isLocked, setLocked] = useState(false);
  const [rotationDegrees, setRotationDegrees] = useState(new Animated.Value(0));
  useEffect(() => {
    if (isLocked) {
      rotationDegrees.setValue(-45);
      Animated.spring(rotationDegrees, {
        toValue: 0,
        bounciness: 15,
        speed: 50,
        useNativeDriver: true,
      }).start();
    } else {
      rotationDegrees.setValue(45);
      Animated.spring(rotationDegrees, {
        toValue: 0,
        speed: 50,
        useNativeDriver: true,
      }).start();
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
  const rotationInterpolate = rotationDegrees.interpolate({
    inputRange: [-45, 45],
    outputRange: ['-45deg', '45deg'],
  });
  const rotationTransformAnimation = {
    transform: [{rotate: rotationInterpolate}],
  };
  return (
    <View style={props.style}>
      <TapGestureHandler onHandlerStateChange={onSingleTap}>
        <Animated.Image
          source={isLocked ? icons.lock.locked : icons.lock.unlocked}
          style={rotationTransformAnimation}
        />
      </TapGestureHandler>
    </View>
  );
};

export default LockButton;

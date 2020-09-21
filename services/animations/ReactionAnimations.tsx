import {Animated} from 'react-native';

const likeAnimation = (scale: Animated.Value) => {
  scale.setValue(0.8);
  Animated.spring(scale, {
    toValue: 1,
    friction: 7,
    tension: 200,
    useNativeDriver: true,
  }).start();
};

const likeAnimationTransform = (scale: Animated.Value) => {
  return {
    transform: [{scale: scale}],
  };
};

const lockAnimation = (rotationDegrees: Animated.Value) => {
  rotationDegrees.setValue(45);
  Animated.spring(rotationDegrees, {
    toValue: 0,
    bounciness: 10,
    speed: 50,
    useNativeDriver: true,
  }).start();
};

const unlockAnimation = (rotationDegrees: Animated.Value) => {
  rotationDegrees.setValue(-45);
  Animated.spring(rotationDegrees, {
    toValue: 0,
    bounciness: 10,
    speed: 50,
    useNativeDriver: true,
  }).start();
};

const lockAnimationTransform = (rotationDegrees: Animated.Value) => {
  const rotationInterpolate = rotationDegrees.interpolate({
    inputRange: [-45, 45],
    outputRange: ['-45deg', '45deg'],
  });
  return {
    transform: [{rotate: rotationInterpolate}],
  };
};

export {
  likeAnimation,
  likeAnimationTransform,
  lockAnimation,
  unlockAnimation,
  lockAnimationTransform,
};

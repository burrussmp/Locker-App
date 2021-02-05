import { Animated } from 'react-native';

const likeAnimation = (scale: Animated.Value) => {
  scale.setValue(0.8);
  Animated.spring(scale, {
    toValue: 1,
    friction: 7,
    tension: 200,
    useNativeDriver: true,
  }).start();
};

const likeAnimationTransform = (scale: Animated.Value) => ({
  transform: [{ scale }],
});

const lockAnimation = (rotationDegrees: Animated.Value, callback? : () => void) => {
  Animated.spring(rotationDegrees, {
    toValue: 90,
    bounciness: 10,
    speed: 50,
    useNativeDriver: true,
  }).start(callback);
};

const unlockAnimation = (rotationDegrees: Animated.Value, callback? : () => void) => {
  Animated.spring(rotationDegrees, {
    toValue: 0,
    bounciness: 10,
    speed: 50,
    useNativeDriver: true,
  }).start(callback);
};

const lockAnimationTransform = (rotationDegrees: Animated.Value) => {
  const rotationInterpolate = rotationDegrees.interpolate({
    inputRange: [0, 90],
    outputRange: ['0deg', '90deg'],
  });
  return {
    transform: [{ rotate: rotationInterpolate }],
  };
};

export {
  likeAnimation,
  likeAnimationTransform,
  lockAnimation,
  unlockAnimation,
  lockAnimationTransform,
};

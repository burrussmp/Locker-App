import {Animated} from 'react-native';

const flipAnimation = (rotationDegrees: Animated.Value, isFlipped: boolean) => {
  if (isFlipped) {
    Animated.spring(rotationDegrees, {
      toValue: 180,
      friction: 6,
      useNativeDriver: true,
    }).start();
  } else {
    Animated.spring(rotationDegrees, {
      toValue: 0,
      friction: 6,
      useNativeDriver: true,
    }).start();
  }
};

const flipAnimationTransform = (
  rotationDegrees: Animated.Value,
  isFlipped: boolean
) => {
  const flipInterpolate = rotationDegrees.interpolate({
    inputRange: [0, 180],
    outputRange: isFlipped ? ['0deg', '180deg'] : ['180deg', '360deg'],
  });
  return {
    transform: [{rotateY: flipInterpolate}],
  };
};

const borderRadiusAnimationStyle = (scrollY: Animated.Value, index: number) => {
  const borderRadiusInterpolate = scrollY.interpolate({
    inputRange: [index * 500, index * 500 + 550 * 0.4, index * 500 + 550 * 0.8],
    outputRange: [25, 25, 1],
    extrapolate: 'clamp',
  });
  return {
    borderBottomLeftRadius: borderRadiusInterpolate,
    borderBottomRightRadius: borderRadiusInterpolate,
  };
};

const pushOutAnimationTransform = (scrollY: Animated.Value, index: number) => {
  const pushOutInterpolate = scrollY.interpolate({
    inputRange: [index * 500, index * 500 + 550 * 0.4, index * 500 + 550 * 0.8],
    outputRange: [0, 0, -50],
    extrapolate: 'clamp',
  });
  return {transform: [{translateY: pushOutInterpolate}]};
};

export {
  flipAnimation,
  borderRadiusAnimationStyle,
  pushOutAnimationTransform,
  flipAnimationTransform,
};

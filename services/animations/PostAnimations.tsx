/**
 * @author Paul Sullivan
 * @date 2/2/2021
 * @desc Animation styles.
 */

import { Animated, ViewStyle } from 'react-native';

const flipAnimation = (rotationDegrees: Animated.Value, isFront: boolean): void => {
  Animated.spring(rotationDegrees, {
    toValue: isFront ? 180 : 0,
    friction: 6,
    useNativeDriver: true,
  }).start();
};

const flipAnimationTransform = (rotationDegrees: Animated.Value, isFront: boolean): Animated.WithAnimatedValue<ViewStyle> => {
  const flipInterpolate = rotationDegrees.interpolate({
    inputRange: [0, 180],
    outputRange: isFront ? ['0deg', '180deg'] : ['180deg', '360deg'],
  });
  return {
    transform: [{ rotateY: flipInterpolate }],
  };
};

const borderRadiusAnimationStyle = (scrollY: Animated.Value, index: number): Animated.WithAnimatedValue<ViewStyle> => {
  const borderRadiusInterpolate = scrollY.interpolate({
    inputRange: [index * 500, index * 500 + 550 * 0.4, index * 500 + 550 * 0.8],
    outputRange: [25, 25, 25],
    extrapolate: 'clamp',
  });
  return {
    borderBottomLeftRadius: borderRadiusInterpolate,
    borderBottomRightRadius: borderRadiusInterpolate,
  };
};

const borderTopRadiusAnimationStyle = (scrollY: Animated.Value, index: number): Animated.WithAnimatedValue<ViewStyle> => {
  const borderRadiusInterpolate = scrollY.interpolate({
    inputRange: [index * 500, index * 500 + 550 * 0.4, index * 500 + 550 * 0.8],
    outputRange: [25, 25, 25],
    extrapolate: 'clamp',
  });
  return {
    borderTopLeftRadius: borderRadiusInterpolate,
    borderTopRightRadius: borderRadiusInterpolate,
  };
};

const pushOutAnimationTransform = (scrollY: Animated.Value, index: number): Animated.WithAnimatedValue<ViewStyle> => {
  const pushOutInterpolate = scrollY.interpolate({
    inputRange: [index * 500, index * 500 + 550 * 0.4, index * 500 + 550 * 0.8],
    outputRange: [0, 0, -50],
    extrapolate: 'clamp',
  });
  return { transform: [{ translateY: pushOutInterpolate }] };
};

export {
  flipAnimation,
  borderRadiusAnimationStyle,
  borderTopRadiusAnimationStyle,
  pushOutAnimationTransform,
  flipAnimationTransform,
};

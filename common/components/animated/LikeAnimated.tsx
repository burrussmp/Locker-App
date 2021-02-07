/**
 * @author Matthew P. Burruss
 * @date 2/1/2021
 * @desc The like button.
 */

import React, { FC, useRef, useEffect } from 'react';

import { Animated } from 'react-native';
import icons from 'icons/icons';

type IProps = {
  onComplete: () => void;
}

const AnimatedLike: FC<IProps> = ({ onComplete }: IProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const sizeAnim = useRef(new Animated.Value(0)).current;

  const startDuration = 500;
  const endDuration = 400;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: startDuration,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: endDuration,
        useNativeDriver: true,
      }).start(() => {
        onComplete();
      });
    });
    Animated.timing(sizeAnim, {
      toValue: 1,
      duration: startDuration,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(sizeAnim, {
        toValue: 0,
        duration: endDuration,
        useNativeDriver: true,
      }).start();
    });
  }, []);

  const sizeInterpolation = {
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  };
  return (
    <Animated.View
      style={{
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        margin: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Animated.Image
        source={icons.like.liked}
        style={{
          opacity: fadeAnim,
          position: 'absolute',
          margin: 'auto',
          width: '50%',
          height: '50%',
          tintColor: '#000',
          transform: [
            {
              scaleX: sizeAnim.interpolate(sizeInterpolation),
            },
            {
              scaleY: sizeAnim.interpolate(sizeInterpolation),
            },
          ],
        }}
      />
    </Animated.View>
  );
};

export default AnimatedLike;

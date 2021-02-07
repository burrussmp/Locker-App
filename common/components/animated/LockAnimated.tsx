/**
 * @author Matthew P. Burruss
 * @date 2/1/2021
 * @desc The lock animation for posts.
 */

import React, { FC, useRef, useEffect } from 'react';

import { Animated, StyleSheet } from 'react-native';
import icons from 'icons/icons';

import { lockAnimationTransform } from 'services/animations/ReactionAnimations';

const AnimatedLockStyles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
    margin: 'auto',
    width: '50%',
    height: '50%',
    tintColor: '#000',
  },
});

type IProps = {
  onComplete: () => void;
}

const AnimatedLock: FC<IProps> = ({ onComplete }: IProps) => {
  const rotationDegreesRef = useRef(new Animated.Value(0)).current;
  const fadeLock = useRef(new Animated.Value(0)).current;
  const fadeUnLock = useRef(new Animated.Value(0)).current;
  // const sizeAnim = useRef(new Animated.Value(0)).current;

  const startDuration = 250;
  const rotateDuration = 400;
  const holdDuration = 250;
  const endDuration = 200;

  useEffect(() => {
    // make unlock button appear
    Animated.timing(fadeUnLock, {
      toValue: 1,
      duration: startDuration,
      useNativeDriver: true,
    }).start(() => {
      // rotate unlock button and lock button;
      Animated.timing(rotationDegreesRef, {
        toValue: 90,
        duration: rotateDuration,
        useNativeDriver: true,
      }).start();
      // begin fading out unlock button and fading in lock button
      Animated.timing(fadeUnLock, {
        toValue: 0,
        duration: rotateDuration,
        useNativeDriver: true,
      }).start();
      // begin fading out unlock button
      Animated.timing(fadeLock, {
        toValue: 1,
        duration: rotateDuration,
        useNativeDriver: true,
      }).start(() => {
        // hold the lock for some time and then fade out
        setTimeout(() => {
          Animated.timing(fadeLock, {
            toValue: 0,
            duration: endDuration,
            useNativeDriver: true,
          }).start(() => {
            onComplete();
          });
        }, holdDuration);
      });
    });
  }, []);

  return (
    <>
      <Animated.View style={AnimatedLockStyles.container}>
        <Animated.Image
          source={icons.lock.locked}
          style={[AnimatedLockStyles.icon, lockAnimationTransform(rotationDegreesRef), { opacity: fadeLock }]}
        />
      </Animated.View>
      <Animated.View style={AnimatedLockStyles.container}>
        <Animated.Image
          source={icons.lock.unlocked}
          style={[AnimatedLockStyles.icon, lockAnimationTransform(rotationDegreesRef), { opacity: fadeUnLock }]}
        />
      </Animated.View>
    </>
  );
};

export default AnimatedLock;

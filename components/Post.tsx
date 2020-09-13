import {ALL} from 'dns';
/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * @author Paul H. Sullivan
 * @date Sep 2020
 * @desc This is the the component for a basic post
 */

import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  LongPressGestureHandler,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import {color} from 'react-native-reanimated';
import {start} from 'repl';

import styles from 'styles/styles';

interface PostProps {
  index: number;
  scrollY: Animated.Value;
}

const Post: React.FunctionComponent<PostProps> = (props: PostProps) => {
  const [isFlipped, setFlipped] = useState(false);
  const [rotationDegrees, setRotationDegrees] = useState(new Animated.Value(0));
  const doubleTapRef = useRef(null);

  const onSingleTap = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      handleFlip();
    }
  };

  const onDoubleTap = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      Alert.alert('NiceNice');
    }
  };

  function handleFlip() {
    setFlipped(prev => !prev);
  }

  useEffect(() => {
    if (!isFlipped) {
      Animated.spring(rotationDegrees, {
        toValue: 0,
        friction: 6,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(rotationDegrees, {
        toValue: 180,
        friction: 6,
        useNativeDriver: true,
      }).start();
    }
  }, [isFlipped]);
  const frontInterpolate = rotationDegrees.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });
  const backInterpolate = rotationDegrees.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });
  const frontTransform = {
    transform: [{rotateY: frontInterpolate}],
  };
  const backTransform = {
    transform: [{rotateY: backInterpolate}],
  };
  return (
    <View style={{zIndex: -props.index, marginTop: -50}}>
      <TapGestureHandler
        onHandlerStateChange={onSingleTap}
        waitFor={doubleTapRef}
      >
        <TapGestureHandler
          ref={doubleTapRef}
          onHandlerStateChange={onDoubleTap}
          numberOfTaps={2}
        >
          <View style={{flex: 1}}>
            <Animated.View
              style={[
                {
                  width: '100%',
                  height: 500,
                  backgroundColor: 'powderblue',
                  backfaceVisibility: 'hidden',
                },
                {
                  transform: [
                    {
                      translateY: translateYAnimated(
                        props.index,
                        props.scrollY
                      ),
                    },
                  ],
                },
                frontTransform,
              ]}
            />
            <Animated.View
              style={[
                {
                  position: 'absolute',
                  width: '100%',
                  height: 500,
                  backgroundColor: 'red',
                  backfaceVisibility: 'hidden',
                },
                {
                  transform: [
                    {
                      translateY: translateYAnimated(
                        props.index,
                        props.scrollY
                      ),
                    },
                  ],
                },
                backTransform,
              ]}
            />
          </View>
        </TapGestureHandler>
      </TapGestureHandler>
      <Animated.View
        style={[
          {
            height: 50,
            backgroundColor: '#FFF',
          },
          {
            transform: [
              {translateY: translateYAnimated(props.index, props.scrollY)},
            ],
          },
          {
            borderBottomLeftRadius: borderRadiusAnimated(
              props.index,
              props.scrollY
            ),
            borderBottomRightRadius: borderRadiusAnimated(
              props.index,
              props.scrollY
            ),
          },
        ]}
      />
    </View>
  );
};

const borderRadiusAnimated = (index: number, scrollY: Animated.Value) => {
  return scrollY.interpolate({
    inputRange: [index * 550, index * 550 + 550 * 0.4, index * 550 + 550 * 0.8],
    outputRange: [25, 25, 0],
  });
};

const translateYAnimated = (index: number, scrollY: Animated.Value) => {
  return scrollY.interpolate({
    inputRange: [
      index * 550,
      index * 550 + 550 * 0.4,
      index * 550 + 550 * 0.8,
      (index + 1) * 550,
    ],
    outputRange: [0, 0, -50, -50],
  });
};

export default Post;

/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * @author Paul H. Sullivan
 * @date Sep 2020
 * @desc This is the the component for a basic post
 */

import * as React from 'react';
import {Alert, Animated, Dimensions, Text, TouchableOpacity, View} from 'react-native';

import {
  LongPressGestureHandler,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';

import styles from 'styles/styles';

const doubleTapRef = React.createRef<TapGestureHandler>();

const onHandlerStateChange = (event: any) => {
  if (event.nativeEvent.state === State.ACTIVE) {
    Alert.alert('Niiiiiiiice');
  }
};

const onSingleTap = (event: any) => {
  if (event.nativeEvent.state === State.ACTIVE) {
    Alert.alert('Nice');
  }
};

const onDoubleTap = (event: any) => {
  if (event.nativeEvent.state === State.ACTIVE) {
    Alert.alert('NiceNice');
  }
};

interface PostProps {
  index: number;
  scrollY: Animated.Value;
}

const Post: React.FunctionComponent<PostProps> = (props: PostProps) => {
  return (
    <View style={{zIndex: -props.index, marginTop: -50}}>
      <LongPressGestureHandler
        onHandlerStateChange={onHandlerStateChange}
        minDurationMs={800}>
        <TapGestureHandler
          onHandlerStateChange={onSingleTap}
          waitFor={doubleTapRef}
        >
          <TapGestureHandler
            ref={doubleTapRef}
            onHandlerStateChange={onDoubleTap}
            numberOfTaps={2}
          >
            <Animated.View
              style={[
                {
                  width: '100%',
                  height: 500,
                  backgroundColor: 'powderblue',
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
              ]}
            />
          </TapGestureHandler>
        </TapGestureHandler>
      </LongPressGestureHandler>
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
    inputRange: [index * 550, index * 550 + 550 * 0.3, index * 550 + 550 * 0.7],
    outputRange: [25, 25, 0],
  });
};

const translateYAnimated = (index: number, scrollY: Animated.Value) => {
  return scrollY.interpolate({
    inputRange: [
      index * 550,
      index * 550 + 550 * 0.3,
      index * 550 + 550 * 0.7,
      (index + 1) * 550,
    ],
    outputRange: [0, 0, -50, -50],
  });
};

export default Post;

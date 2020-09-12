/**
 * @author Paul H. Sullivan
 * @date Sep 2020
 * @desc This is the the component for a basic post
 */

import React from 'react';
import {Animated, Dimensions, Text, TouchableOpacity, View} from 'react-native';

import styles from 'styles/styles';

const windowHeight = Dimensions.get('window').height;

interface PostProps {
  index: number;
  scrollY: Animated.Value;
}

const Post = (props: PostProps) => {
  return (
    <View style={{zIndex: -props.index, marginTop: -50}}>
      <Animated.View
        style={[
          {
            width: '100%',
            height: 500,
            backgroundColor: 'powderblue',
          },
          {
            transform: [
              {translateY: translateYAnimated(props.index, props.scrollY)},
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          {
            height: 50,
            backgroundColor: '#FFF',
            shadowColor: '#000',
            shadowOpacity: 0.25,
            shadowRadius: 0,
            shadowOffset: {height: 1, width: 0},
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

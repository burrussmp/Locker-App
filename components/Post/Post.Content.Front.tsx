/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';
// External
import * as React from 'react';
import {useRef} from 'react';
import {Alert, Animated, View} from 'react-native';
import {
  State,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
// Services
import {
  flipAnimationTransform,
  pushOutAnimationTransform,
} from 'services/animations/PostAnimations';
// Styles
import styles from 'components/Post/Post.Styles';

const PostContentFront = (props: {
  image: string;
  index: number;
  rotationDegrees: Animated.Value;
  scrollY: Animated.Value;
  handleFlip(): void;
}) => {
  // Styles
  const ComponentStyles = styles.ContentFront;
  // Extract props
  const image = props.image;
  const index = props.index;
  const scrollY = props.scrollY;
  const rotationDegrees = props.rotationDegrees;
  // Refs
  const doubleTapRef = useRef(null);
  // Functions
  const onContentTap = (event: TapGestureHandlerGestureEvent) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      props.handleFlip();
    }
  };
  const onContentDoubleTap = (event: TapGestureHandlerGestureEvent) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      Alert.alert('NiceNice');
      // like action goes here
    }
  };
  const imageAnimation = pushOutAnimationTransform(scrollY, index);
  const flipAnimation = flipAnimationTransform(rotationDegrees, true);
  return (
    <View>
      <TapGestureHandler
        onHandlerStateChange={onContentTap}
        waitFor={doubleTapRef}
      >
        <TapGestureHandler
          ref={doubleTapRef}
          onHandlerStateChange={onContentDoubleTap}
          numberOfTaps={2}
        >
          <Animated.View
            style={[
              ComponentStyles.imageContainer,
              imageAnimation,
              flipAnimation,
            ]}
          >
            <Animated.Image
              source={{uri: image}}
              style={[ComponentStyles.image, imageAnimation]}
            />
          </Animated.View>
        </TapGestureHandler>
      </TapGestureHandler>
    </View>
  );
};

export default PostContentFront;

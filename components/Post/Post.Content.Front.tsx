/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';
// External
import * as React from 'react';
import {useRef} from 'react';
import {Alert, Animated, ImageURISource, View} from 'react-native';
import {
  State,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
// Services
import {
  borderTopRadiusAnimationStyle,
  flipAnimationTransform,
  pushOutAnimationTransform,
} from 'services/animations/PostAnimations';
// Styles
import styles from 'components/Post/Post.Styles';

const PostContentFront = (props: {
  imageSource: ImageURISource;
  index: number;
  rotationDegrees: Animated.Value;
  scrollY: Animated.Value;
  handleFlip(): void;
}) => {
  // Styles
  const ComponentStyles = styles.ContentFront;
  // Extract props
  const imageSource = props.imageSource;
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
  const flipAnimation = flipAnimationTransform(rotationDegrees, true);
  const scrollAnimation = borderTopRadiusAnimationStyle(scrollY, index);
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
            style={[ComponentStyles.imageContainer, flipAnimation]}
          >
            <Animated.Image
              source={imageSource}
              style={[ComponentStyles.image, scrollAnimation]}
            />
          </Animated.View>
        </TapGestureHandler>
      </TapGestureHandler>
    </View>
  );
};

export default PostContentFront;

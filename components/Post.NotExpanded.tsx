import {ALL} from 'dns';
/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * @author Paul H. Sullivan
 * @date Sep 2020
 * @desc This is the the component for a basic post
 */

import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {Alert, Animated, View} from 'react-native';

import {
  ScrollView,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

import LikeButton from 'components/Post.LikeButton';
import LockButton from 'components/Post.LockButton';

import PostActions from 'store/actions/post.actions';

interface PostProps {
  index: number;
  scrollY: Animated.Value;
  onContentExpand(index: number): void;
}

const PostNotExpanded: React.FunctionComponent<PostProps> = (
  props: PostProps
) => {
  const [isFlipped, setFlipped] = useState(false);
  const navigation = useNavigation();
  const rotationDegrees = useRef(new Animated.Value(0)).current;
  const bottomHeight = useRef(new Animated.Value(50)).current;
  const doubleTapRef = useRef(null);

  useEffect(() => {
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
  }, [isFlipped]);

  const onContentTap = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      handleFlip();
    }
  };

  const onContentDoubleTap = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      Alert.alert('NiceNice');
      // like action goes here
    }
  };

  function handleFlip() {
    setFlipped(prev => !prev);
  }

  const borderRadiusInterpolate = props.scrollY.interpolate({
    inputRange: [
      props.index * 500,
      props.index * 500 + 550 * 0.4,
      props.index * 500 + 550 * 0.8,
    ],
    outputRange: [25, 25, 1],
    extrapolate: 'clamp',
  });

  const pushOutInterpolate = props.scrollY.interpolate({
    inputRange: [
      props.index * 500,
      props.index * 500 + 550 * 0.4,
      props.index * 500 + 550 * 0.8,
    ],
    outputRange: [0, 0, -50],
    extrapolate: 'clamp',
  });

  const frontFlipInterpolate = rotationDegrees.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backFlipInterpolate = rotationDegrees.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const borderRadiusAnimationStyle = {
    borderBottomLeftRadius: borderRadiusInterpolate,
    borderBottomRightRadius: borderRadiusInterpolate,
  };

  const pushOutAnimationTransform = {
    transform: [{translateY: pushOutInterpolate}],
  };

  const frontFlipAnimationTransform = {
    transform: [{rotateY: frontFlipInterpolate}],
  };

  const backFlipAnimationTransform = {
    transform: [{rotateY: backFlipInterpolate}],
  };

  const onEllipsesTap = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      props.onContentExpand(props.index);
      props.ExpandPost();
      navigation.navigate('PostExpanded');
    }
  };
  return (
    <View style={{zIndex: -props.index, marginTop: -50}}>
      <TapGestureHandler
        onHandlerStateChange={onContentTap}
        waitFor={doubleTapRef}
      >
        <TapGestureHandler
          ref={doubleTapRef}
          onHandlerStateChange={onContentDoubleTap}
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
                pushOutAnimationTransform,
                frontFlipAnimationTransform,
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
                pushOutAnimationTransform,
                backFlipAnimationTransform,
              ]}
            />
          </View>
        </TapGestureHandler>
      </TapGestureHandler>
      <Animated.View
        style={[
          {
            height: bottomHeight,
            backgroundColor: '#FFF',
          },
          pushOutAnimationTransform,
          borderRadiusAnimationStyle,
        ]}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-start',
            paddingTop: 10,
            paddingHorizontal: 15,
          }}
        >
          <View style={{flex: 3}} />
          <View style={{flex: 2}}>
            <TapGestureHandler onHandlerStateChange={onEllipsesTap}>
              <View style={{flex: 1, backgroundColor: 'black'}} />
            </TapGestureHandler>
          </View>
          <View
            style={{
              flex: 3,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <LikeButton style={{marginEnd: 5}} />
            <LockButton />
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    ExpandPost: () => {
      dispatch(PostActions.ExpandPost());
    },
  };
};

export default connect(null, mapDispatchToProps)(PostNotExpanded);

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
import {Alert, Animated, Image, View} from 'react-native';

import {
  ScrollView,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

import LikeButton from 'components/Post.LikeButton';
import LockButton from 'components/Post.LockButton';
import icons from 'icons/icons';

import PostActions from 'store/actions/post.actions';
import {
  flipAnimation,
  borderRadiusAnimationStyle,
  flipAnimationTransform,
  pushOutAnimationTransform,
} from 'services/animations/PostAnimations';

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
  const rotationDegreesRef = useRef(new Animated.Value(0)).current;
  const doubleTapRef = useRef(null);

  useEffect(() => {
    flipAnimation(rotationDegreesRef, isFlipped);
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
                pushOutAnimationTransform(props.scrollY, props.index),
                flipAnimationTransform(rotationDegreesRef, true),
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
                pushOutAnimationTransform(props.scrollY, props.index),
                flipAnimationTransform(rotationDegreesRef, false),
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
          pushOutAnimationTransform(props.scrollY, props.index),
          borderRadiusAnimationStyle(props.scrollY, props.index),
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
              <View style={{flex: 1, alignItems: 'center', paddingTop: 11}}>
                <Image source={icons.more.more} style={{opacity: 0.25}} />
              </View>
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

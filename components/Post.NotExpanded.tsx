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
import {Alert, Animated, FlatList, Image, Text, View} from 'react-native';

import {State, TapGestureHandler} from 'react-native-gesture-handler';
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
import {Avatar, Divider} from 'react-native-elements';
import {BlurView} from 'expo-blur';

interface PostProps {
  index: number;
  data: any;
  content: any;
  image: string;
  scrollY: Animated.Value;
  onContentExpand(index: number): void;
}

const PostNotExpanded: React.FunctionComponent<PostProps> = (
  props: PostProps
) => {
  console.log('rendered');
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
      props.ExpandPost();
      navigation.navigate('PostExpanded');
    }
  };

  return (
    <View
      style={{
        zIndex: props.index,
        marginTop: -50,
      }}
    >
      <View style={{backgroundColor: props.cardColor}}>
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
                    height: 500,
                    backgroundColor: 'powderblue',
                    backfaceVisibility: 'hidden',
                  },
                  pushOutAnimationTransform(props.scrollY, props.index),
                  flipAnimationTransform(rotationDegreesRef, true),
                ]}
              >
                {props.image ? (
                  <Image
                    source={{uri: props.image}}
                    style={{flex: 1, width: '100%', resizeMode: 'cover'}}
                  />
                ) : undefined}
              </Animated.View>
              <Animated.View
                style={[
                  {
                    position: 'absolute',
                    width: '100%',
                    height: 500,
                    backgroundColor: '#FFFFFF',
                    backfaceVisibility: 'hidden',
                  },
                  pushOutAnimationTransform(props.scrollY, props.index),
                  flipAnimationTransform(rotationDegreesRef, false),
                ]}
              >
                <View
                  style={{
                    flex: 3,
                  }}
                >
                  <View
                    style={{
                      height: 150,
                      width: '100%',
                      paddingTop: 25,
                      paddingLeft: 25,
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      backgroundColor: '#FFFFFF',
                    }}
                  >
                    <View style={{flex: 2}}>
                      <Text style={{fontSize: 24, fontWeight: '700'}}>
                        {props.data.caption}
                      </Text>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: '200',
                          marginTop: 5,
                        }}
                      >
                        {props.content.price}
                      </Text>
                    </View>
                    <Avatar
                      source={props.image}
                      rounded
                      containerStyle={{
                        height: 100,
                        width: 100,
                        marginRight: 25,
                      }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flex: 7,
                  }}
                >
                  <Divider
                    style={{
                      backgroundColor: 'black',
                      marginHorizontal: 75,
                    }}
                  />
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: '#FFFFFF',
                    }}
                  ></View>
                </View>
              </Animated.View>
            </View>
          </TapGestureHandler>
        </TapGestureHandler>
      </View>
      <Animated.View
        style={[
          {
            height: 50,
            backgroundColor: props.cardColor ? props.cardColor : '#FFFFFF',
          },
          pushOutAnimationTransform(props.scrollY, props.index),
          borderRadiusAnimationStyle(props.scrollY, props.index),
        ]}
      >
        <Animated.View
          style={[
            {
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundColor: '#FFFFFF',
              backfaceVisibility: 'hidden',
              zIndex: props.index - 1000,
            },
            pushOutAnimationTransform(props.scrollY, props.index),
            borderRadiusAnimationStyle(props.scrollY, props.index),
            flipAnimationTransform(rotationDegreesRef, false),
          ]}
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-start',
            alignContent: 'center',
          }}
        >
          <View
            style={{
              flex: 3,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingTop: 12.5,
              paddingLeft: 17.5,
            }}
          >
            <Avatar
              source={props.authorAvatar}
              rounded
              containerStyle={{
                height: 25,
                width: 25,
                borderRadius: 15,
              }}
              onPress={() => console.log('Avatar pressed')}
              activeOpacity={0.5}
            />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 12,
              }}
            >
              {props.author}
            </Text>
          </View>
          <View style={{flex: 2, paddingTop: 10}}>
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
              paddingRight: 15,
              paddingTop: 10,
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

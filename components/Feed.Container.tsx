/**
 * @author Paul H. Sullivan
 * @date Sep 2020
 */

import * as React from 'react';

import {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {Animated, ScrollView, View} from 'react-native';

import HomeActions from 'store/actions/home.actions';
import PostActions from 'store/actions/post.actions';
import Post from 'components/Post.tsx';
import styles from 'styles/styles';
import {Easing} from 'react-native';

const FeedContainer: React.FunctionComponent = (props: any) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollYRef = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      props.ContractPost();
    });
    return unsubscribe;
  }, [props.navigation]);

  const handleContentExpand = (index: number) => {
    scrollTo(index);
  };

  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollYRef}}}],
    {
      useNativeDriver: false,
    }
  );

  const scrollTo = (index: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: 0,
        y: convertIndexToY(index),
        animated: false,
      });
    }
  };

  const convertIndexToY = (index: number) => {
    return (index - 1) * 500 + 550;
  };

  return (
    <View style={styles.droidSafeArea}>
      <Animated.ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View style={{height: 98}} />
        <Post
          index={0}
          image={require('assets/images/mock/1.jpeg')}
          cardColor={'#ECECEC'}
          title={'Palisades Patchwork Buttondown'}
          author={'freepeople'}
          authorAvatar={require('assets/images/mock/freepeople.jpeg')}
          scrollY={scrollYRef}
          onContentExpand={handleContentExpand}
        />
        <Post
          index={1}
          scrollY={scrollYRef}
          onContentExpand={handleContentExpand}
        />
        <Post
          index={2}
          scrollY={scrollYRef}
          onContentExpand={handleContentExpand}
        />
        <View
          style={{width: 200, height: 200, backgroundColor: 'powderblue'}}
        />
        <View style={{width: 200, height: 200, backgroundColor: 'skyblue'}} />
        <View style={{width: 200, height: 200, backgroundColor: 'steelblue'}} />
        <View
          style={{width: 200, height: 200, backgroundColor: 'powderblue'}}
        />
        <View style={{width: 200, height: 200, backgroundColor: 'skyblue'}} />
        <View style={{width: 200, height: 200, backgroundColor: 'steelblue'}} />
        <View
          style={{width: 200, height: 200, backgroundColor: 'powderblue'}}
        />
        <View style={{width: 200, height: 200, backgroundColor: 'skyblue'}} />
        <View style={{width: 200, height: 200, backgroundColor: 'steelblue'}} />
        <View
          style={{width: 200, height: 200, backgroundColor: 'powderblue'}}
        />
        <View style={{width: 200, height: 200, backgroundColor: 'skyblue'}} />
        <View style={{width: 200, height: 200, backgroundColor: 'steelblue'}} />
        <View style={{width: 200, height: 200, backgroundColor: 'steelblue'}} />
        <View
          style={{width: 200, height: 200, backgroundColor: 'powderblue'}}
        />
        <View style={{width: 200, height: 200, backgroundColor: 'skyblue'}} />
        <View style={{width: 200, height: 200, backgroundColor: 'steelblue'}} />
      </Animated.ScrollView>
    </View>
  );
};

const mapStateToProps = (state: any) => {
  return {
    state: state,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    ChangeTab: (scrollTracker: Animated.Value) => {
      dispatch(HomeActions.ChangeTab(scrollTracker));
    },
    ContractPost: () => {
      dispatch(PostActions.ContractPost());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);

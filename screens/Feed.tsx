/**
 * @author Paul H. Sullivan
 * @date Sep 2020
 * @desc Authorization Screen
 */

import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {Animated, Easing, ScrollView, View} from 'react-native';
import Post from 'components/Post.tsx';

import HomeActions from 'store/actions/home.actions';
import HomeSelectors from 'store/selectors/home.selectors';
import styles from 'styles/styles';

const Feed = (props: any) => {
  const [isContentExpanded, setContentExpanded] = useState(false);
  const scrollView = useRef<ScrollView>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      props.ChangeTab(scrollY);
    });
    return unsubscribe;
  }, [props.navigation]);
  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {
      useNativeDriver: false,
    }
  );

  const handleContentExpand = (index: number) => {
    setContentExpanded(prev => !prev);
    scrollTo(index);
  };

  const scrollTo = (index: number) => {
    if (scrollView.current) {
      scrollView.current.scrollTo({
        x: 0,
        y: convertIndexToY(index),
        animated: true,
      });
    }
  };

  const convertIndexToY = (index: number) => {
    return (index - 1) * 500 + 550;
  };

  return (
    <View style={styles.droidSafeArea}>
      <Animated.ScrollView
        ref={scrollView}
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
          scrollY={scrollY}
          onContentExpand={handleContentExpand}
        />
        <Post
          index={1}
          scrollY={scrollY}
          onContentExpand={handleContentExpand}
        />
        <Post
          index={2}
          scrollY={scrollY}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);

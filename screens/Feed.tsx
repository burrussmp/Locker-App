/**
 * @author Paul H. Sullivan
 * @date Sep 2020
 * @desc Authorization Screen
 */

import React, {useRef} from 'react';
import {connect} from 'react-redux';
import {Animated, View} from 'react-native';
import Post from 'components/Post.tsx';

import HomeActions from 'store/actions/home.actions';
import HomeSelectors from 'store/selectors/home.selectors';
import styles from 'styles/styles';

const Feed = (props: any) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {
      useNativeDriver: true,
      listener: event => {
        props.Scroll(event.nativeEvent.contentOffset.y);
      },
    }
  );

  return (
    <View style={styles.droidSafeArea}>
      <Animated.ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
        }}
        onScroll={onScroll}
        scrollEventThrottle={1}
        showsVerticalScrollIndicator={false}
      >
        <View style={{height: 98}} />
        <Post index={0} scrollY={scrollY} />
        <Post index={1} scrollY={scrollY} />
        <Post index={2} scrollY={scrollY} />
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
    Scroll: (value: number) => {
      dispatch(HomeActions.Scroll(value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);

/**
 * @author Paul H. Sullivan
 * @date Sep 2020
 */

import * as React from 'react';

import {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {
  Animated,
  Dimensions,
  FlatList,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import HomeActions from 'store/actions/home.actions';
import PostActions from 'store/actions/post.actions';
import PostContainer from 'components/Post/Post.Container';
import styles from 'styles/styles';

import api from 'api/api';

const FeedContainer: React.FunctionComponent = (props: any) => {
  const feedRef = useRef<FlatList>(null);
  const scrollYRef = useRef(new Animated.Value(0)).current;
  const isCancelled = useRef(false);
  const [feedData, setFeedData] = useState([]);

  useEffect(() => {
    getFeedData();
    return () => {
      isCancelled.current = true;
    };
  }, []);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      props.contractPost();
    });
    return unsubscribe;
  }, [props.navigation]);

  const handleContentExpand = (index: number) => {
    //
  };

  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollYRef}}}],
    {
      useNativeDriver: false,
    }
  );

  const getFeedData = () => {
    // api.Post.Basic.GetAll()
    //   .then(res => {
    //     if (!isCancelled.current) {
    //       setFeedData(res);
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  };

  return (
    <View style={styles.safeArea}>
      <FlatList
        ref={feedRef}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<View style={{height: 58}} />}
        ListFooterComponent={<View style={{height: 150}} />}
        data={feedData}
        keyExtractor={item => item._id}
        ItemSeparatorComponent={() => {
          return <View style={{height: 20}} />;
        }}
        renderItem={({item, index}) => (
          <PostContainer index={index} id={item._id} scrollY={scrollYRef} />
        )}
        getItemLayout={(data, index) => ({
          length: 550,
          offset: 550 * index,
          index,
        })}
      />
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
    changeTab: (scrollTracker: Animated.Value) => {
      dispatch(HomeActions.changeTab(scrollTracker));
    },
    contractPost: () => {
      dispatch(PostActions.contractPost());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);

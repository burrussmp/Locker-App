/**
 * @author Paul H. Sullivan
 * @date Sep 2020
 * @desc The feed container.
 */

import React, {
  useEffect, useRef, useState, FC,
} from 'react';

import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import {
  Alert,
  Animated,
  FlatList,
  View,
} from 'react-native';

import SafeArea from 'common/components/SafeArea';

import HomeActions from 'store/actions/home.actions';
import PostActions from 'store/actions/post.actions';
import Post from 'common/containers/Post/Post';

import { RootAction } from 'store/index';
import { FeedProp } from 'types/Navigation/feed.navigation.types';

import api, { APIErrorType } from 'api/api';
import { PostListType } from 'api/post';

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  changeTab: (scrollTracker: Animated.Value) => {
    dispatch(HomeActions.changeTab(scrollTracker));
  },
  contractPost: () => {
    dispatch(PostActions.contractPost());
  },
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type IProps = PropsFromRedux & FeedProp;

const FeedContainer: FC<IProps> = ({ navigation, contractPost }: IProps) => {
  const [feedData, setFeedData] = useState<PostListType>([]);

  useEffect(() => {
    let complete = false;
    api.Post.GetAll().then((data) => {
      if (!complete) {
        setFeedData(data);
      }
    }).catch((err: APIErrorType) => {
      Alert.alert(err.error);
    });
    return function cleanup() {
      complete = true;
    };
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      contractPost();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeArea>
      <FlatList
        data={feedData}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<View style={{ height: 58 }} />}
        ListFooterComponent={<View style={{ height: 150 }} />}
        keyExtractor={(item: PostListType[0]) => item._id}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        renderItem={({ item }) => (
          <Post id={item._id} />
        )}
        getItemLayout={(data, index) => ({
          length: 550,
          offset: 550 * index,
          index,
        })}
      />
    </SafeArea>
  );
};

export default connector(FeedContainer) as FC<IProps>;

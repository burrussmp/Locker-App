/**
 * @author Matthew P. Burruss
 * @date 2/1/2021
 * @desc The feed container.
 */

import React, { useEffect, useState, FC } from 'react';
import { Alert, FlatList, View } from 'react-native';

import SafeArea from 'common/components/SafeArea';
import Post from 'screens/App/Home/Feed/Post/Post';

import api, { APIErrorType } from 'api/api';
import { PostListType } from 'api/post';

const FeedContainer: FC = () => {
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

export default FeedContainer;

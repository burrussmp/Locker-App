/**
 * @author Matthew P. Burruss
 * @date 2/1/2021
 * @desc Post Details
 */

import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { PostDetailsProp } from 'types/navigation/home.navigation.types';

type IProps = PostDetailsProp

const PostDetails: FC<IProps> = ({ navigation, route }: IProps) => {
  const postDetailsText = JSON.stringify(route.params.postData);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{postDetailsText}</Text>
    </View>
  );
};

export default PostDetails;

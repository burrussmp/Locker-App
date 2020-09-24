/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';
// External
import React from 'react';
import {View, ActivityIndicator} from 'react-native';
// Internal
import PostBottomTab from 'components/Post/Post.BottomTab';
// Styles
import styles from 'components/Post/Post.Styles';

/**
 * @desc Renders the post loading placeholder
 */
const PostLoading = (props: any) => {
  const ComponentStyles = styles.Loading;
  const index = props.index;
  const scrollY = props.scrollY;
  return (
    <View style={ComponentStyles.container}>
      <View style={ComponentStyles.indicatorContainer}>
        <ActivityIndicator
          size="large"
          color="#000000"
          style={ComponentStyles.indicator}
        />
      </View>
      <PostBottomTab index={index} scrollY={scrollY} />
    </View>
  );
};

export default PostLoading;

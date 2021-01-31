/**
 * @author Matthew P. Burruss
 * @date Sep 2020
 * @desc A general loading icon.
 */

import React, { FC } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Loading: FC = () => (
  <View style={LoadingStyle.container}>
    <ActivityIndicator size="large" color="lightblue" />
  </View>
);

export default Loading;

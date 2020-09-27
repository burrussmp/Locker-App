/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';
import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

const LoadingStyle = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginBottom: 15,
  },
});
/**
 * @desc Renders the original loading container
 */
const Loading = () => {
  return (
    <View style={LoadingStyle.container}>
      <ActivityIndicator size="large" color="lightblue"></ActivityIndicator>
    </View>
  );
};

export default Loading;

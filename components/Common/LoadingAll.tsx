/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';
import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

import {BlurView} from 'expo-blur';
import SafeArea from 'components/Common/SafeArea';
const LoadingStyle = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
/**
 * @desc Renders the original loading container
 */
const LoadingAll = () => {
  return (
    <SafeArea
      children={
        <BlurView
          tint={'dark'}
          intensity={100}
          style={[StyleSheet.absoluteFill]}
        >
          <View style={LoadingStyle.container}>
            <ActivityIndicator
              size="large"
              color="lightblue"
            ></ActivityIndicator>
          </View>
        </BlurView>
      }
    />
  );
};

export default LoadingAll;

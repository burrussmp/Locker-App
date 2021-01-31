/**
 * @author Matthew P. Burruss
 * @date Sep 2020
 * @desc Loading the entire page.
 */

import React, { FC } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import { BlurView } from 'expo-blur';
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

const LoadingAll: FC = () => (
  <SafeArea>
    <BlurView
      tint="dark"
      intensity={100}
      style={[StyleSheet.absoluteFill]}
    >
      <View style={LoadingStyle.container}>
        <ActivityIndicator
          size="large"
          color="lightblue"
        />
      </View>
    </BlurView>
  </SafeArea>
);

export default LoadingAll;

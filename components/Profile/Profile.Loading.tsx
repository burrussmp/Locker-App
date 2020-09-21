'use strict';

import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';

const ComponentStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const ProfileLoading = () => {
  return (
    <View style={ComponentStyles.container}>
      <ActivityIndicator size="large" color="#ccc"></ActivityIndicator>
    </View>
  );
};

export default ProfileLoading;

/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';
import React from 'react';
import {View, ActivityIndicator} from 'react-native';

import styles from 'components/Profile/Profile.Styles';

/**
 * @desc Renders the original loading container
 */
const ProfileLoading = () => {
  const ComponentStyles = styles.Loading;
  return (
    <View style={ComponentStyles.container}>
      <ActivityIndicator size="large" color="#ccc"></ActivityIndicator>
    </View>
  );
};

export default ProfileLoading;

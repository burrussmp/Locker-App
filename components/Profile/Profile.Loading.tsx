'use strict';

import React from 'react';
import {StyleSheet, View} from 'react-native';
import Loading from 'react-native-whc-loading';

const ComponentStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const ProfileLoading = (props: any) => {
  return (
    <View style={ComponentStyles.container}>
      <Loading
        ref="loading3"
        show={props.isLoaded ? props.isLoaded : true}
      ></Loading>
    </View>
  );
};

export default ProfileLoading;

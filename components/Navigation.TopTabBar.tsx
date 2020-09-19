import * as React from 'react';
import {Animated} from 'react-native';
import {MaterialTopTabBar} from '@react-navigation/material-top-tabs';

const TopTabBar: React.FunctionComponent = (props: any) => {
  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        backgroundColor: '#FFFFFF',
      }}
    >
      <MaterialTopTabBar {...props} />
    </Animated.View>
  );
};

export default TopTabBar;

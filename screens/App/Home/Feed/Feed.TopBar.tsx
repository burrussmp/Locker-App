/* eslint-disable react/jsx-props-no-spreading */
/**
 * @author Matthew P. Burruss
 * @date 2/1/2021
 * @desc The bottom navigation tab bar
*/

import React, { FC } from 'react';
import { Animated } from 'react-native';
import { MaterialTopTabBar, MaterialTopTabBarProps, MaterialTopTabBarOptions } from '@react-navigation/material-top-tabs';

type IProps = MaterialTopTabBarOptions & MaterialTopTabBarProps;

const TopTabBar: FC<IProps> = (props: IProps) => (
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
    <MaterialTopTabBar
      {...props}
    />
  </Animated.View>
);

export default TopTabBar;

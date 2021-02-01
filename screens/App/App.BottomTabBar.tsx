/**
 * @author Matthew P. Burruss
 * @date 1/27/2021
 * @desc The bottom navigation tab bar
*/

import React, { FC } from 'react';
import { BottomTabBar, BottomTabBarProps, BottomTabBarOptions } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';

type IProps = BottomTabBarProps<BottomTabBarOptions>;

const AppBottomTabBar: FC<IProps> = ({ state, descriptors, navigation }: IProps) => (
  <BlurView
    style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    }}
    tint="default"
    intensity={100}
  >
    <BottomTabBar state={state} descriptors={descriptors} navigation={navigation} />
  </BlurView>
);

export default AppBottomTabBar;

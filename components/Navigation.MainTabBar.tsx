import * as React from 'react';
import {BottomTabBar} from '@react-navigation/bottom-tabs';
import {BlurView} from 'expo-blur';

const MainTabBar: React.FunctionComponent = (props: any) => {
  return (
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
      <BottomTabBar {...props} />
    </BlurView>
  );
};

export default MainTabBar;

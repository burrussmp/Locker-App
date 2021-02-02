/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { FC } from 'react';
import { View, Text } from 'react-native';

/**
 * @desc Renders the styles that the user wants on display
 */
const ProfileOnDisplay: FC  = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>ON DISPLAY!</Text>
  </View>
);

export default ProfileOnDisplay;

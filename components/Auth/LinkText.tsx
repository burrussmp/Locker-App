/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Simple navigational component to navigate from one screen to another
 */

import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

/**
 *
 * @param {string} screen The screen to navigate to
 * @param {object} style Any additional styling you wan to do to text object
 * @param {string} placeHolder The placeholder for the text
 */
const LinkText = (props: any) => {
  const placeHolder = props.placeHolder;
  const style = props.style;
  const screen = props.screen;
  if (!placeHolder || !screen) {
    throw 'Cannot create LinkText component without both placeholder and screen to navigate to';
  }
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate(screen)}>
      <Text style={[{color: '#12cccc'}, style]}>{placeHolder}</Text>
    </TouchableOpacity>
  );
};

export default LinkText;

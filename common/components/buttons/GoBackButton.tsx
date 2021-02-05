/**
 * @author Matthew P. Burruss
 * @date 2/1/2021
 * @desc Go Back Button
 */

import React, { FC } from 'react';

import {
  Text, TextStyle, TouchableOpacity, StyleSheet, ViewStyle,
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';

type IProps = {
  onPress: () => void;
  containerStyle?: ViewStyle;
  iconColor?: string;
  iconSize?: number;
  text?: string;
  textStyle?: TextStyle;
};

const GoBackStyles = StyleSheet.create({
  mContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  mTextStyle: {
    alignSelf: 'flex-start',
    fontWeight: '200',
    fontSize: 18,
    color: '#000',
  },
});

const GoBack: FC<IProps> = ({
  containerStyle, iconSize, iconColor, text, textStyle, onPress,
}: IProps) => (
  <TouchableOpacity onPress={onPress} style={[GoBackStyles.mContainerStyle, containerStyle]}>
    <Icons name="arrow-back" size={iconSize} color={iconColor} />
    { text && <Text style={[GoBackStyles.mTextStyle, textStyle]}>{text}</Text> }
  </TouchableOpacity>
);

GoBack.defaultProps = {
  containerStyle: {},
  iconColor: '#000',
  iconSize: 25,
  text: undefined,
  textStyle: {},
};

export default GoBack;

/**
 * @author Matthew P. Burruss
 * @date 2/7/2021
 * @desc The header on top of explore landing types
 */

import React, { FC } from 'react';
import {
  TouchableOpacity, Text, TextStyle, StyleSheet, View, ViewStyle,
} from 'react-native';

import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  defaultContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 5,
  },
  defaultTextStyle: {
    fontSize: 22,
    fontFamily: 'CircularBlack',
  },
});

type IProps = {
  text: string;
  onButtonPress: () => void;
  textStyle?: TextStyle;
  containerStyle?: ViewStyle;
  buttonSize?: number;
  buttonColor?: string;
}

const SpecificSearchHeader: FC<IProps> = ({
  text, onButtonPress, textStyle, containerStyle, buttonSize, buttonColor,
}: IProps) => (
  <TouchableOpacity onPress={onButtonPress} style={[styles.defaultContainerStyle, containerStyle]}>
    <Text style={[styles.defaultTextStyle, textStyle]}>{text}</Text>
    <View style={containerStyle}>
      <Icons
        name="chevron-right"
        size={buttonSize}
        color={buttonColor}
      />
    </View>
  </TouchableOpacity>
);

SpecificSearchHeader.defaultProps = {
  textStyle: {},
  containerStyle: {},
  buttonSize: 25,
  buttonColor: '#000',
};

export default SpecificSearchHeader;

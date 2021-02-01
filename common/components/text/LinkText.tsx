/**
 * @desc Validators
 * @author Matthew P. Burruss
 * @date 1/3/2021
 */
import React, { FC } from 'react';
import {
  Alert, Linking, StyleSheet, TextStyle, Text,
} from 'react-native';

type IProps = {
  url: string;
  style?: TextStyle;
  text?: string;

};

const LinkTextStyle = StyleSheet.create({
  defaultTextLinkStyle: {
    color: '#2dd1d2',
    fontSize: 14,
    fontWeight: '200',
  },
});

const LinkText: FC<IProps> = ({ url, text, style }: IProps) => {
  const handlePress = async () => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  return (
    <Text style={[LinkTextStyle.defaultTextLinkStyle, style]} onPress={handlePress}>{text || url}</Text>
  );
};

LinkText.defaultProps = {
  text: undefined,
  style: {},
};

export default LinkText;

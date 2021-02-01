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
  style: TextStyle;
};

const LinkTextStyle = StyleSheet.create({
  defaultTextLinkStyle: {
    color: '#2dd1d2',
    fontSize: 14,
    fontWeight: '200',
  },
});

const LinkText: FC<IProps> = ({ url, style }: IProps) => {
  const handlePress = async () => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  return (
    <Text style={[LinkTextStyle.defaultTextLinkStyle, style]} onPress={handlePress}>{url}</Text>
  );
};

export default LinkText;

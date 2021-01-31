/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Simple navigational component to navigate from one screen to another
 */

import React, { FC } from 'react';
import { Text, TouchableOpacity, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type IProps = {
  placeHolder: string;
  style: ViewStyle;
  screen: string;
}
const LinkText: FC<IProps> = ({ placeHolder, style, screen }: IProps) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate(screen)}>
      <Text style={[{ color: '#12cccc' }, style]}>{placeHolder}</Text>
    </TouchableOpacity>
  );
};

export default LinkText;

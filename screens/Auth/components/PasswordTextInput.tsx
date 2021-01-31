/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Password input text
 */

import React, { useState, FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import AuthTextInput from 'screens/Auth/components/BasicTextInput';
import Icon from 'react-native-vector-icons/Ionicons';

type IProps = {
  placeHolder: string;
  value: string;
  setValue: (text: string) => void;
  toggleVisibility?: boolean;
}

const PasswordTextInput: FC<IProps> = ({
  placeHolder, toggleVisibility, value, setValue,
}: IProps) => {
  // extract props
  const [visible, setVisible] = useState(false);

  const VisibilityIcon = toggleVisibility ? (
    <TouchableOpacity onPress={() => setVisible(!visible)}>
      <View style={{ alignSelf: 'center', paddingRight: 10 }}>
        <Icon
          name={visible ? 'ios-eye-off' : 'ios-eye'}
          size={20}
          color="gray"
        />
      </View>
    </TouchableOpacity>
  ) : undefined;

  return (
    <AuthTextInput
      placeHolder={placeHolder}
      value={value}
      secureTextEntry={!visible}
      setValue={setValue}
      textContentType="password"
      rightIcon={VisibilityIcon}
    />
  );
};

PasswordTextInput.defaultProps = {
  toggleVisibility: false,
};

export default PasswordTextInput;

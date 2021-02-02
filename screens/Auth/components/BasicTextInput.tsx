/**
 * @author Matthew P. Burruss
 * @date 1/30/2021
 * @desc Basic Text Input for auth
 */

import React, { FC } from 'react';
import {
  TextInput, ImageSourcePropType, View, ViewStyle,
} from 'react-native';

import AuthStyles from 'styles/Auth/Auth.Styles';

type IProps = {
  value: string;
  setValue: (value: string) => void;
  placeHolder?: string;
  textContentType?:
  | 'none'
  | 'URL'
  | 'addressCity'
  | 'addressCityAndState'
  | 'addressState'
  | 'countryName'
  | 'creditCardNumber'
  | 'emailAddress'
  | 'familyName'
  | 'fullStreetAddress'
  | 'givenName'
  | 'jobTitle'
  | 'location'
  | 'middleName'
  | 'name'
  | 'namePrefix'
  | 'nameSuffix'
  | 'nickname'
  | 'organizationName'
  | 'postalCode'
  | 'streetAddressLine1'
  | 'streetAddressLine2'
  | 'sublocality'
  | 'telephoneNumber'
  | 'username'
  | 'password'
  | 'newPassword'
  | 'oneTimeCode';
  rightIcon?: FC | ImageSourcePropType | JSX.Element;
  leftIcon?: FC | ImageSourcePropType | JSX.Element;
  textStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  secureTextEntry?: boolean;
};

type keyBoardType =
  | 'default'
  | 'decimal-pad'
  | 'number-pad'
  | 'phone-pad'
  | 'email-address';

const BasicTextInput: FC<IProps> = ({
  value, setValue, placeHolder, textContentType, rightIcon, leftIcon, textStyle, containerStyle, secureTextEntry,
}: IProps) => {
  let keyboard: keyBoardType = 'default';
  if (textContentType === 'emailAddress') {
    keyboard = 'email-address';
  } else if (textContentType === 'telephoneNumber') {
    keyboard = 'phone-pad';
  }
  return (
    <View style={[AuthStyles.TextInputContainer, containerStyle]}>
      {leftIcon}
      <TextInput
        style={[AuthStyles.TextInput, textStyle]}
        placeholder={placeHolder}
        placeholderTextColor="lightgrey"
        value={value}
        onChangeText={setValue}
        secureTextEntry={secureTextEntry}
        textContentType={textContentType}
        keyboardType={keyboard}
        autoCapitalize="none"
      />
      {rightIcon}
    </View>
  );
};

BasicTextInput.defaultProps = {
  placeHolder: '',
  textContentType: 'none',
  rightIcon: undefined,
  leftIcon: undefined,
  textStyle: {},
  containerStyle: {},
  secureTextEntry: false,
};

export default BasicTextInput;

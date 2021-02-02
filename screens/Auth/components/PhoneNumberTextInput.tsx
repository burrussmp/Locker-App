/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Phone number text input with country code picker and formatting
 *  */

import React, { useState, FC } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import CountryPicker, {
  CountryCode,
  Country,
} from 'react-native-country-picker-modal';
import AuthTextInput from 'screens/Auth/components/BasicTextInput';

const PhoneNumberTextInputStyles = StyleSheet.create({
  countryPickerContainer: {
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: 'darkgray',
    height: '100%',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

type IProps = {
  setValue: (phoneNumber: string) => void;
};

const PhoneNumberTextInput: FC<IProps> = ({ setValue }: IProps) => {
  const [countryCode, setCountryCode] = useState('US' as CountryCode);
  const [callingCode, setCallingCode] = useState('1');
  const [text, setText] = useState('');

  const handleCountryPick = (country: Country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
  };

  const handlePhoneTextChange = (phoneText: string) => {
    const insert = (str: string, index: number, value: string) => str.substr(0, index) + value + str.substr(index);
    let phoneNumber = phoneText.replace(/-|\)|\(/g, '');
    if (callingCode === '1') {
      if (phoneNumber.includes(`+${callingCode}`)) {
        phoneNumber = phoneNumber.replace(`+${callingCode}`, '');
      }
      if (phoneNumber.length > 0 && !phoneNumber.includes('(')) {
        phoneNumber = insert(phoneNumber, 0, '(');
      }
      if (phoneNumber.length > 4 && !phoneNumber.includes(')')) {
        phoneNumber = insert(phoneNumber, 4, ')');
      }
      if (
        phoneNumber.length > 5
        && (phoneNumber.match(/-/g) || []).length === 0
      ) {
        phoneNumber = insert(phoneNumber, 5, '-');
      }
      if (
        phoneNumber.length > 9
        && (phoneNumber.match(/-/g) || []).length === 1
      ) {
        phoneNumber = insert(phoneNumber, 9, '-');
      }
    }
    setText(phoneNumber);
    const cleanedPhoneNumber = `+${callingCode}${phoneNumber.replace(/-|\)|\(/g, '')}`;
    setValue(cleanedPhoneNumber);
  };
  return (
    <AuthTextInput
      placeHolder="Phone Number"
      leftIcon={(
        <TouchableOpacity>
          <CountryPicker
            containerButtonStyle={
              PhoneNumberTextInputStyles.countryPickerContainer
            }
            countryCode={countryCode}
            withFilter
            withEmoji
            withFlagButton={false}
            withCallingCodeButton
            withAlphaFilter
            withCallingCode
            onSelect={handleCountryPick}
          />
        </TouchableOpacity>
      )}
      value={text}
      setValue={handlePhoneTextChange}
      textContentType="telephoneNumber"
    />
  );
};

export default PhoneNumberTextInput;

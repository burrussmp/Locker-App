/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Phone number text input with country code picker and formatting
 *  */

import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import CountryPicker, {
  CountryCode,
  Country,
} from 'react-native-country-picker-modal';
import AuthTextInput from 'components/Auth/BasicTextInput';

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
/**
 * @desc Phone number text input with country code picker
 * and formatting
 * @param {function} setPhoneNumber A callback so parent can get state
 */
const PhoneNumberTextInput = (props: {setPhoneNumber: CallableFunction}) => {
  const setPhoneNumber = props.setPhoneNumber;
  const [countryCode, setCountryCode] = useState('US' as CountryCode);
  const [callingCode, setCallingCode] = useState('1');
  const [text, setText] = useState('');

  const handleCountryPick = (res: Country) => {
    setCountryCode(res.cca2);
    setCallingCode(res.callingCode[0]);
  };
  const handlePhoneTextChange = (text: string) => {
    const insert = (str: string, index: number, value: string) => {
      return str.substr(0, index) + value + str.substr(index);
    };
    let phoneNumber = text.replace(/-|\)|\(/g, '');
    if (callingCode === '1') {
      if (phoneNumber.includes('+' + callingCode)) {
        phoneNumber = phoneNumber.replace('+' + callingCode, '');
      }
      if (phoneNumber.length > 0 && !phoneNumber.includes('(')) {
        phoneNumber = insert(phoneNumber, 0, '(');
      }
      if (phoneNumber.length > 4 && !phoneNumber.includes(')')) {
        phoneNumber = insert(phoneNumber, 4, ')');
      }
      if (
        phoneNumber.length > 5 &&
        (phoneNumber.match(/-/g) || []).length === 0
      ) {
        phoneNumber = insert(phoneNumber, 5, '-');
      }
      if (
        phoneNumber.length > 9 &&
        (phoneNumber.match(/-/g) || []).length === 1
      ) {
        phoneNumber = insert(phoneNumber, 9, '-');
      }
    }
    setText(phoneNumber);
    const cleanedPhoneNumber =
      '+' + callingCode + phoneNumber.replace(/-|\)|\(/g, '');
    setPhoneNumber(cleanedPhoneNumber);
  };
  return (
    <AuthTextInput
      placeholder="Phone Number"
      LeftIcon={
        <TouchableOpacity>
          <CountryPicker
            containerButtonStyle={
              PhoneNumberTextInputStyles.countryPickerContainer
            }
            countryCode={countryCode}
            withFilter
            withEmoji={true}
            withFlagButton={false}
            withCallingCodeButton={true}
            withAlphaFilter
            withCallingCode
            onSelect={handleCountryPick}
          />
        </TouchableOpacity>
      }
      value={text}
      onChangeText={handlePhoneTextChange}
      textContentType="telephoneNumber"
    />
  );
};

export default PhoneNumberTextInput;

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Phone number text input with country code picker and formatting
 *  */

import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import CountryPicker, {
  CountryCode,
  Country,
} from 'react-native-country-picker-modal';
import AuthTextInput from 'components/Auth/BasicTextInput';

import AuthStyles from 'styles/Auth/Auth.Styles';

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
    let phone_number = text.replace(/-|\)|\(/g, '');
    if (phone_number.includes('+' + callingCode)) {
      phone_number = phone_number.replace('+' + callingCode, '');
    }
    if (callingCode === '1') {
      if (phone_number.length > 0 && !phone_number.includes('(')) {
        phone_number = insert(phone_number, 0, '(');
      }
      if (phone_number.length > 4 && !phone_number.includes(')')) {
        phone_number = insert(phone_number, 4, ')');
      }
      if (
        phone_number.length > 5 &&
        (phone_number.match(/-/g) || []).length === 0
      ) {
        phone_number = insert(phone_number, 5, '-');
      }
      if (
        phone_number.length > 9 &&
        (phone_number.match(/-/g) || []).length === 1
      ) {
        phone_number = insert(phone_number, 9, '-');
      }
    }
    setText(phone_number);
    const cleaned_phone_number =
      '+' + callingCode + phone_number.replace(/-|\)|\(/g, '');
    setPhoneNumber(cleaned_phone_number);
  };
  return (
    <AuthTextInput
      placeholder="Phone Number"
      LeftIcon={
        <TouchableOpacity>
          <CountryPicker
            containerButtonStyle={AuthStyles.CountryContainer}
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

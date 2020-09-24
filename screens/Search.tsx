/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @author Matthew P. Burruss
 * @date Sep 2020
 * @desc Authorization Screen
 */

import React, {useState} from 'react';
import {Platform, SafeAreaView, View} from 'react-native';
import {SearchBar} from 'react-native-elements';

import SearchStyles from 'components/Search/Search.Styles';
import BasicStyles from 'styles/styles';

const SearchScreen = () => {
  const ComponentStyles = SearchStyles.Header;
  const [search, updateSearch] = useState('');
  return (
    <SafeAreaView style={BasicStyles.droidSafeArea}>
      <View style={ComponentStyles.container}>
        <SearchBar
          placeholder="Search for a user..."
          onChangeText={updateSearch}
          value={search}
          platform={Platform.OS === 'ios' ? 'ios' : 'android'}
          // inputContainerStyle={{
          //   backgroundColor: "#eeeeeeee",
          //   width: '98%'
          // }}
        ></SearchBar>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

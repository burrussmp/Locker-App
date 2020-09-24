/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @author Matthew P. Burruss
 * @date Sep 2020
 * @desc Authorization Screen
 */

import React, {useState, Fragment} from 'react';
import {Text, SafeAreaView, View} from 'react-native';
import {SearchBar} from 'react-native-elements';

import SearchStyles from 'components/Search/Search.Styles';
import BasicStyles from 'styles/styles';

import api from 'api/api';

const SearchScreen = () => {
  const ComponentStyles = SearchStyles.SearchBar;
  const [search, updateSearch] = useState('');
  const [searchResults, setSearchResults] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeText = async (text: string) => {
    updateSearch(text);
    if (!text) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
      try {
        const data = await api.Search.GetUsers(text);
        setSearchResults(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    }
  };
  return (
    <Fragment>
      <SafeAreaView style={BasicStyles.safeArea} />
      <View style={{flex: 1}}>
        <SearchBar
          placeholder="Search for a user..."
          onChangeText={handleChangeText}
          value={search}
          platform={'default'}
          lightTheme
          containerStyle={ComponentStyles.searchContainerStyle}
          inputContainerStyle={ComponentStyles.searchInputContainerStyle}
          inputStyle={ComponentStyles.searchInputStyle}
          onCancel={() => {
            console.log('cancelling');
            setIsLoading(false);
          }}
          onClear={() => {
            console.log('clearing');
            setIsLoading(false);
          }}
          showCancel={true}
          showLoading={isLoading}
          round={true}
        ></SearchBar>
        <Text>{JSON.stringify(searchResults)}</Text>
      </View>
    </Fragment>
  );
};

export default SearchScreen;

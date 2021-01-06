/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * @author Matthew P. Burruss
 * @date Sep 2020
 * @desc Search users screen
 */

import React, {useState} from 'react';
import {View} from 'react-native';
import {SearchBar} from 'react-native-elements';
import SearchResults from 'containers/Search/Search.Results';
import SearchStyles from 'styles/Search/Search.Styles';
import api from 'api/api';
import SafeArea from 'components/Common/SafeArea';

/**
 * @desc Main container for searching users
 */
const SearchUsers = () => {
  const [search, updateSearch] = useState('');
  const [searchData, setSearchData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeText = async (text: string) => {
    updateSearch(text);
    if (!text) {
      setTimeout(() => setSearchData(null), 200); // race condition
    } else {
      setIsLoading(true);
      try {
        const data = await api.Search.Users(text);
        if (search) {
          setSearchData(data);
        } else {
          setSearchData(null);
        }
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    }
  };
  return (
    <SafeArea
      children={
        <View style={{flex: 1}}>
          <SearchBar
            placeholder="Search for a user..."
            onChangeText={handleChangeText}
            value={search}
            platform={'default'}
            lightTheme
            containerStyle={SearchStyles.searchContainerStyle}
            inputContainerStyle={SearchStyles.searchInputContainerStyle}
            inputStyle={SearchStyles.searchInputStyle}
            onCancel={() => {
              setIsLoading(false);
            }}
            onClear={() => {
              setIsLoading(false);
            }}
            showCancel={true}
            showLoading={isLoading}
            round={true}
          ></SearchBar>
          <SearchResults searchResults={searchData} />
        </View>
      }
    />
  );
};

export default SearchUsers;

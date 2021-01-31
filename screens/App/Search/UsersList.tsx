/**
 * @author Matthew P. Burruss
 * @date 1/30/2021
 * @desc Search users screen
 */

import React, { useState, FC } from 'react';
import { Alert, View } from 'react-native';
import { SearchBar } from 'react-native-elements';

import api, { APIErrorType } from 'api/api';
import { UserSearchResultsType } from 'api/search';

import SearchResults from 'screens/App/Search/Results';
import SafeArea from 'common/components/SafeArea';

import SearchStyles from 'styles/Search/Search.Styles';

const SearchUsers: FC = () => {
  const [search, updateSearch] = useState('');
  const [searchData, setSearchData] = useState<UserSearchResultsType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeText = (text: string) => {
    updateSearch(text);
    if (!text) {
      setTimeout(() => setSearchData(null), 200);
    } else {
      setIsLoading(true);
      api.Search.Users(text).then((data) => {
        if (search) {
          setSearchData(data);
        } else {
          setSearchData(null);
        }
      }).catch((err: APIErrorType) => {
        Alert.alert(err.error);
      });
      setIsLoading(false);
    }
  };
  return (
    <SafeArea>
      <View style={{ flex: 1 }}>
        <SearchBar
          placeholder="Search for a user..."
          onChangeText={handleChangeText}
          value={search}
          platform="default"
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
          showCancel
          showLoading={isLoading}
          round
        />
        {searchData ? <SearchResults searchResults={searchData} /> : undefined}
      </View>
    </SafeArea>
  );
};

export default SearchUsers;

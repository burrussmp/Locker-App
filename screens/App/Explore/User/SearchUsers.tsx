/**
 * @author Matthew P. Burruss
 * @date 1/30/2021
 * @desc Search users screen
 */

import React, { useState, FC } from 'react';
import {
  Alert, Text, StyleSheet, View,
} from 'react-native';
import { SearchBar } from 'react-native-elements';

import api, { APIErrorType } from 'api/api';
import { UserSearchResultsType } from 'api/search';

import TagList from 'common/containers/TagList';

import SearchResults from 'screens/App/Explore/User/SearchUsers.ListRows';
import SafeArea from 'common/components/SafeArea';

const SearchStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    marginLeft: 15,
    marginBottom: 20,
    marginTop: 20,
  },
  headerText: {
    fontSize: 30,
    fontFamily: 'CircularBlack',
  },
  searchInputContainerStyle: {
    backgroundColor: '#eee',
  },
  searchContainerStyle: {
    backgroundColor: '#fff',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  searchInputStyle: {
    color: '#444',
  },
  searchTagContainer: {
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: 10,
  },
  searchTagTextContainer: {

  },
  searchText: {
    fontSize: 14,
    fontFamily: 'CircularBlack',
  },
});

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
      <View style={SearchStyles.container}>
        <View style={SearchStyles.headerContainer}>
          <Text style={SearchStyles.headerText}>Explore</Text>
        </View>
        <View style={SearchStyles.searchTagContainer}>
          <TagList
            horizontal
            tags={['Stores', 'Clothes', 'Users', 'Popular', 'Outfits', 'Sustainable Products']}
            tagContainerStyle={SearchStyles.searchTagTextContainer}
            textStyle={SearchStyles.searchText}
          />
        </View>
        <SearchBar
          placeholder="Type to search..."
          onChangeText={handleChangeText}
          value={search}
          platform="default"
          containerStyle={SearchStyles.searchContainerStyle}
          lightTheme
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

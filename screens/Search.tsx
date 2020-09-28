/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * @author Matthew P. Burruss
 * @date Sep 2020
 * @desc Authorization Screen
 */

import React, {useState} from 'react';
import {View, FlatList} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from 'screens/Profile';
import SearchResults from 'containers/Search/Search.Results';

import SearchStyles from 'styles/Search/Search.Styles';
import api from 'api/api';
import SafeArea from 'components/Common/SafeArea';
import {SearchResultsType} from 'types/Search/Search.Types';


const SearchScreen = () => {
  const ComponentStyles = SearchStyles.SearchBar;
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
        const data = await api.Search.GetUsers(text);
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
            containerStyle={ComponentStyles.searchContainerStyle}
            inputContainerStyle={ComponentStyles.searchInputContainerStyle}
            inputStyle={ComponentStyles.searchInputStyle}
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

const SearchNavigation = (props: any) => {
  const SearchNavigator = createStackNavigator();
  return (
    <SearchNavigator.Navigator headerMode="screen">
      <SearchNavigator.Screen
        name="SearchUsers"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <SearchNavigator.Screen
        name="FoundUser"
        children={props => {
          if (props.route.params && props.route.params.userId) {
            return <ProfileScreen userId={props.route.params.userId} />;
          } else {
            throw 'Error: Navigating to the FoundUser but not userID';
          }
        }}
        options={{
          headerShown: false,
        }}
      />
    </SearchNavigator.Navigator>
  );
};

export default SearchNavigation;

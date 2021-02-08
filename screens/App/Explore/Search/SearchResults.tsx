/**
 * @author Matthew P. Burruss
 * @date 1/30/2021
 * @desc Container to hold search results
 */

import React, { FC } from 'react';
import {
  FlatList, StyleSheet, Text, View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { OrganizationSearchResultsType, UserSearchResultsType } from 'api/search';
import SearchRow from 'screens/App/Explore/Search/Search.Row';

const styles = StyleSheet.create({
  defaultHeaderTextStyle: {
    fontSize: 20,
    fontFamily: 'CircularBlack',
    color: '#555',
  },
  defaultInputContainerStyle: {
    backgroundColor: '#eee',
  },
  defaultInputStyle: {
    color: '#444',
  },
});

type IProps = {
  searchData: {
    users: UserSearchResultsType | undefined;
    organizations: OrganizationSearchResultsType | undefined;
  } | undefined;
};

const SearchResults: FC<IProps> = ({ searchData }: IProps) => (
  <View>
    <FlatList
      data={searchData?.organizations || []}
      renderItem={({ item }) => (
        <SearchRow
          title={item.data.name}
          subTitle="Shop"
          media={item.data.logo}
          onPress={() => {
            useNavigation().navigate('FoundOrganization', { organizationId: item.data._id });
          }}
        />
      )}
      keyExtractor={(item: OrganizationSearchResultsType[0]) => item.data.name}
      ItemSeparatorComponent={() => <View style={{ height: 0 }} />}
    />
    <FlatList
      data={searchData?.users || []}
      renderItem={({ item }) => (
        <SearchRow
          title={item.data.username}
          subTitle={'Locker' || `${item.data.first_name || ''} ${item.data.last_name || ''}`}
          media={item.data.profile_photo}
          onPress={() => {
            useNavigation().navigate('FoundUser', { userId: item.data._id });
          }}
        />
      )}
      keyExtractor={(item: UserSearchResultsType[0]) => item.data.username}
      ItemSeparatorComponent={() => <View style={{ height: 0 }} />}
    />
  </View>
);

export default SearchResults;

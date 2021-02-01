/**
 * @author Matthew P. Burruss
 * @date 1/30/2021
 * @desc Container to hold search results
 */

import React, { FC } from 'react';
import { FlatList, View } from 'react-native';
import { UserSearchResultsType } from 'api/search';
import SearchRow from 'screens/App/Search/User/components/SearchUsers.Row';

type IProps = {
  searchResults: UserSearchResultsType;
};

const SearchResults: FC<IProps> = ({ searchResults }: IProps) => (
  <FlatList
    data={searchResults}
    renderItem={(listItem) => <SearchRow userSearchResult={listItem.item} />}
    keyExtractor={(item: UserSearchResultsType[0]) => (item ? item.data.username : '404')}
    ItemSeparatorComponent={() => <View style={{ height: 0 }} />}
    ListHeaderComponent={() => <View style={{ height: 0 }} />}
  />
);

export default SearchResults;

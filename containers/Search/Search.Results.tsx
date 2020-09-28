/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Container to hold search results
 */

import React from 'react';
import {FlatList, View} from 'react-native';
import {SearchResultsType} from 'types/Search/Search.Types';
import SearchItem from 'components/Search/Search.Item';

/**
 * @desc A container to hold all search results
 * @param {[SearchResultsType]} searchResults An array of search results to render
 */
const SearchResults = (props: {searchResults: [SearchResultsType]}) => {
  return (
    <FlatList
      data={props.searchResults}
      renderItem={(item: any) => <SearchItem item={item.item} />}
      keyExtractor={item => (item ? item.data.username : '404')}
      ItemSeparatorComponent={() => {
        return <View style={{height: 0}} />;
      }}
      ListHeaderComponent={() => {
        return <View style={{height: 0}} />;
      }}
    />
  );
};

export default SearchResults;
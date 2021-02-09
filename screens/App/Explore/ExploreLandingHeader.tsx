/**
 * @author Matthew P. Burruss
 * @date 1/30/2021
 * @desc The header of the main explore page.
 */

import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import SearchBar, { SearchState, SearchActions } from 'common/components/input/SearchBar';

const styles = StyleSheet.create({
  headerContainer: {
    marginLeft: 15,
    marginBottom: 5,
    marginTop: 5,
  },
  headerText: {
    fontSize: 30,
    fontFamily: 'CircularBlack',
  },
});

type IProps = {
  searchState: SearchState;
  searchDispatch: (action: SearchActions) => void;
}

const ExploreLandingHeader: FC<IProps> = ({ searchState, searchDispatch }: IProps) => (
  <View>
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Explore</Text>
    </View>
    <SearchBar state={searchState} dispatch={searchDispatch} />
  </View>
);

export default ExploreLandingHeader;

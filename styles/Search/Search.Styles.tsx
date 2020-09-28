/**
 * @author Matthew P. Burruss
 * @date Sep 2020
 * @desc Authorization Screen
 */
import {StyleSheet} from 'react-native';

const SearchBarStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInputContainerStyle: {
    backgroundColor: '#eee',
  },
  searchContainerStyle: {
    backgroundColor: '#fff',
  },
  searchInputStyle: {
    color: '#444',
  },
});

const SearchStyles = {
  SearchBar: SearchBarStyles,
};

export default SearchStyles;

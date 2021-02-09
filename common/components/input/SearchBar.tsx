/**
 * @author Matthew P. Burruss
 * @date 2/7/2021
 * @desc Search Bar
 */

import React, { useState, FC } from 'react';
import {
  Alert, StyleSheet, TextStyle, ViewStyle,
} from 'react-native';
import { SearchBar } from 'react-native-elements';

import api, { APIErrorType } from 'api/api';
import { GenericSearchType, UserSearchResultsType, OrganizationSearchResultsType } from 'api/search';

type AllSearchTypes = 'Users' | 'Organizations' | 'All';

export type SearchState = {
  searchType: AllSearchTypes;
  data: {
    users: UserSearchResultsType | undefined;
    organizations: OrganizationSearchResultsType | undefined;
  } | undefined,
  text: string;
}

export const searchInitialState: SearchState = {
  searchType: 'All',
  data: undefined,
  text: '',
};

export const CLEAR_SEARCH = 'clear';
export const SEARCH = 'search';
export const SET_DATA = 'set_data';
export const SET_SEARCH_TYPE = 'set_search_type';

export type SearchAction = {
  type: typeof SEARCH,
  text: string;
  searchType?: AllSearchTypes;
};

export type DataAction = {
  type: typeof SET_DATA,
  data: GenericSearchType;
  searchType: AllSearchTypes;
};

export type SetSearchTypeAction = {
  type: typeof SET_SEARCH_TYPE,
  searchType: AllSearchTypes;
};

export type ClearSearchAction = {
  type: typeof CLEAR_SEARCH,
  searchType?: AllSearchTypes;
}

export type SearchActions = SearchAction | DataAction | SetSearchTypeAction | ClearSearchAction;

export const SearchReducer = (state: SearchState, action: SearchActions): SearchState => {
  switch (action.type) {
    case SEARCH:
      return { ...state, text: action.text, searchType: action.searchType ? action.searchType : state.searchType };
    case SET_SEARCH_TYPE:
      return { ...state, searchType: action.searchType };
    case CLEAR_SEARCH:
      return {
        ...state,
        data: action.searchType ? {
          users: ['Users', 'All'].includes(action.searchType) ? undefined : state.data?.users,
          organizations: ['Organizations', 'All'].includes(action.searchType) ? undefined : state.data?.organizations,
        } : undefined,
      };
    case SET_DATA:
      return {
        ...state,
        data: {
          users: ['Users', 'All'].includes(action.searchType) ? action.data : state.data?.users,
          organizations: ['Organizations', 'All'].includes(action.searchType) ? action.data : state.data?.organizations,
        },
      };
    default:
      return state;
  }
};

const styles = StyleSheet.create({
  defaultContainerStyle: {
    backgroundColor: '#fff',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  defaultInputContainerStyle: {
    backgroundColor: '#eee',
  },
  defaultInputStyle: {
    color: '#444',
  },
});

type IProps = {
  state: SearchState,
  dispatch: (value: SearchActions) => void;
  containerStyle?: ViewStyle;
  inputContainerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  placeHolder?: string;
}

const MySearchBar: FC<IProps> = ({
  state, dispatch, containerStyle, inputContainerStyle, placeHolder, inputStyle,
}: IProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onChangeText = (text: string) => {
    dispatch({ type: SEARCH, text });
    setIsLoading(true);
    if (!text) {
      dispatch({ type: CLEAR_SEARCH });
      setTimeout(() => dispatch({ type: CLEAR_SEARCH }), 100);
    } else {
      if (['Users', 'All'].includes(state.searchType)) {
        api.Search.Users(text).then((searchData) => {
          dispatch({ type: SET_DATA, data: searchData, searchType: 'Users' });
        }).catch((err: APIErrorType) => {
          Alert.alert(err.error);
        });
      }
      if (['Organizations', 'All'].includes(state.searchType)) {
        api.Search.Organizations(text).then((searchData) => {
          dispatch({ type: SET_DATA, data: searchData, searchType: 'Organizations' });
        }).catch((err: APIErrorType) => {
          Alert.alert(err.error);
        });
      }
    }
    setIsLoading(false);
  };

  return (
    <SearchBar
      placeholder={placeHolder}
      onChangeText={onChangeText}
      value={state.text}
      platform="default"
      containerStyle={[styles.defaultContainerStyle, containerStyle]}
      lightTheme
      inputContainerStyle={[styles.defaultInputContainerStyle, inputContainerStyle]}
      inputStyle={[styles.defaultInputStyle, inputStyle]}
      onCancel={() => {
        onChangeText('');
      }}
      onClear={() => {
        onChangeText('');
      }}
      showCancel
      showLoading={isLoading}
      round
    />
  );
};

MySearchBar.defaultProps = {
  containerStyle: {},
  inputContainerStyle: {},
  inputStyle: {},
  placeHolder: 'Type to search...',
};

export default MySearchBar;

/**
 * @author Matthew P. Burruss
 * @date 2/7/2021
 * @desc Types for React navigation
*/
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type ExploreParamList = {
  ExploreLanding: undefined;
  FoundUser: undefined;
  SearchSpecific: {
    type: string;
  }
};

export type ExploreProp = {
  navigation: StackNavigationProp<ExploreParamList, 'ExploreLanding'>;
  route: RouteProp<ExploreParamList, 'ExploreLanding'>;
};

export type FoundUserProp = {
  navigation: StackNavigationProp<ExploreParamList, 'FoundUser'>;
  route: RouteProp<ExploreParamList, 'FoundUser'>;
};

export type SearchSpecificProp = {
  navigation: StackNavigationProp<ExploreParamList, 'SearchSpecific'>;
  route: RouteProp<ExploreParamList, 'SearchSpecific'>;
};

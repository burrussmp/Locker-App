/**
 * @author Matthew P. Burruss
 * @date 1/27/2021
 * @desc Types for React navigation
*/
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type FeedParamList = {
  Feed: undefined;
  PostDetails: undefined;
};

export type FeedProp = {
  navigation: StackNavigationProp<FeedParamList, 'Feed'>;
  route: RouteProp<FeedParamList, 'Feed'>;
};

export type PostDetailsProp = {
  navigation: StackNavigationProp<FeedParamList, 'PostDetails'>;
  route: RouteProp<FeedParamList, 'PostDetails'>;
};

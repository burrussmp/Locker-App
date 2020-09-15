/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Selectors are easy ways to retrieve certain information from the store
 */

import {Animated} from 'react-native';

const homeScrollTracker = (state: any): Animated.Value => {
  return state.home.scrollY;
};

export default {
  homeScrollTracker,
};

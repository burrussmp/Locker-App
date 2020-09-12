/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Selectors are easy ways to retrieve certain information from the store
 */

import {Animated} from 'react-native';

const homeScroll = (state: any): Animated.Value => {
  if (state.home.scrollY !== undefined) {
    return state.home.scrollY;
  } else {
    return new Animated.Value(0);
  }
};

export default {
  homeScroll,
};

/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Selectors are easy ways to retrieve certain information from the store
 */

import { Animated } from 'react-native';
import { RootState } from 'store/index';

const homeScrollTracker = (state: RootState): Animated.Value => state.home.scrollY;

export default {
  homeScrollTracker,
};

/**
 * @author Paul H. Sullivan
 * @date Aug 2020
 * @desc The slice reducer for home. Handles all the logic necessary to
 * produce a new state given the old state and the action
 */

import {Animated} from 'react-native';
import {HomeActions, SCROLL} from 'store/types/home.types';

interface HomeState {
  scrollY: Animated.Value;
}

const HomeInitialState = {
  scrollY: new Animated.Value(0),
};

const HomeReducer = (
  state = HomeInitialState,
  action: HomeActions
): HomeState => {
  switch (action.type) {
    case SCROLL:
      return {
        scrollY: new Animated.Value(action.scrollY),
      };
    default:
      return state;
  }
};

export default HomeReducer;

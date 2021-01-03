/**
 * @author Paul H. Sullivan
 * @date Aug 2020
 * @desc The slice reducer for home. Handles all the logic necessary to
 * produce a new state given the old state and the action
 */

import { Animated } from 'react-native';
import { HomeActions, CHANGE_TAB } from 'store/types/home.types';

interface HomeState {
  scrollY: Animated.Value;
}

const HomeInitialState = {
  scrollY: new Animated.Value(0),
};

const HomeReducer = (state = HomeInitialState, action: HomeActions): HomeState => {
  switch (action.type) {
    case CHANGE_TAB:
      return {
        scrollY: action.scrollTracker,
      };
    default:
      return state;
  }
};

export default HomeReducer;

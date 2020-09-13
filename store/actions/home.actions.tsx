/**
 * @author Paul H. Sullivan
 * @date Aug 2020
 * @desc All the actions necessary to update home
 * Actions in redux are dispatched to the store. The store uses the appropriate reducer
 * to change the state based on the current state and the dispatched action.
 */

import {Animated} from 'react-native'
import {HomeActions, CHANGE_TAB} from 'store/types/home.types';

const ChangeTab = (scrollTracker: Animated.Value): HomeActions => {
  return {
    type: CHANGE_TAB,
    scrollTracker: scrollTracker,
  };
};

export default {
  ChangeTab,
};

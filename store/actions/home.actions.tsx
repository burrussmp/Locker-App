/**
 * @author Paul H. Sullivan
 * @date Aug 2020
 * @desc All the actions necessary to update home
 * Actions in redux are dispatched to the store. The store uses the appropriate reducer
 * to change the state based on the current state and the dispatched action.
 */

import {HomeActions, SCROLL} from 'store/types/home.types';

const Scroll = (scrollY: number): HomeActions => {
  return {
    type: SCROLL,
    scrollY: scrollY,
  };
};

export default {
  Scroll,
};

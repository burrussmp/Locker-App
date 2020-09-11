/**
 * @author Paul H. Sullivan
 * @date Aug 2020
 * @desc All the actions necessary to update home
 * Actions in redux are dispatched to the store. The store uses the appropriate reducer
 * to change the state based on the current state and the dispatched action.
 */

import {HomeActions, SCROLL} from 'store/types/home.types';

const Scroll = (value: number): HomeActions => {
  return {
    type: SCROLL,
    value: value,
  };
};

export default {
  Scroll,
};

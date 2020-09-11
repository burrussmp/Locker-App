import {last} from 'lodash';
/**
 * @author Paul H. Sullivan
 * @date Aug 2020
 * @desc The slice reducer for home. Handles all the logic necessary to
 * produce a new state given the old state and the action
 */

import {HomeActions, SCROLL} from 'store/types/home.types';

interface HomeState {
  lastScroll: number;
  headerHeight: number;
}

const HomeInitialState = {
  lastScroll: 0,
  headerHeight: 48,
};

const maxHeader = 48;
const minHeader = 2;

const HomeReducer = (
  state = HomeInitialState,
  action: HomeActions
): HomeState => {
  switch (action.type) {
    case SCROLL:
      if (
        action.value > state.lastScroll &&
        state.headerHeight - action.value + state.lastScroll < minHeader
      )
        return {
          lastScroll: action.value,
          headerHeight: minHeader,
        };
      else if (
        action.value > state.lastScroll &&
        state.headerHeight - action.value + state.lastScroll >= minHeader
      )
        return {
          lastScroll: action.value,
          headerHeight: state.headerHeight - action.value + state.lastScroll,
        };
      else if (
        action.value < state.lastScroll &&
        state.headerHeight + action.value - state.lastScroll < maxHeader
      )
        return {
          lastScroll: action.value,
          headerHeight: state.headerHeight + action.value - state.lastScroll,
        };
      else if (
        action.value < state.lastScroll &&
        state.headerHeight + action.value - state.lastScroll >= maxHeader
      )
        return {
          lastScroll: action.value,
          headerHeight: maxHeader,
        };
      return state;
    default:
      return state;
  }
};

export default HomeReducer;

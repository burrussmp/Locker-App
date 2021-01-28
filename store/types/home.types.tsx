/**
 * @author Paul H. Sullivan
 * @date Sep 2020
 * @desc Necessary for typescript use of react redux. Specify the types that the actions/reducer needs to define appropriately
 */

import { Animated } from 'react-native';

export const CHANGE_TAB = 'home/change_tab';

export interface ChangeTabAction {
  type: typeof CHANGE_TAB;
  scrollTracker: Animated.Value;
}

export type HomeActions = ChangeTabAction;

export interface HomeState {
  scrollY: Animated.Value;
}

/**
 * @author Paul H. Sullivan
 * @date Sep 2020
 * @desc Necessary for typescript use of react redux. Specify the types that the actions/reducer needs to define appropriately
 */

export const SCROLL = 'scroll';

interface ScrollAction {
  type: typeof SCROLL;
  scrollY: number;
}

export type HomeActions = ScrollAction;

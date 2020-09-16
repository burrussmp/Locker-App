/**
 * @author Paul H. Sullivan
 * @date Sep 2020
 * @desc Necessary for typescript use of react redux. Specify the types that the actions/reducer needs to define appropriately
 */

export const EXPAND = 'home/expand_post';
export const CONTRACT = 'home/contract_post';

interface ExpandPostAction {
  type: typeof EXPAND;
}
interface ContractPostAction {
  type: typeof CONTRACT;
}

export type PostActions = ExpandPostAction | ContractPostAction;

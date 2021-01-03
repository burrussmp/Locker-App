/**
 * @author Paul H. Sullivan
 * @date Aug 2020
 * @desc All the actions necessary to update post interaction state
 * Actions in redux are dispatched to the store. The store uses the appropriate reducer
 * to change the state based on the current state and the dispatched action.
 */

import { PostActions, EXPAND, CONTRACT } from 'store/types/post.types';

const ExpandPost = (): PostActions => ({
  type: EXPAND,
});

const ContractPost = (): PostActions => ({
  type: CONTRACT,
});

export default {
  ExpandPost,
  ContractPost,
};

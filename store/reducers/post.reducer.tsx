/**
 * @author Paul H. Sullivan
 * @date Aug 2020
 * @desc The slice reducer for home. Handles all the logic necessary to
 * produce a new state given the old state and the action
 */

import {PostActions, EXPAND, CONTRACT} from 'store/types/post.types';

interface PostState {
  isExpanded: boolean;
}

const PostInitialState = {
  isExpanded: false,
};

const PostReducer = (
  state = PostInitialState,
  action: PostActions
): PostState => {
  switch (action.type) {
    case EXPAND:
      return {
        isExpanded: true,
      };
    case CONTRACT:
      return {
        isExpanded: false,
      };
    default:
      return state;
  }
};

export default PostReducer;

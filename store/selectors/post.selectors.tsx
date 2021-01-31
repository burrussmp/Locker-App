/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Selectors are easy ways to retrieve certain information from the store
 */
import { PostState } from 'store/types/post.types';

const isExpanded = (postState: PostState): boolean => postState.isExpanded;

export default {
  isExpanded,
};

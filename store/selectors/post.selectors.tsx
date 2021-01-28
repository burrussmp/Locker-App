/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Selectors are easy ways to retrieve certain information from the store
 */
import { RootState } from 'store/index';

const isExpanded = (state: RootState): boolean => state.post.isExpanded;

export default {
  isExpanded,
};

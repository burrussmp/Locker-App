/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Selectors are easy ways to retrieve certain information from the store
 */

const isExpanded = (state: any): boolean => {
  return state.post.isExpanded;
};

export default {
  isExpanded,
};

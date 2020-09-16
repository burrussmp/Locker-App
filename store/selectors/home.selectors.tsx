/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Selectors are easy ways to retrieve certain information from the store
 */

const headerHeight = (state: any): number => {
  return state.home.headerHeight;
};

export default {
  headerHeight,
};

/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Selectors are easy ways to retrieve certain information from the store
 */

const isLoggedIn = (state: any): boolean => {
  if (state.auth.token != '') {
    return true;
  } else {
    return false;
  }
};

export default {
  isLoggedIn,
};

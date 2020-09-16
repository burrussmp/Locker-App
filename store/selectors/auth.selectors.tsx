import auth from 'api/auth';

/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Selectors are easy ways to retrieve certain information from the store
 */

const isLoggedIn = (state: any): boolean => {
  return (
    state.auth.session && state.auth.verified && state.auth.session.access_token
  );
};

export default {
  isLoggedIn,
};

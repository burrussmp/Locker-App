import auth from 'api/auth';

/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Selectors are easy ways to retrieve certain information from the store
 */

const isLoggedIn = async (state: any): Promise<boolean> => {
  try {
    console.log(state.auth);
    await auth.VerifyToken(state.auth.access_token);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export default {
  isLoggedIn,
};

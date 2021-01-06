/* eslint-disable no-redeclare */
/**
 * @description Search API
 * @author Matthew P. Burruss
 * @date 12/24/2020
 */
import utils from 'api/utils';
import * as T from 'io-ts';

/**
 * @desc Results when a user search is performed
 */
export const UserSearchResults = T.array(
  T.type({
    data: T.type({
      _id: T.string,
      username: T.string,
      profile_photo: T.union([
        T.type({
          _id: T.string,
          key: T.string,
          mimetype: T.string,
          blurhash: T.union([T.undefined, T.string]),
        }), T.undefined]),
      first_name: T.union([T.undefined, T.string]),
      last_name: T.union([T.undefined, T.string]),
    }),
    score: T.number,
  }),
);
export type UserSearchResults = T.TypeOf<typeof UserSearchResults>;

/**
 * @desc Search for users based on text. You can retrieve a user by their username,
 * first name, and last name with precedence given to username matches.
 * @param {string} search Search text.
 * @return {Promise<SearchResults>} A list of users that match the search and the respective confidence.
 */
const Users = async (search: string): Promise<UserSearchResults> => {
  const res = await utils.postRequest('/api/search/users', { search });
  return await res.json() as UserSearchResults;
};

export default {
  Users,
};

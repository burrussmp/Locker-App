/**
 * @description Search API
 * @author Matthew P. Burruss
 * @date 12/24/2020
 */
import utils from 'api/utils';

type UserSearchResults = [{
  'data': {'_id': string,
    'username': string,
    'profile_photo': {
      'blurhash': string,
      'mimetype': string,
      'key': string,
    },
    'first_name': string,
    'last_name': string,
  },
  'score': number,
}];

/**
 * @desc Search for users based on text
 * @param {string} search Search text.
 * @return {Promise<SearchResults>} A list of users that match the search and the respective confidence.
 */
const GetUsers = async (search: string): Promise<UserSearchResults> => {
  const res = await utils.getRequest('/api/search/users', { search });
  return await res.json() as UserSearchResults;
};

export default {
  GetUsers,
};

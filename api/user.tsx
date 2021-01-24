/* eslint-disable no-redeclare */
/**
 * @description Users API
 * @author Matthew P. Burruss
 * @date 12/24/2020
 */
import AuthActions from 'store/actions/auth.actions';
import store from 'store/index';
import utils from 'api/utils';
import * as T from 'io-ts';

/**
 * @desc Following list type
*/
export const FollowingListType = T.type({
  following: T.array(
    T.type({ _id: T.string, username: T.string }),
  ),
  followers: T.array(
    T.type({ _id: T.string, username: T.string }),
  ),
});
export type FollowingListType = T.TypeOf<typeof FollowingListType>;

/**
 * @desc User list type
 */
export const UsersListType = T.array(
  T.type({
    _id: T.string,
    username: T.string,
    updatedAt: T.string,
    createdAt: T.string,
  }),
);
export type UsersListType = T.TypeOf<typeof UsersListType>;

/**
 * @desc User details
 */
export const UserInfoType = T.type({
  _id: T.string,
  active: T.boolean,
  about: T.string,
  cognito_username: T.string,
  username: T.string,
  first_name: T.union([T.undefined, T.string]),
  last_name: T.union([T.undefined, T.string]),
  createdAt: T.string,
  updatedAt: T.string,
  profile_photo: T.union([
    T.type({
      _id: T.string,
      key: T.string,
      mimetype: T.string,
      blurhash: T.union([T.undefined, T.string]),
    }), T.undefined]),
  following: T.array(
    T.type(
      {
        _id: T.string,
      },
    ),
  ),
  followers: T.array(
    T.type(
      {
        _id: T.string,
      },
    ),
  ),
});
export type UserInfoType = T.TypeOf<typeof UserInfoType>;

/**
 * @desc List all users
 * @return {Promise<UsersListType>} A list of all the users.
 */
const GetAll = async (): Promise<UsersListType> => {
  const res = await utils.getRequest('/api/users');
  return await res.json() as UsersListType;
};

/**
 * @desc Get specific user's information. If not provided, get self.
 * @param {string | undefined} userId The user ID of a user.
 * @return {Promise<UserInfoType>} The information of a user
 */
const GetByID = async (userId?: string): Promise<UserInfoType> => {
  const res = await utils.getRequest(`/api/users/${userId || utils.getIDAndAccessToken()._id}`);
  return await res.json() as UserInfoType;
};

/**
 * @desc Delete yourself and logout.
 * @return {Promise<UserInfoType>} The info of yourself.
 */
const DeleteMe = async (): Promise<UserInfoType> => {
  const res = await utils.deleteRequest(`/api/users/${utils.getIDAndAccessToken()._id}`);
  store.dispatch(AuthActions.Logout());
  return await res.json() as UserInfoType;
};

/**
 * @desc Update the password of a user.
 * @param {string} newPassword The new password.
 * @param {string} oldPassword The old password.
 * @return {Promise<{message: string}>} A success message
 */
const UpdatePassword = async (newPassword: string, oldPassword: string): Promise<{message: string}> => {
  const res = await utils.putRequest(`/api/users/${utils.getIDAndAccessToken()._id}/password`, {
    password: newPassword,
    old_password: oldPassword,
  });
  return await res.json() as {message: string};
};

/**
 * @desc Follow someone
 * @param {string} userId The user ID of a user.
 * @return {Promise<{message: string}>} A success message
  ```
 */
const Follow = async (userId: string): Promise<{message: string}> => {
  const res = await utils.putRequest(`/api/users/${userId}/follow`);
  return await res.json() as {message: string};
};

/**
 * @desc Unfollow someone
 * @param {string} userId The user ID of a user.
 * @return {Promise<{message: string}>} A success message
 */
const Unfollow = async (userId: string): Promise<{message: string}> => {
  const res = await utils.deleteRequest(`/api/users/${userId}/follow`);
  return await res.json() as {message: string};
};

/**
 * @desc List someone's following/followers
 * @param {string} userId The user ID of a user.
 * @return {Promise<FollowingListType>} A users's list of followers/followings.
 */
const GetFollowing = async (userId: string): Promise<FollowingListType> => {
  const res = await utils.getRequest(`/api/users/${userId}/follow`);
  return await res.json() as FollowingListType;
};

export default {
  UpdatePassword,
  Follow,
  Unfollow,
  GetFollowing,
  GetAll,
  GetByID,
  DeleteMe,
};

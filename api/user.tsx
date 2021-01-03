/**
 * @description Users API
 * @author Matthew P. Burruss
 * @date 12/24/2020
 */
import utils from 'api/utils';

/**
 * @desc Following list type
 */
export type FollowingList = {
  following: [{_id: string; username: string}];
  followers: [{_id: string; username: string}];
};

/**
 * @desc User list type
 */
export type UsersList = [
  {
    _id: string;
    username: string;
    updatedAt: string;
    createdAt: string;
  }
];

/**
 * @desc User details
 */
export type UserInfo = {
  '_id': string;
  'about': string;
  'cognito_username': string;
  'username': string;
  'first_name'?: string;
  'last_name'?: string;
  'createdAt': string;
  'updatedAt': string;
  'profile_photo'?: {
    '_id': string;
    'key': string;
    'mimetype': string;
    'blurhash': string;
  };
  'following': [
    {
      _id: string;
    }
  ];
  'followers': [
    {
      _id: string;
    }
  ];
};

/**
 * @desc List all users
 * @return {Promise<UsersList>} A list of all the users.
 * @success
  ```
[{
    "_id": "5f34821b0c46f63b28831230",
    "username": "userA",
    "updated": "2020-08-12T23:58:19.944Z",
    "created": "2020-08-12T23:58:19.944Z"
  },
  {
    "_id": "5f34821c0c46f63b28831231",
    "username": "userB",
    "updatedAt": "2020-08-12T23:58:20.137Z",
    "createdAt": "2020-08-12T23:58:20.137Z"
  }]
```
 */
const GetAll = async (): Promise<UsersList> => {
  const res = await utils.getRequest('/api/users');
  return await res.json() as UsersList;
};

/**
 * @desc Get specific user's information
 * @param {string} userID The user ID of a user.
 * @return {Promise<UserInfo>} The information of a user
 * @success
  ```
    {
        "about": "This is a bio",
        "following": [{
            "_id" : "5f6565f0c1708f4ad08477c7",
        }],
        "followers": [],
        "_id": "5f6565f0c1708f4ad08477c7",
        "cognito_username": "5627cc28-bb8f-4806-9cc9-30e2f4d042ed",
        "username": "matthew5",
        "first_name": "matt",
        "last_name": "burr",
        "createdAt": "2020-09-19T01:59:12.041Z",
        "updatedAt": "2020-09-19T02:00:28.398Z",
        "profile_photo": {
            "_id": "5f65663cc1708f4ad08477c8",
            "key": "397fec5422857e916e1fa0abeea28e32_profile_photo",
            "mimetype": "image/jpeg"
    }
  ```
 */
const GetByID = async (userId: string): Promise<UserInfo> => {
  const res = await utils.getRequest(`/api/users/${userId}`);
  return await res.json() as UserInfo;
};

/**
 * @desc Delete yourself
 * @return {Promise<UserInfo>} The info of yourself.
 * @success
  ```
 {
    "permissions": [
        "post:read",
        "post:interact",
        "user:edit_content",
        "user:delete",
        "user:read"
    ],
    "gender": "",
    "about": "",
    "following": [],
    "followers": [],
    "_id": "5f3dcd97832746181006b1eb",
    "username": "JohnDoe",
    "phone_number": "000-111-2222",
    "first_name": "John",
    "last_name": "Doe",
    "email": "a@mail.com",
    "createdAt": "2020-08-20T01:10:47.626Z",
    "updatedAt": "2020-08-20T01:10:47.626Z",
    "__v": 0
}
  ```
 */
const DeleteMe = async (): Promise<UserInfo> => {
  const res = await utils.deleteRequest(`/api/users/${utils.getIDAndAccessToken()._id}`);
  return await res.json() as UserInfo;
};

/**
 * @desc Update the password of a user.
 * @param {string} newPassword The new password.
 * @param {string} oldPassword The old password.
 * @return {Promise<{message: string}>} A success message
 * @success
  ```
    {
        "message": "Successfully updated password"
    }
  ```
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
 * @param {string} userID The user ID of a user.
 * @return {Promise<{message: string}>} A success message
 * @success
  ```
    {
        "message": "Successfully followed someone"
    }
  ```
 */
const Follow = async (userID: string): Promise<{message: string}> => {
  const res = await utils.putRequest(`/api/users/${userID}/follow`);
  return await res.json() as {message: string};
};

/**
 * @desc Unfollow someone
 * @param {string} userID The user ID of a user.
 * @return {Promise<{message: string}>} A success message
 * @success
  ```
    {
        "message": "Successfully unfollowed someone"
    }
  ```
 */
const Unfollow = async (userID: string): Promise<{message: string}> => {
  const res = await utils.deleteRequest(`/api/users/${userID}/follow`);
  return await res.json() as {message: string};
};

/**
 * @desc List someone's following/followers
 * @param {string} userID The user ID of a user.
 * @return {Promise<FollowingList>} A users's list of followers/followings.
 * @success
  ```javascript
  {
    "following": [
        {
            "_id": "5f3e184ad4df2d2ab0d5f91b",
            "username": "new_user"
        },
        {
            "_id": "5f3e184ad4dfads2ab0d5f91",
            "username": "user2"
        }
    ],
    "followers": [
        {
            "_id": "5f3e183dd4df2d2ab0d5f919",
            "username": "user3"
        },
    ]
  }
```
 */
const GetFollowing = async (userID: string): Promise<FollowingList> => {
  const res = await utils.getRequest(`/api/users/${userID}/follow`);
  return await res.json() as FollowingList;
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

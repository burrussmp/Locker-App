'use strict';
import config from 'config';
import apiHelper from 'api/helper';

/**
 * @desc Update password
 * @param password : string : new password
 * @param old_password : string : old password
 * @return a promise that resolves if the API went through otherwise the error
 * @success
  ```
    {
        "message": "Successfully updated password"
    }
  ```
 */
const UpdatePassword = async (
  password: string,
  old_password: string
): Promise<string | Error> => {
  const id_and_token = apiHelper.get_id_and_token_redux();
  if (!id_and_token) {
    throw 'Unable to retrieve userID and/or access_token from redux store';
  }
  const params = {
    password: password,
    old_password: old_password,
  };
  const res = await global.fetch(
    `${config.server}/api/users/${id_and_token.id}/password?access_token=${id_and_token.access_token}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    }
  );
  if (res.ok) {
    return await res.json();
  } else {
    throw await apiHelper.handleError(res);
  }
};

/**
 * @desc Follow someone
 * @param userID : string : The user ID of the person you want to follow
 * @return a promise that resolves if the API went through otherwise the error
 * @success
  ```
    {
        "message": "Successfully followed someone"
    }
  ```
 */
const Follow = async (userID: string): Promise<{message: string} | Error> => {
  const id_and_token = apiHelper.get_id_and_token_redux();
  if (!id_and_token) {
    throw 'Unable to retrieve userID and/or access_token from redux store';
  }
  const res = await global.fetch(
    `${config.server}/api/users/${userID}/follow?access_token=${id_and_token.access_token}`,
    {
      method: 'PUT',
    }
  );
  if (res.ok) {
    return await res.json();
  } else {
    throw await apiHelper.handleError(res);
  }
};

/**
 * @desc Unfollow someone
 * @param userID : string : The user ID of the person you want to unfollow
 * @return a promise that resolves if the API went through otherwise the error
 * @success
  ```
    {
        "message": "Successfully unfollowed someone"
    }
  ```
 */
const Unfollow = async (userID: string): Promise<string | Error> => {
  const id_and_token = apiHelper.get_id_and_token_redux();
  if (!id_and_token) {
    throw 'Unable to retrieve userID and/or access_token from redux store';
  }
  const res = await global.fetch(
    `${config.server}/api/users/${userID}/follow?access_token=${id_and_token.access_token}`,
    {
      method: 'DELETE',
    }
  );
  if (res.ok) {
    return await res.json();
  } else {
    throw await apiHelper.handleError(res);
  }
};

type ListFollowingType = {
  following: [{_id: string; username: string}];
  followers: [{_id: string; username: string}];
};

/**
 * @desc List someone's following/followers
 * @param userID : string : The userID of the person's info you are requesting
 * @return a promise that resolves if the API went through otherwise the error
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
const GetFollowing = async (
  userID: string
): Promise<ListFollowingType | Error> => {
  const id_and_token = apiHelper.get_id_and_token_redux();
  if (!id_and_token) {
    throw 'Unable to retrieve userID and/or access_token from redux store';
  }
  const res = await global.fetch(
    `${config.server}/api/users/${userID}/follow?access_token=${id_and_token.access_token}`
  );
  if (res.ok) {
    const result = await res.json();
    return result;
  } else {
    throw await apiHelper.handleError(res);
  }
};

type ListAllUsersType = [
  {
    _id: string;
    username: string;
    updated: string;
    created: string;
  }
];

/**
 * @desc List all users
 * @return a promise that resolves if the API went through otherwise the error
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
    "updated": "2020-08-12T23:58:20.137Z",
    "created": "2020-08-12T23:58:20.137Z"
  }]
```
 */
const GetAll = async (): Promise<ListAllUsersType | Error> => {
  const id_and_token = apiHelper.get_id_and_token_redux();
  if (!id_and_token) {
    throw 'Unable to retrieve userID and/or access_token from redux store';
  }
  const res = await global.fetch(
    `${config.server}/api/users?access_token=${id_and_token.access_token}`
  );
  if (res.ok) {
    const result = await res.json();
    return result;
  } else {
    throw await apiHelper.handleError(res);
  }
};

export type UserInfoType =
  | {
      about: string;
      following: [
        {
          _id: string;
        }
      ];
      followers: [
        {
          _id: string;
        }
      ];
      _id: string;
      cognito_username: string;
      username: string;
      first_name?: string;
      last_name?: string;
      createdAt: string;
      updatedAt: string;
      profile_photo?: {
        _id: string;
        key: string;
        mimetype: string;
      };
    }
  | undefined;
/**
 * @desc Get specific user's information
 * @param userID : string : The user ID of the person who's information you want to retrieve
 * @return a promise that resolves if the API went through otherwise the error
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
const GetByID = async (userId: string): Promise<UserInfoType | Error> => {
  const id_and_token = apiHelper.get_id_and_token_redux();
  if (!id_and_token) {
    throw 'Unable to retrieve userID and/or access_token from redux store';
  }
  const res = await global.fetch(
    `${config.server}/api/users/${userId}?access_token=${id_and_token.access_token}`
  );
  if (res.ok) {
    return await res.json();
  } else {
    throw await apiHelper.handleError(res);
  }
};

/**
 * @desc Delete yourself
 * @return a promise that resolves if the API went through otherwise the error
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
const DeleteMe = async (): Promise<Record<string, any> | Error> => {
  const id_and_token = apiHelper.get_id_and_token_redux();
  if (!id_and_token) {
    throw 'Unable to retrieve userID and/or access_token from redux store';
  }
  const res = await global.fetch(
    `${config.server}/api/users/${id_and_token.id}?access_token=${id_and_token.access_token}`,
    {
      method: 'DELETE',
    }
  );
  if (res.ok) {
    return await res.json();
  } else {
    throw await apiHelper.handleError(res);
  }
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

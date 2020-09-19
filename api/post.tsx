'use strict';
import config from 'config';
import apiHelper from 'api/helper';
import {ContentPostType} from './content_post';

/**
 * @desc List all posts
 * @return a promise that resolves if the API went through otherwise the error
 * @success
 ```
[
    {
        "_id": "5f4142d2df64933395456dde",
        "createdAt": "2020-08-22T16:07:46.915Z"
    },
    {
        "_id": "5f4142d3df64933395456de1",
        "createdAt": "2020-08-22T16:07:47.174Z"
    }
]
  ```
*/
const ListAllPosts = async (): Promise<{_id: string} | Error> => {
  const id_and_token = apiHelper.get_id_and_token_redux();
  if (!id_and_token) {
    throw 'Unable to retrieve userID and/or access_token from redux store';
  }
  const res = await global.fetch(
    `${config.server}/api/posts?access_token=${id_and_token.access_token}`
  );
  if (res.ok) {
    return await res.json();
  } else {
    throw await apiHelper.handleError(res);
  }
};

type PostType = {
  caption: string;
  tags: Array<Record<string, string>>;
  _id: string;
  type: string;
  content: ContentPostType;
  postedBy: string;
  createdAt: string;
  updatedAt: string;
};

/**
 * @desc Get a specific post. The 'content' field is populated depending on the type of the post
 * @param postId : string : the postID to retrieve
 * @return a promise that resolves if the API went through otherwise the error
 * @success
 ```
{
    "caption": "Check out the new shoe!",
    "tags": [
        "shoe",
        "designer"
    ],
    "_id": "5f4155c1284bd74c053c2ffe",
    "type": "ContentPost",
    "content": // depends on the type of post (see /api/content_post.tsx for example),
    "postedBy": "5f4155c0284bd74c053c2ff9",
    "createdAt": "2020-08-22T17:28:33.161Z",
    "updatedAt": "2020-08-22T17:28:33.161Z"
}
  ```
*/
const GetByID = async (postId: string): Promise<PostType | Error> => {
  const id_and_token = apiHelper.get_id_and_token_redux();
  if (!id_and_token) {
    throw 'Unable to retrieve userID and/or access_token from redux store';
  }
  const res = await global.fetch(
    `${config.server}/api/posts/${postId}?access_token=${id_and_token.access_token}`
  );
  if (res.ok) {
    return await res.json();
  } else {
    throw await apiHelper.handleError(res);
  }
};

export default {
  ListAllPosts,
  GetByID,
};

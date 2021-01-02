/**
 * @description Post API
 * @author Matthew P. Burruss
 * @date 12/24/2020
 */
import utils from 'api/utils';
import { CommentType } from 'api/comments';
import { ProductPostType } from 'api/product_post';

export type PostType = {
  caption: string;
  tags: Array<Record<string, string>>;
  _id: string;
  type: string;
  content: ProductPostType;
  postedBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number | undefined;
};

export type ReactionsType = {
  selected: boolean;
  like: number;
  love: number;
  laugh: number;
  surprise: number;
  mad: number;
  sad: number;
};

/**
 * @desc List all posts
 * @param {Record<string, string> | undefined} query Optional query parameters
 * @return {Promise<[{'_id': string, 'createdAt': string}]>} A list of posts
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
const GetAll = async (query?: Record<string, string>): Promise<[{'_id': string, 'createdAt': string}]> => {
  const res = await utils.getRequest('/api/posts', query);
  return await res.json() as [{'_id': string, 'createdAt': string}];
};

/**
 * @desc Get a specific post. The 'content' field is populated depending on the type of the post
 * @param {string} postId The ID of the post.
 * @param {Record<string, string> | undefined} query Optional query parameters
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
    "type": "ProductPost",
    "content": // depends on the type of post (see /api/product_post.tsx for example),
    "postedBy": "5f4155c0284bd74c053c2ff9",
    "createdAt": "2020-08-22T17:28:33.161Z",
    "updatedAt": "2020-08-22T17:28:33.161Z"
}
  ```
*/
const GetByID = async (postId: string, query?: Record<string, string>): Promise<PostType> => {
  const res = await utils.getRequest(`/api/posts/${postId}`, query);
  return await res.json() as PostType;
};

/**
 * @desc List post comments
 * @param {string} postId The ID of the post.
 * @return {Promise<[CommentType]>} List of comments for a post.
 * @success
 ```
  [
    {
      text: 'What the heck @someperson comments',
      postedBy: 5f65925c10264630c624150b,
      createdAt: 2020-09-19T05:08:48.350Z,
      _id: 5f65926010264630c6241516,
      likes: 0,
      liked: false
    },
    {
      text: 'New comment 1',
      postedBy: 5f65925c10264630c624150b,
      createdAt: 2020-09-19T05:08:48.358Z,
      _id: 5f65926010264630c6241517,
      likes: 0,
      liked: false
    }
  ]
  ```
*/
const ListComments = async (postId: string): Promise<[CommentType]> => {
  const res = await utils.getRequest(`/api/${postId}/comments`);
  return await res.json() as [CommentType];
};

/**
 * @desc React to a post.
 * @param {string} postId The ID of the post.
 * @param {string} reaction The reaction to the post. Must be one of the following: "like", "love", "laugh", "surprise", "mad", or "sad"
 * @return {Promise<{_id: string}>} The ID of the post
 * @success
  ```
  {
    "_id": 5f400fb18b012a65ef46044b
  }
  ```
*/
const AddReaction = async (postId: string, reaction: string): Promise<{_id: string}> => {
  const res = await utils.putRequest(`/api/posts/${postId}/reaction`, { reaction });
  return await res.json() as {_id: string};
};

/**
 * @desc Remove reaction to post.
 * @param {string} postId The ID of the post.
 * @return {Promise<{_id: string}>} The deleted reaction.
 * @success
 ```
  {
      "_id": "5f400fb18b012a65ef46044b",
  }
  ```
*/
const DeleteReaction = async (postId: string): Promise<{_id: string}> => {
  const res = await utils.deleteRequest(`/api/posts/${postId}/reaction`);
  return await res.json() as {_id: string};
};

/**
 * @desc Get a summary of a post reactions.
 * @param {string} postId The ID of the post.
 * @return {Promise<ReactionsType>} The reaction summary.
 * @success
 ```
{
    "selected": "like",
    "like": 423,
    "love": 1232,
    "laugh": 903,
    "surprise": 23,
    "mad": 43,
    "sad": 12
}
  ```
*/
const GetReactions = async (postId: string): Promise<ReactionsType> => {
  const res = await utils.getRequest(`/api/posts/${postId}/reaction`);
  return await res.json() as ReactionsType;
};

export default {
  GetAll,
  GetByID,
  // Edit,
  // Delete,
  ListComments,
  AddReaction,
  DeleteReaction,
  GetReactions,
};

// type PostUpdate = {
//   caption: string;
//   tags: string;
// };

// /**
//  * @desc Edit a post
//  * @param postId : string : the post ID
//  * @return a promise that resolves if the API went through otherwise the error
//  * @success
//  ```
// {
//    "_id" : "5f4142d3df64933395456de1"
// }
//   ```
// */
// const Edit = async (
//   postId: string,
//   postUpdate: PostUpdate
// ): Promise<{_id: string} | Error> => {
//   const id_and_token = utils.getIDAndAccessToken();
//   if (!id_and_token) {
//     throw 'Unable to retrieve userID and/or access_token from redux store';
//   }
//   const data = {
//     caption: postUpdate.caption,
//     tags: postUpdate.tags,
//   };
//   const res = await global.fetch(
//     `${config.server}/api/posts/${postId}?access_token=${id_and_token.access_token}`,
//     {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     }
//   );
//   if (res.ok) {
//     return await res.json();
//   } else {
//     throw await utils.handleError(res);
//   }
// };

// /**
//  * @desc Deletes a post (user must be owner)
//  * @param postId : string : the postID to retrieve
//  * @return a promise that resolves if the API went through otherwise the error
//  * @success
//  ```
//   {
//     "_id": "5f41ea00c025ae611618988c",
//   }
//   ```
// */
// const Delete = async (postId: string): Promise<{_id: string} | Error> => {
//   const id_and_token = utils.getIDAndAccessToken();
//   if (!id_and_token) {
//     throw 'Unable to retrieve userID and/or access_token from redux store';
//   }
//   const res = await global.fetch(
//     `${config.server}/api/posts/${postId}/comments?access_token=${id_and_token.access_token}`,
//     {
//       method: 'DELETE',
//     }
//   );
//   if (res.ok) {
//     return await res.json();
//   } else {
//     throw await utils.handleError(res);
//   }
// };
